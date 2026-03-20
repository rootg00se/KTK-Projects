import { IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateUserDto {
    @IsString({ message: "Nickname should be a string" })
    @IsNotEmpty({ message: "Nickname can't be empty" })
    @Length(2, 64, { message: "Nickname length should be between 2 and 64 character" })
    nickname: string;

    @IsString({ message: "Display name should be a string" })
    @IsNotEmpty({ message: "Display name can't be empty" })
    @Length(2, 64, { message: "Display name length should be between 2 and 64 character" })
    displayName: string;
}
