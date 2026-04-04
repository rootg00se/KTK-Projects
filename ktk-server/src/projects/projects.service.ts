import { projectMapper } from "@/mappers/project.mapper";
import { PrismaService } from "@/prisma/prisma.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { project_status } from "@prisma/generated/enums";
import { S3StorageService } from "@/libs/s3-storage/s3-storage.service";
import { ProjectsPaginationDto } from "./dto/projects-pagination.dto";
import { v4 } from "uuid";
import { QueryMode } from "@prisma/generated/internal/prismaNamespace";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ChatsService } from "@/chats/chats.service";

@Injectable()
export class ProjectsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly s3StorageService: S3StorageService,
        private readonly chatsService: ChatsService,
    ) {}

    async createProject(userId: string, createProjectDto: CreateProjectDto) {
        await this.checkIfUserExists(userId);

        const existingTags = await this.prismaService.tags.findMany({
            where: { name: { in: createProjectDto.tags } },
        });

        const existingMembers = await this.prismaService.users.findMany({
            where: { user_id: { in: createProjectDto.members } },
        });

        const chat = await this.chatsService.createProjectChat(existingMembers);

        const file: Express.Multer.File = {
            fieldname: "project",
            originalname: `${v4()}.md`,
            encoding: "7bit",
            mimetype: "text/markdown",
            size: Buffer.byteLength(createProjectDto.content),
            buffer: Buffer.from(createProjectDto.content, "utf-8"),
            stream: null as any,
            destination: "",
            filename: "",
            path: "",
        };

        const folder = "projects";
        const fileData = await this.s3StorageService.uploadFile(file, folder);

        const project = await this.prismaService.projects.create({
            data: {
                title: createProjectDto.title,
                project_link: createProjectDto.projectLink || null,
                content_key: fileData.fileKey,
                content_url: fileData.fileUrl,
                chat_id: chat.chat_id,
                creator_id: userId,
                projects_tags: {
                    createMany: {
                        data: existingTags.map(tag => ({
                            tag_id: tag.tag_id,
                        })),
                    },
                },
                project_members: {
                    createMany: {
                        data: existingMembers.map(user => ({
                            user_id: user.user_id,
                        })),
                    },
                },
            },
            ...this.projectsInclude(userId),
        });

        return projectMapper(project);
    }

    async getAllProjects(paginationDto: ProjectsPaginationDto, userId?: string) {
        const page = paginationDto.page || 1;
        const limit = paginationDto.limit || 10;
        const search = paginationDto.query?.trim() || "";

        const tags = paginationDto.tags?.split(",").every(str => str !== "")
            ? paginationDto.tags?.split(",")
            : [];

        const where = {
            ...(search ? { title: { contains: search, mode: QueryMode.insensitive } } : {}),
            AND: tags.map(tag => ({
                projects_tags: {
                    some: {
                        tags: { name: tag },
                    },
                },
            })),
        };

        const [projects, total] = await Promise.all([
            this.prismaService.projects.findMany({
                where,
                ...this.projectsInclude(userId),
                orderBy: { created_at: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prismaService.projects.count({ where }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: projects.map(el => projectMapper(el)),
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
            },
        };
    }

    async getAllUserProjects(userId: string) {
        const projects = await this.prismaService.projects.findMany({
            where: {
                project_members: { some: { user_id: userId } },
            },
            ...this.projectsInclude(userId),
            orderBy: {
                created_at: "desc",
            },
        });

        return projects.map(el => projectMapper(el));
    }

    async getProjectById(projectId: string, userId?: string) {
        const project = await this.prismaService.projects.findUnique({
            where: {
                project_id: projectId,
            },
            ...this.projectsInclude(userId),
        });

        if (!project) throw new NotFoundException("Couldn't find project with that id");

        return projectMapper(project);
    }

    async updateProject(projectId: string, updateProjectDto: UpdateProjectDto) {
        await this.checkIfProjectExists(projectId);

        const updatedProject = await this.prismaService.projects.update({
            where: { project_id: projectId },
            data: {
                title: updateProjectDto.title,
                project_link: updateProjectDto.projectLink,
            },
            ...this.projectsInclude(),
        });

        return projectMapper(updatedProject);
    }

    async updateProjectStatus(projectId: string, status: project_status) {
        await this.checkIfProjectExists(projectId);

        const updatedProject = await this.prismaService.projects.update({
            where: { project_id: projectId },
            data: { status },
            ...this.projectsInclude(),
        });

        return projectMapper(updatedProject);
    }

    async toggleProjectsLike(projectId: string, userId: string, like: boolean) {
        await this.checkIfProjectExists(projectId);

        const exists = await this.prismaService.project_likes.findUnique({
            where: {
                project_id_user_id: {
                    user_id: userId,
                    project_id: projectId,
                },
            },
        });

        if (!exists && !like) throw new BadRequestException("User didn't like this project");
        if (exists && like) throw new BadRequestException("User has already liked this project");

        const updatedProject = await this.prismaService.projects.update({
            where: { project_id: projectId },
            data: {
                project_likes: like
                    ? { create: { user_id: userId } }
                    : {
                          delete: {
                              project_id_user_id: {
                                  project_id: projectId,
                                  user_id: userId,
                              },
                          },
                      },
            },
            ...this.projectsInclude(userId),
        });

        return projectMapper(updatedProject);
    }

    async getProjectParticipants(projectId: string) {
        await this.checkIfProjectExists(projectId);

        const participants = await this.prismaService.users.findMany({
            where: {
                project_members: {
                    some: { project_id: projectId },
                },
            },
            omit: { password_hash: true },
        });

        return participants;
    }

    async updateProjectContent(projectId: string, content: string) {
        const project = await this.checkIfProjectExists(projectId);
        const folder = "projects";

        const file: Express.Multer.File = {
            fieldname: "project",
            originalname: `${projectId}.md`,
            encoding: "7bit",
            mimetype: "text/markdown",
            size: Buffer.byteLength(content),
            buffer: Buffer.from(content, "utf-8"),
            stream: null as any,
            destination: "",
            filename: "",
            path: "",
        };

        const fileData = await this.s3StorageService.uploadFile(file, folder, project?.content_key);

        const updatedProject = await this.prismaService.projects.update({
            where: { project_id: projectId },
            data: {
                content_url: fileData.fileUrl,
                content_key: fileData.fileKey,
            },
            ...this.projectsInclude(),
        });

        return projectMapper(updatedProject);
    }

    async deleteProject(projectId: string) {
        await this.checkIfProjectExists(projectId);

        const deletedProject = await this.prismaService.projects.delete({
            where: { project_id: projectId },
            ...this.projectsInclude(),
        });

        await this.s3StorageService.deleteFile(deletedProject.content_key);

        return projectMapper(deletedProject);
    }

    async addParticipantToProject(projectId: string, userId: string) {
        await this.checkIfProjectExists(projectId);
        await this.checkIfUserExists(userId);

        await this.prismaService.project_members.create({
            data: {
                user_id: userId,
                project_id: projectId,
            },
        });

        return await this.getProjectParticipants(projectId);
    }

    async removeParticipantFromProject(projectId: string, userId: string) {
        await this.checkIfProjectExists(projectId);
        await this.checkIfUserExists(userId);

        await this.prismaService.project_members.delete({
            where: {
                project_id_user_id: {
                    project_id: projectId,
                    user_id: userId,
                },
            },
        });

        return await this.getProjectParticipants(projectId);
    }

    private projectsInclude(userId?: string) {
        return {
            include: {
                projects_tags: { select: { tags: true } },
                project_members: { select: { users: { omit: { password_hash: true } } } },
                _count: { select: { project_likes: true } },
                project_likes: userId
                    ? {
                          where: { user_id: userId },
                          select: { user_id: true },
                      }
                    : false,
            },
        };
    }

    private async checkIfUserExists(userId: string) {
        const user = await this.prismaService.users.findUnique({ where: { user_id: userId } });
        if (!user) throw new NotFoundException("User was not found");

        return user;
    }

    private async checkIfProjectExists(projectId: string) {
        const project = await this.prismaService.projects.findUnique({
            where: { project_id: projectId },
        });

        if (!project) throw new NotFoundException("Project with that id not found");

        return project;
    }
}
