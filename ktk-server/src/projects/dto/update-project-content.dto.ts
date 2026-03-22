import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProjectContentDto {
    @IsNotEmpty({ message: "Project content can't be empty" })
    @IsString({ message: "Project content must be a string" })
    content: string;
}
