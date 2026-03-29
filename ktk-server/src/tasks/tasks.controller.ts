import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get(":id")
    async getTaskById() {}

    @Patch(":id/status")
    async updateTaskStatus() {}

    @Patch(":id/text")
    async updateTaskText() {}

    @Patch(":id/change-tracker")
    async updateTaskTaskTracker() {}

    @Delete(":id")
    async deleteTask() {}
}
