import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserProfileDto {
    @IsNotEmpty({ message: "Profile content can't be empty" })
    @IsString({ message: "Profile content must be a string" })
    content: string;
}