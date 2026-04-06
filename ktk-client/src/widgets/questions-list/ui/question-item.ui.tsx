import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import moment from "moment";
import React from "react";

interface IQuestionProps {
    avatar: string | null;
    className?: string;
    createdAt: Date;
    text: string;
    displayName: string;
}

export const QuestionItem: React.FC<IQuestionProps> = ({
    className,
    avatar,
    createdAt,
    text,
    displayName,
}) => {
    return (
        <div className={cn("border-b p-5", className)}>
            <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-11 h-11">
                    <AvatarImage src={avatar || ""} />
                    <AvatarFallback className="text-sm bg-[#dadada]">{displayName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-md">{displayName}</span>
                        <span className="text-[12px] opacity-50">{moment(createdAt).fromNow()}</span>
                    </div>
                </div>
            </div>
            <p className="mb-1">{text}</p>
        </div>
    );
};
