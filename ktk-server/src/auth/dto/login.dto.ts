import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: "Invalid email" })
    email: string;

    @IsString({ message: "Password must be a string" })
    @IsNotEmpty({ message: "Password can't be empty" })
    @Length(8, 32, { message: "Password length should be between 8 and 32 characters" })
    password: string;
}