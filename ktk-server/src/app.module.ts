import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { IS_DEV } from "./libs/common/utils/is-dev.util";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from "./prisma/prisma.module";
import { ChatsModule } from './chats/chats.module';
import { ProjectsModule } from './projects/projects.module';
import { S3StorageModule } from './libs/s3-storage/s3-storage.module';
import { SkillsModule } from './skills/skills.module';
import { TagsModule } from './tags/tags.module';
import { QuestionsModule } from './questions/questions.module';
import { TaskTrackersModule } from './task-trackers/task-trackers.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: !IS_DEV,
            isGlobal: true,
        }),
        AuthModule,
        UsersModule,
        PrismaModule,
        ChatsModule,
        ProjectsModule,
        S3StorageModule,
        SkillsModule,
        TagsModule,
        QuestionsModule,
        TaskTrackersModule,
        TasksModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
