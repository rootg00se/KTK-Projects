import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateChatDto {
    @IsNotEmpty({ message: "User id can't be empty" })
    @IsUUID(4, { message: "User id must be an uuid v4" })
    userId: string;
}