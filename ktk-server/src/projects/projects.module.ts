import { Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { S3StorageModule } from "@/libs/s3-storage/s3-storage.module";
import { QuestionsModule } from "@/questions/questions.module";

@Module({
    imports: [S3StorageModule, QuestionsModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsModule {}
