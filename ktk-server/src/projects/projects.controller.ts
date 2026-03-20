import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { Authorized } from "@/auth/decorators/authorized.decorator";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { updateProjectStatusDto } from "./dto/update-project-status.dto";

@Controller("projects")
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    async createProject() {}

    @Post(":id/members")
    async addUserToTheProject() {}

    @Post(":id/like")
    async likePost() {}

    @Get()
    async getAllProjects(@Authorized("user_id") userId: string) {
        return await this.projectsService.getAllProjects(userId);
    }

    @Get(":id")
    async getProjectById(@Param(":id") projectId: string, @Authorized("user_id") userId: string) {
        return await this.projectsService.getProjectById(projectId, userId);
    }

    @Get(":id/questions")
    async getProjectQuestions() {}

    @Get(":id/participants")
    async getProjectParticipants() {}

    @Get(":id/taskTrackers")
    async getProjectTaskTrackers() {}

    @Get(":id/chats")
    async getProjectChats() {}

    @Patch(":id")
    async updateProject(
        @Param("id") projectId: string,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
        return await this.projectsService.updateProject(projectId, updateProjectDto);
    }

    @Patch(":id/content")
    async updateProjectContent() {}

    @Patch(":id/status")
    async updateProjectStatus(
        @Param("id") projectId: string,
        @Body() updateProjectStatusDto: updateProjectStatusDto,
    ) {
        return await this.projectsService.updateProjectStatus(
            projectId,
            updateProjectStatusDto.status,
        );
    }

    @Delete(":id")
    async deleteProject() {}

    @Delete(":id/dislike")
    async dislikePost() {}

    @Delete(":projectId/members/:userId")
    async removeUserFromProject() {}
}
