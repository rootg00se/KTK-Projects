import { projectMapper } from "@/mappers/project.mapper";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { updateProjectStatusDto } from "./dto/update-project-status.dto";
import { project_status } from "@prisma/generated/enums";

@Injectable()
export class ProjectsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllProjects(userId?: string) {
        const projects = await this.prismaService.projects.findMany({
            ...this.projectsInclude(userId),
        });

        return projects.map(el => projectMapper(el));
    }

    async getAllUserProjects(userId: string) {
        const projects = await this.prismaService.projects.findMany({
            where: {
                project_members: { some: { user_id: userId } },
            },
            ...this.projectsInclude(userId),
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

    private async checkIfProjectExists(projectId: string) {
        const project = this.prismaService.projects.findUnique({
            where: { project_id: projectId },
        });

        if (!project) throw new NotFoundException("Project with that id not found");

        return project;
    }
}
