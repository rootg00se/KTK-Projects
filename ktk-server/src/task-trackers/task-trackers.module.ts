import { Module } from "@nestjs/common";
import { TaskTrackersService } from "./task-trackers.service";
import { TaskTrackersController } from "./task-trackers.controller";

@Module({
    controllers: [TaskTrackersController],
    providers: [TaskTrackersService],
    exports: [TaskTrackersService],
})
export class TaskTrackersModule {}
