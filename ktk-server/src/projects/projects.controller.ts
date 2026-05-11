import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { Authorized } from "@/auth/decorators/authorized.decorator";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { updateProjectStatusDto } from "./dto/update-project-status.dto";
import { AuthenticatedGuard } from "@/auth/guards/authenticated.guard";
import { UpdateProjectContentDto } from "./dto/update-project-content.dto";
import { AddParticipantDto } from "./dto/add-participant.dto";
import { QuestionsService } from "@/questions/questions.service";
import { ProjectsPaginationDto } from "./dto/projects-pagination.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { CreateQuestionDto } from "../questions/dto/create-question.dto";
import { TaskTrackersService } from "@/task-trackers/task-trackers.service";
import { CreateTaskTrackerDto } from "@/task-trackers/dto/create-task-tracker.dto";
import { ChatsService } from "@/chats/chats.service";
import { ProjectMemberGuard } from "./guards/project-member.guard";

@Controller("projects")
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService,
        private readonly questionsService: QuestionsService,
        private readonly taskTrackersService: TaskTrackersService,
        private readonly chatsService: ChatsService
    ) {}

    @Post()
    @UseGuards(AuthenticatedGuard)
    async createProject(
        @Authorized("user_id") userId: string,
        @Body() createProjectDto: CreateProjectDto,
    ) {
        return await this.projectsService.createProject(userId, createProjectDto);
    }

    @Post(":id/participants")
    @UseGuards(AuthenticatedGuard, ProjectMemberGuard)
    async addUserToTheProject(
        @Param("id") projectId: string,
        @Body() addParticipantDto: AddParticipantDto,
    ) {
        return await this.projectsService.addParticipantToProject(
            projectId,
            addParticipantDto.userId,
        );
    }

    @Post(":id/like")
    @UseGuards(AuthenticatedGuard)
    async likePost(@Param("id") projectId: string, @Authorized("user_id") userId: string) {
        return await this.projectsService.toggleProjectsLike(projectId, userId, true);
    }

    @Post(":id/task-trackers")
    @UseGuards(AuthenticatedGuard, ProjectMemberGuard)
    async createTaskTracker(
        @Param("id") projectId: string,
        @Body() createTaskTrackerDto: CreateTaskTrackerDto,
    ) {
        return await this.taskTrackersService.createTaskTracker(
            projectId,
            createTaskTrackerDto.name,
        );
    }

    @Post(":id/questions")
    @UseGuards(AuthenticatedGuard)
    async createQuestion(
        @Param("id") projectId: string,
        @Body() createQuestionDto: CreateQuestionDto,
        @Authorized("user_id") userId: string,
    ) {
        return await this.questionsService.createQuestion(
            projectId,
            userId,
            createQuestionDto.text,
            createQuestionDto.questionId,
        );
    }

    @Get()
    async getAllProjects(
        @Authorized("user_id") userId: string,
        @Query() paginationQuery: ProjectsPaginationDto,
    ) {
        return await this.projectsService.getAllProjects(paginationQuery, userId);
    }

    @Get(":id/chats")
    @UseGuards(AuthenticatedGuard, ProjectMemberGuard)
    getProjectChat(@Param("id") projectId: string) {
        return this.chatsService.getProjectChat(projectId);
    }

    @Get(":id")
    async getProjectById(@Param("id") projectId: string, @Authorized("user_id") userId: string) {
        return await this.projectsService.getProjectById(projectId, userId);
    }

    @Get(":id/questions")
    async getProjectQuestions(@Param("id") projectId: string) {
        return await this.questionsService.getProjectQuestions(projectId);
    }

    @Get(":id/participants")
    async getProjectParticipants(@Param("id") projectId: string) {
        return await this.projectsService.getProjectParticipants(projectId);
    }

    @Get(":id/task-trackers")
    @UseGuards(ProjectMemberGuard)
    async getProjectTaskTrackers(@Param("id") projectId: string) {
        return await this.taskTrackersService.getProjectTaskTrackers(projectId);
    }

    @Patch(":id")
    @UseGuards(AuthenticatedGuard, ProjectMemberGuard)
    async updateProject(
        @Param("id") projectId: string,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
        return await this.projectsService.updateProject(projectId, updateProjectDto);
    }

    @Patch(":id/content")
    @UseGuards(AuthenticatedGuard, ProjectMemberGuard)
    async updateProjectContent(
        @Param("id") projectId: string,
        @Body() updateProjectContentDto: UpdateProjectContentDto,
    ) {
        return await this.projectsService.updateProjectContent(
            projectId,
            updateProjectContentDto.content,
        );
    }

    @Patch(":id/status")
    @UseGuards(AuthenticatedGuard, ProjectMemberGuard)
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
    @UseGuards(AuthenticatedGuard, ProjectMemberGuard)
    async deleteProject(@Param("id") projectId: string) {
        return await this.projectsService.deleteProject(projectId);
    }

    @Delete(":id/dislike")
    @UseGuards(AuthenticatedGuard)
    async dislikePost(@Param("id") projectId: string, @Authorized("user_id") userId: string) {
        return await this.projectsService.toggleProjectsLike(projectId, userId, false);
    }

    @Delete(":id/participants/:userId")
    async removeUserFromProject(@Param("id") projectId: string, @Param("userId") userId: string) {
        return await this.projectsService.removeParticipantFromProject(projectId, userId);
    }
}
