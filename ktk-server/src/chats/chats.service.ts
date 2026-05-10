import { chatMapper } from "@/mappers/chat.mapper";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { chat_type } from "@prisma/generated/enums";
import { CHATS_INCLUDE } from "./utils/chats.constants";

@Injectable()
export class ChatsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUserChats(userId: string) {
        const chats = await this.prismaService.chats.findMany({
            where: { chat_members: { some: { user_id: userId } } },
            include: { ...CHATS_INCLUDE },
            orderBy: { updated_at: "desc" },
        });

        return chats.map(chat => chatMapper(chat, userId));
    }

    async createPrivateChat(userId: string, targetUserId: string) {
        const createdChat = await this.prismaService.chats.create({
            data: {
                type: chat_type.private,
                chat_members: {
                    create: [{ user_id: userId }, { user_id: targetUserId }],
                },
            },
            include: { ...CHATS_INCLUDE },
        });

        return chatMapper(createdChat, targetUserId);
    }

    async createProjectChat(members) {
        const chat = await this.prismaService.chats.create({
            data: {
                type: chat_type.group,
                chat_members: {
                    createMany: {
                        data: members.map(user => ({
                            user_id: user.user_id,
                        })),
                    },
                },
            },
            include: { chat_members: { select: { users: { omit: { password_hash: true } } } } },
        });

        return chat;
    }

    async getChatMessages(chatId: string) {
        await this.checkIfChatExists(chatId);

        const messages = await this.prismaService.messages.findMany({
            where: { chat_id: chatId },
            orderBy: { created_at: "asc" },
            include: {
                users: {
                    select: {
                        user_id: true,
                        nickname: true,
                        display_name: true,
                        avatar_url: true,
                    },
                },
            },
        });

        return messages;
    }

    async addUserToProjectChat(projectId: string, userId: string) {
        const project = await this.checkIfProjectExists(projectId);

        const members = this.prismaService.chat_members.create({
            data: {
                chat_id: project!.chat_id,
                user_id: userId,
            },
        });

        return members;
    }

    async getProjectChat(projectId: string) {
        await this.checkIfProjectExists(projectId);

        const chat = await this.prismaService.chats.findFirst({
            where: { projects: { some: { project_id: projectId } } },
            include: { chat_members: { select: { users: { omit: { password_hash: true } } } } },
        });

        if (!chat) throw new NotFoundException("Project chat was not found");

        return chat;
    }

    private async checkIfProjectExists(projectId: string) {
        const project = await this.prismaService.projects.findUnique({
            where: { project_id: projectId },
        });

        if (!project) throw new NotFoundException("Project with that id not found");

        return project;
    }

    private async checkIfChatExists(chatId: string) {
        const chat = await this.prismaService.chats.findUnique({
            where: { chat_id: chatId },
        });

        if (!chat) throw new NotFoundException("Chat with that id not found");

        return chat;
    }
}
