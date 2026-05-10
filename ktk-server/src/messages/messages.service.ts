import { PrismaService } from "@/prisma/prisma.service";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { MESSAGES_INCLIDE } from "./utils/messages.constants";

@Injectable()
export class MessagesService {
    constructor(private readonly prismaService: PrismaService) {}

    async createMessage(senderId: string, chatId: string, content: string) {
        const messages = await this.prismaService.messages.create({
            data: {
                sender_id: senderId,
                chat_id: chatId,
                content,
            },
            include: { ...MESSAGES_INCLIDE },
        });

        return messages;
    }

    async editMessage(userId: string, messageId: string, content: string) {
        const message = await this.checkIfMessageExists(messageId);

        if (message!.sender_id !== userId) {
            throw new ForbiddenException("Not your message");
        }

        const updatedMessage = await this.prismaService.messages.update({
            where: { message_id: messageId },
            data: {
                content,
                updated_at: new Date(),
            },
            include: { ...MESSAGES_INCLIDE },
        });

        return updatedMessage;
    }

    async deleteMessage(userId: string, messageId: string) {
        const message = await this.checkIfMessageExists(messageId);

        if (message!.sender_id !== userId) {
            throw new ForbiddenException("Not your message");
        }

        const deletedMessage = await this.prismaService.messages.delete({
            where: { message_id: messageId },
            include: { ...MESSAGES_INCLIDE },
        });

        return deletedMessage;
    }

    private async checkIfMessageExists(messageId: string) {
        const message = await this.prismaService.messages.findUnique({
            where: { message_id: messageId },
        });

        if (!message) throw new NotFoundException("Message with that id not found");

        return message;
    }
}
