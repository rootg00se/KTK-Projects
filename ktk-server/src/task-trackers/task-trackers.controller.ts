import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { TaskTrackersService } from "./task-trackers.service";
import { UpdateTaskTrackerDto } from "./dto/update-task-tracker.dto";
import { TasksService } from "@/tasks/tasks.service";
import { CreateTaskDto } from "@/tasks/dto/create-task.dto";
import { AuthenticatedGuard } from "@/auth/guards/authenticated.guard";

@Controller("task-trackers")
export class TaskTrackersController {
    constructor(
        private readonly taskTrackersService: TaskTrackersService,
        private readonly taskService: TasksService,
    ) {}

    @Post(":id/tasks")
    @UseGuards(AuthenticatedGuard)
    async createTask(@Param("id") taskTrackerId: string, @Body() createTaskDto: CreateTaskDto) {
        return await this.taskService.createTask(taskTrackerId, createTaskDto.text);
    }

    @Get(":id/tasks")
    async getTaskTrackersTasks(@Param("id") taskTrackerId: string) {
        return await this.taskService.getTaskTrackerTasks(taskTrackerId);
    }

    @Put(":id")
    @UseGuards(AuthenticatedGuard)
    async updateTaskTracker(
        @Param("id") taskTrackerId: string,
        @Body() updateTaskTrackerDto: UpdateTaskTrackerDto,
    ) {
        return await this.taskTrackersService.updateTaskTracker(
            taskTrackerId,
            updateTaskTrackerDto.name,
        );
    }

    @Delete(":id")
    @UseGuards(AuthenticatedGuard)
    async deleteTaskTracker(@Param("id") taskTrackerId: string) {
        return await this.taskTrackersService.deleteTaskTracker(taskTrackerId);
    }
}
