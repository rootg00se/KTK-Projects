import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { TaskTrackersService } from "./task-trackers.service";
import { UpdateTaskTrackerDto } from "./dto/update-task-tracker.dto";

@Controller("task-trackers")
export class TaskTrackersController {
    constructor(private readonly taskTrackersService: TaskTrackersService) {}

    @Post(":id/tasks")
    async createTask() {}

    @Get(":id/tasks")
    async getTaskTrackersTasks() {}

    @Put(":id")
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
    async deleteTaskTracker(@Param("id") taskTrackerId: string) {
        return await this.taskTrackersService.deleteTaskTracker(taskTrackerId);
    }
}
