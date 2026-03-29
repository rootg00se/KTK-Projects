import { Module } from "@nestjs/common";
import { TaskTrackersService } from "./task-trackers.service";
import { TaskTrackersController } from "./task-trackers.controller";
import { TasksModule } from "@/tasks/tasks.module";

@Module({
    imports: [TasksModule],
    controllers: [TaskTrackersController],
    providers: [TaskTrackersService],
    exports: [TaskTrackersService],
})
export class TaskTrackersModule {}
