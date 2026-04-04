import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatGateway } from './chats.gateway';
import { MessagesModule } from '@/messages/messages.module';

@Module({
  imports: [MessagesModule],
  controllers: [ChatsController],
  providers: [ChatsService, ChatGateway],
  exports: [ChatsService]
})
export class ChatsModule {}
