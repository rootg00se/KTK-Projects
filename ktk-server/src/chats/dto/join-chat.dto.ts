import { IsNotEmpty, IsUUID } from "class-validator";

export class JoinChatDto {
    @IsNotEmpty({ message: "Chat id can't be empty" })
    @IsUUID(4, { message: "Chat id must be an UUID v4" })
    chatId: string;
}
