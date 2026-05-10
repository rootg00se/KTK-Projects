import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayConnection,
    ConnectedSocket,
    MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { MessagesService } from "@/messages/messages.service";
import { SendMessageDto } from "./dto/send-message.dto";
import { EditMessageDto } from "./dto/edit-message.dto";
import { JoinChatDto } from "./dto/join-chat.dto";

interface AuthSocket extends Socket {
    userId: string;
}

@WebSocketGateway({
    cors: {
        origin: "*",
        path: "/socket.io",
        credentials: true,
    },
})
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    constructor(private readonly messageService: MessagesService) {}

    async handleConnection(client: AuthSocket) {
        const userId = client.handshake.query?.userId as string;
        if (!userId) return client.disconnect();

        client.userId = userId;
        client.join(`user:${userId}`);
    }

    @SubscribeMessage("joinChat")
    async handleJoinChat(
        @ConnectedSocket() client: AuthSocket,
        @MessageBody() chatDto: JoinChatDto,
    ) {
        client.join(`chat:${chatDto.chatId}`);

        return { joined: chatDto.chatId };
    }

    @SubscribeMessage("leaveChat")
    async handleLeaveChat(
        @ConnectedSocket() client: AuthSocket,
        @MessageBody() chatDto: JoinChatDto,
    ) {
        client.leave(`chat:${chatDto.chatId}`);

        return { left: chatDto.chatId };
    }

    @SubscribeMessage("sendMessage")
    async handleSendMessage(
        @ConnectedSocket() client: AuthSocket,
        @MessageBody() payload: SendMessageDto,
    ) {
        const message = await this.messageService.createMessage(
            client.userId,
            payload.chatId,
            payload.content,
        );

        this.server.to(`chat:${payload.chatId}`).emit("newMessage", message);
        this.server.to(`user:${client.userId}`).emit("messageSent", message);

        return message;
    }

    @SubscribeMessage("editMessage")
    async handleEditMessage(
        @ConnectedSocket() client: AuthSocket,
        @MessageBody() payload: EditMessageDto,
    ) {
        const message = await this.messageService.editMessage(
            client.userId,
            payload.messageId,
            payload.content,
        );

        this.server.to(`chat:${message.chat_id}`).emit("messageEdited", message);

        return message;
    }

    @SubscribeMessage("deleteMessage")
    async handleDeleteMessage(
        @ConnectedSocket() client: AuthSocket,
        @MessageBody()
        payload: { messageId: string },
    ) {
        const message = await this.messageService.deleteMessage(client.userId, payload.messageId);

        this.server.to(`chat:${message.chat_id}`).emit("messageDeleted", message);

        return { success: true };
    }
}
