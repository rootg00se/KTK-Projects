import { task_status } from "@prisma/generated/enums";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateTaskStatusDto {
    @IsNotEmpty({ message: "Task status can't be empty" })
    @IsEnum(task_status, { message: "Task status is not correct" })
    status: task_status;
}
