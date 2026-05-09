import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import moment from "moment";
import type React from "react";
import testImage from "/default-banner.jpg";

export const Message: React.FC<{ isMe?: boolean; text?: string; createdAt: Date }> = ({
    isMe = false,
    text = "Когда блять",
    createdAt,
}) => {
    return (
        <div className={cn("flex items-end gap-2", isMe && "justify-start flex-row-reverse")}>
            <Avatar className="w-10.5 h-10.5">
                <AvatarImage src={testImage} />
                <AvatarFallback className="text-sm bg-[#dadada]">DE</AvatarFallback>
            </Avatar>
            <div
                className={cn(
                    "bg-[#ebe8e8] min-w-25 justify-between p-2 gap-2 rounded-md max-w-100 flex items-end",
                    isMe && "bg-primary text-white",
                )}
            >
                <p className="mb-1">{text}</p>
                <p className="text-[11px] text-right">{moment(createdAt).format("HH:MM")}</p>
            </div>
        </div>
    );
};