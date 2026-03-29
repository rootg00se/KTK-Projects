import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTaskTrackerDto {
    @IsNotEmpty({ message: "Name can't be empty" })
    @IsString({ message: "Name must be a string" })
    @Length(2, 64, { message: "Name length should be between 2 and 64 symbols" })
    name: string;
}