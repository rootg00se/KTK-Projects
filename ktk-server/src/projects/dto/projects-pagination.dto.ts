import { PaginationDto } from "@/shared/dto/pagination.dto";
import { IsOptional } from "class-validator";

export class ProjectsPaginationDto extends PaginationDto {
    @IsOptional()
    tags?: string;

    @IsOptional()
    query?: string;
}