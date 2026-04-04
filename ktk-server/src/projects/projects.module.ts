import { Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { S3StorageModule } from "@/libs/s3-storage/s3-storage.module";
import { QuestionsModule } from "@/questions/questions.module";
import { TaskTrackersModule } from "@/task-trackers/task-trackers.module";
import { ChatsModule } from "@/chats/chats.module";

@Module({
    imports: [S3StorageModule, QuestionsModule, TaskTrackersModule, ChatsModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsModule {}
