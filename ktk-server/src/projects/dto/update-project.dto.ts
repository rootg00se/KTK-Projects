import { IsNotEmpty, IsString, IsUrl, Length } from "class-validator";

export class UpdateProjectDto {
    @IsString({ message: "Title must be a string" })
    @IsNotEmpty({ message: "Title can't be empty" })
    @Length(2, 64, { message: "Title length should be between 2 and 64 symbols" })
    title: string;

    @IsString({ message: "Link must be a string" })
    @IsNotEmpty({ message: "Link can't be empty" })
    @IsUrl({}, { message: "Incorrect link format" })
    projectLink: string;
}
