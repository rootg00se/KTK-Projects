import { project_status } from "@prisma/generated/enums";
import { IsEnum, IsNotEmpty } from "class-validator";

export class updateProjectStatusDto {
    @IsNotEmpty({ message: "Project status can't be empty" })
    @IsEnum(project_status, { message: "Project status is not correct" })
    status: project_status;
}