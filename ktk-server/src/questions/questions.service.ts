import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { QUESTIONS_INCLUDE } from "./utils/questions.constants";
import { questionMapper } from "@/mappers/question.mapper";

@Injectable()
export class QuestionsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getProjectQuestions(projectId: string) {
        const existingProject = await this.checkIfProjectExist(projectId);
        if (!existingProject) throw new NotFoundException("Project with that id not found");

        const questions = await this.prismaService.questions.findMany({
            where: { project_id: projectId, parent_id: null },
            include: { ...QUESTIONS_INCLUDE },
            orderBy: { created_at: "desc" },
        });

        return questions.map(question => questionMapper(question));
    }

    async getUserQuestions(userId: string) {
        const questions = await this.prismaService.questions.findMany({
            where: { user_id: userId, parent_id: null },
            include: { ...QUESTIONS_INCLUDE },
            orderBy: { created_at: "desc" }
        });

        return questions.map(question => questionMapper(question));;
    }

    async createQuestion(projectId: string, userId: string, text: string, parentId?: string) {
        const existingProject = await this.checkIfProjectExist(projectId);
        if (parentId) await this.checkIfQuestionExists(parentId);

        const createdQuestion = await this.prismaService.questions.create({
            data: {
                text: text,
                projects: { connect: { project_id: existingProject.project_id } },
                users: { connect: { user_id: userId } },
                ...(parentId && {
                    questions: {
                        connect: { question_id: parentId },
                    },
                }),
            },
            include: { ...QUESTIONS_INCLUDE },
        });

        return questionMapper(createdQuestion);
    }

    async getQuestionReplies(questionId: string) {
        const existingQuestion = await this.checkIfQuestionExists(questionId);

        const replies = await this.prismaService.questions.findMany({
            where: {
                parent_id: existingQuestion.question_id,
            },
            orderBy: { created_at: "asc" },
            include: { ...QUESTIONS_INCLUDE },
        });

        return replies.map(reply => questionMapper(reply));
    }

    async deleteQuestion(questionId: string) {
        const existingQuestion = await this.checkIfQuestionExists(questionId);

        const deletedQuestion = await this.prismaService.questions.update({
            where: { question_id: existingQuestion.question_id },
            data: { deleted_at: new Date() },
            include: { ...QUESTIONS_INCLUDE },
        });

        return questionMapper(deletedQuestion);
    }

    async updateQuestion(questionId: string, text: string) {
        const existingQuestion = await this.checkIfQuestionExists(questionId);

        const updatedQuestion = await this.prismaService.questions.update({
            where: { question_id: existingQuestion.question_id },
            data: { text },
            include: { ...QUESTIONS_INCLUDE },
        });

        return questionMapper(updatedQuestion);
    }

    private async checkIfProjectExist(projectId: string) {
        const existingProject = await this.prismaService.projects.findFirst({
            where: { project_id: projectId },
        });

        if (!existingProject) throw new NotFoundException("Project with such id not found");

        return existingProject;
    }

    private async checkIfQuestionExists(questionId: string) {
        const existingQuestions = await this.prismaService.questions.findFirst({
            where: { question_id: questionId },
        });

        if (!existingQuestions) throw new NotFoundException("Question with such id not found");

        return existingQuestions;
    }
}
