import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUserChats(userId: string) {
        return await this.prismaService.chats.findMany({
            where: { chat_members: { some: { user_id: userId } } }
        })
    }
}
