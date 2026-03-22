import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty({ message: "Question text can't be empty" })
    @IsString({ message: "Question text must be a string" })
    text: string;

    @IsNotEmpty({ message: "Question id can't be empty" })
    @IsString({ message: "Question id must be a string" })
    @IsOptional()
    questionId?: string;
}
