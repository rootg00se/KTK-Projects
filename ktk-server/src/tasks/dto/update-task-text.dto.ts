import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTaskTextDto {
    @IsNotEmpty({ message: "Task's text can't be empty" })
    @IsString({ message: "Task's text must be a string" })
    text: string;
}
