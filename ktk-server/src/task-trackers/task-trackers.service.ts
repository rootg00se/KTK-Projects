import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class TaskTrackersService {
    constructor(private readonly prismaService: PrismaService) {}

    async createTaskTracker(projectId: string, name: string) {
        await this.checkIfProjectExists(projectId);

        const taskTracker = await this.prismaService.task_trackers.create({
            data: {
                name,
                project_id: projectId
            }
        });

        return taskTracker;
    }

    async getProjectTaskTrackers(projectId: string) {
        await this.checkIfProjectExists(projectId);

        const taskTrackers = await this.prismaService.task_trackers.findMany({
            where: { project_id: projectId }
        });

        return taskTrackers;
    }

    async updateTaskTracker(taskTrackerId: string, name: string) {
        await this.checkIfTaskTrackerExists(taskTrackerId);

        const updatedTaskTracker = await this.prismaService.task_trackers.update({
            where: { task_tracker_id: taskTrackerId },
            data: { name }
        });

        return updatedTaskTracker;
    }

    async deleteTaskTracker(taskTrackerId: string) {
        await this.checkIfTaskTrackerExists(taskTrackerId);

        const deletedTaskTracker = await this.prismaService.task_trackers.delete({
            where: { task_tracker_id: taskTrackerId }
        });

        return deletedTaskTracker;
    }

    private async checkIfTaskTrackerExists(taskTrackerId: string) {
        const taskTracker = await this.prismaService.task_trackers.findUnique({
            where: { task_tracker_id: taskTrackerId },
        });

        if (!taskTracker) throw new NotFoundException("Task tracker with such id not found");

        return taskTracker;
    }

    private async checkIfProjectExists(projectId: string) {
        const project = this.prismaService.projects.findUnique({
            where: { project_id: projectId },
        });

        if (!project) throw new NotFoundException("Project with that id not found");

        return project;
    }
}
