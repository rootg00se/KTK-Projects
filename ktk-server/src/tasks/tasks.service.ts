import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { task_status } from "@prisma/generated/enums";

@Injectable()
export class TasksService {
    constructor(private readonly prismaService: PrismaService) {}

    async createTask(taskTrackerId: string, text: string) {
        await this.checkIfTaskTrackerExists(taskTrackerId);

        const task = await this.prismaService.tasks.create({
            data: {
                task_tracker_id: taskTrackerId,
                text,
            },
        });

        return task;
    }

    async getTaskTrackerTasks(taskTrackerId: string) {
        await this.checkIfTaskTrackerExists(taskTrackerId);

        const tasks = await this.prismaService.tasks.findMany({
            where: { task_tracker_id: taskTrackerId },
            orderBy: { created_at: "asc" }
        });

        return tasks;
    }

    async getTaskById(taskId: string) {
        await this.checkIfTaskExists(taskId);

        const task = await this.prismaService.tasks.findUnique({
            where: { task_id: taskId }
        });

        return task;
    }

    async updateTaskStatus(taskId: string, status: task_status) {
        await this.checkIfTaskExists(taskId);

        const updatedTask = await this.prismaService.tasks.update({
            where: { task_id: taskId },
            data: { status },
        });

        return updatedTask;
    }

    async updateTask(taskId: string, text: string) {
        await this.checkIfTaskExists(taskId);

        const updatedTask = await this.prismaService.tasks.update({
            where: { task_id: taskId },
            data: { text },
        });

        return updatedTask;
    }

    async changeTaskTaskTracker(taskTrackerId: string, taskId: string) {
        await this.checkIfTaskExists(taskId);
        await this.checkIfTaskTrackerExists(taskTrackerId);

        const updatedTask = await this.prismaService.tasks.update({
            where: { task_id: taskId },
            data: { task_tracker_id: taskTrackerId },
        });

        return updatedTask;
    }

    async deleteTask(taskId: string) {
        await this.checkIfTaskExists(taskId);

        const deletedTask = await this.prismaService.tasks.delete({
            where: { task_id: taskId },
        });

        return deletedTask;
    }

    private async checkIfTaskTrackerExists(taskTrackerId: string) {
        const taskTracker = await this.prismaService.task_trackers.findUnique({
            where: { task_tracker_id: taskTrackerId },
        });

        if (!taskTracker) throw new NotFoundException("Task tracker with such id not found");

        return taskTracker;
    }

    private async checkIfTaskExists(taskId: string) {
        const task = await this.prismaService.tasks.findUnique({
            where: { task_id: taskId },
        });

        if (!task) throw new NotFoundException("Task with such id not found");

        return task;
    }
}
