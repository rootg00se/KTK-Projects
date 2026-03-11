import { PaginationDto } from "@/shared/dto/pagination.dto";
import { IsOptional, IsString } from "class-validator";

export class UsersPaginationDto extends PaginationDto {
    @IsOptional()
    @IsString({ message: "Nickname should be a string" })
    nickname: string;
}