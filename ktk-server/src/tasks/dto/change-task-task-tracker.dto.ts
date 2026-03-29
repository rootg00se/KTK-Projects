import { IsNotEmpty, IsUUID } from "class-validator";

export class ChangeTaskTaskTrackerDto {
    @IsNotEmpty({ message: "Task tracker id can't be empty" })
    @IsUUID(4, { message: "Task tracker id must an UUID v4" })
    taskTrackerId: string;
}