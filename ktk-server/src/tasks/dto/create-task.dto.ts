import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty({ message: "Task's text can't be empty" })
    @IsString({ message: "Task's text must be a string" })
    text: string;
}