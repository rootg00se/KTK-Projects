import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class QuestionsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getProjectQuestions(projectId: string) {
        const project = this.prismaService.projects.findUnique({
            where: { project_id: projectId },
        });

        if (!project) throw new NotFoundException("Project with that id not found");

        const questions = await this.prismaService.questions.findMany({
            where: { project_id: projectId }
        });

        return questions;
    }
}
