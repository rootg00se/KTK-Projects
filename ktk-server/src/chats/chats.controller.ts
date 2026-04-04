import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { AuthenticatedGuard } from "@/auth/guards/authenticated.guard";
import { Authorized } from "@/auth/decorators/authorized.decorator";
import { CreateChatDto } from "./dto/create-chat.dto";

@Controller("chats")
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) {}

    @Get()
    @UseGuards(AuthenticatedGuard)
    getChats(@Authorized("user_id") userId: string) {
        return this.chatsService.getUserChats(userId);
    }

    @Post("private")
    @UseGuards(AuthenticatedGuard)
    createPrivate(@Body() createChatDto: CreateChatDto, @Authorized("user_id") userId: string) {
        return this.chatsService.createPrivateChat(userId, createChatDto.userId);
    }

    @Get(":id/messages")
    @UseGuards(AuthenticatedGuard)
    getMessages(@Param("id") chatId: string) {
        return this.chatsService.getChatMessages(chatId);
    }
}
