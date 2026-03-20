import { ArrayUnique, IsArray, IsString } from "class-validator";

export class UpdateUserSkillsDto {
    @IsArray({ message: "Skills to remove must be an array of ids" })
    @ArrayUnique({ message: "Each value should be unique" })
    @IsString({ each: true, message: "Every skill id must be a string" })
    skillsToRemoveIds: string[];

    @IsArray({ message: "Skills to add must be an array of ids" })
    @ArrayUnique({ message: "Each value should be unique" })
    @IsString({ each: true, message: "Every skill id must be a string" })
    skillsToAddIds: string[];
}
