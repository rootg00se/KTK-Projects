import {
    ArrayUnique,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Length,
} from "class-validator";

export class CreateProjectDto {
    @IsString({ message: "Title must be a string" })
    @IsNotEmpty({ message: "Title can't be empty" })
    @Length(2, 64, { message: "Title length should be between 2 and 64 symbols" })
    title: string;

    @IsString({ message: "Link must be a string" })
    @IsNotEmpty({ message: "Link can't be empty" })
    @IsUrl({}, { message: "Incorrect link format" })
    @IsOptional()
    projectLink?: string;

    @IsNotEmpty({ message: "Project content can't be empty" })
    @IsString({ message: "Project content must be a string" })
    content: string;

    @IsNotEmpty({ message: "Tags can't be emtpy" })
    @IsArray({ message: "Tags shouls be an array" })
    @ArrayUnique({ message: "Each value should be unique" })
    @IsString({ each: true, message: "Every tag id must be a string" })
    tags: string[];

    @IsArray({ message: "Members shouls be an array" })
    @ArrayUnique({ message: "Each value should be unique" })
    @IsString({ each: true, message: "Every id must be an uuid v4" })
    @IsOptional()
    members?: string[];
}
