import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterDto {
    @IsEmail({}, { message: "Invalid email" })
    email: string;

    @IsString({ message: "Password should be a string" })
    @IsNotEmpty({ message: "Password can't be empty" })
    @Length(8, 32, { message: "Password length should be between 8 and 32 character" })
    password: string;

    @IsString({ message: "Nickname should be a string" })
    @IsNotEmpty({ message: "Nickname can't be empty" })
    @Length(2, 64, { message: "Nickname length should be between 2 and 64 character" })
    nickname: string;
}
