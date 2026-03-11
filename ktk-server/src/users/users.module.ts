import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ChatsModule } from '@/chats/chats.module';
import { ProjectsModule } from '@/projects/projects.module';

@Module({
  imports: [ChatsModule, ProjectsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
