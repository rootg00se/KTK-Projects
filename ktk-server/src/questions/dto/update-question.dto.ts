import { IsNotEmpty, IsString } from "class-validator";

export class UpdateQuestionDto {
    @IsNotEmpty({ message: "Question text can't be empty" })
    @IsString({ message: "Question text must be a string" })
    text: string;
}
