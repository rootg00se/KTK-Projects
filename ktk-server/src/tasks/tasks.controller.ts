import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { UpdateTaskTextDto } from "./dto/update-task-text.dto";
import { ChangeTaskTaskTrackerDto } from "./dto/change-task-task-tracker.dto";
import { AuthenticatedGuard } from "@/auth/guards/authenticated.guard";

@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get(":id")
    async getTaskById(@Param("id") taskId: string) {
        return await this.tasksService.getTaskById(taskId);
    }

    @Patch(":id/status")
    @UseGuards(AuthenticatedGuard)
    async updateTaskStatus(
        @Param("id") taskId: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ) {
        return await this.tasksService.updateTaskStatus(taskId, updateTaskStatusDto.status);
    }

    @Patch(":id/text")
    @UseGuards(AuthenticatedGuard)
    async updateTaskText(
        @Param("id") taskId: string,
        @Body() updateTaskTextDto: UpdateTaskTextDto,
    ) {
        return await this.tasksService.updateTask(taskId, updateTaskTextDto.text);
    }

    @Patch(":id/change-tracker")
    @UseGuards(AuthenticatedGuard)
    async updateTaskTaskTracker(
        @Param("id") taskId: string,
        @Body() changeTaskTaskTrackerDto: ChangeTaskTaskTrackerDto,
    ) {
        return await this.tasksService.changeTaskTaskTracker(
            changeTaskTaskTrackerDto.taskTrackerId,
            taskId,
        );
    }

    @Delete(":id")
    @UseGuards(AuthenticatedGuard)
    async deleteTask(@Param("id") taskId: string) {
        return await this.tasksService.deleteTask(taskId);
    }
}
