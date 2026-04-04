import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class EditMessageDto {
    @IsNotEmpty({ message: "Message id can't be empty" })
    @IsUUID(4, { message: "Message id must be an UUID v4" })
    messageId: string; 

    @IsNotEmpty({ message: "Content can't be empty" })
    @IsString({ message: "Content must be a string" })
    content: string;
}