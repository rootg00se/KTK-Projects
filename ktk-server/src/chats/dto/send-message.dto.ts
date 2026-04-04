import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SendMessageDto {
    @IsNotEmpty({ message: "Chat id can't be empty" })
    @IsUUID(4, { message: "Chat id must be an UUID v4" })
    chatId: string; 

    @IsNotEmpty({ message: "Content can't be empty" })
    @IsString({ message: "Content must be a string" })
    content: string;
}