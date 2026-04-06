import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ChatsModule } from '@/chats/chats.module';
import { ProjectsModule } from '@/projects/projects.module';
import { S3StorageModule } from '@/libs/s3-storage/s3-storage.module';
import { QuestionsModule } from '@/questions/questions.module';

@Module({
  imports: [ChatsModule, ProjectsModule, S3StorageModule, QuestionsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
