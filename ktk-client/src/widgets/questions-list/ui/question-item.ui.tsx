import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import { UserRound } from "lucide-react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

interface IQuestionProps {
    avatar: string | null;
    className?: string;
    createdAt: Date;
    text: string;
    displayName: string;
    projectId: string;
    userId: string;
    nickname: string;
    isDeleted?: boolean;
}

export const QuestionItem: React.FC<IQuestionProps> = ({
    className,
    avatar,
    createdAt,
    text,
    displayName,
    projectId,
    userId,
    nickname,
    isDeleted,
}) => {
    return (
        <div className={cn("border-b p-5", isDeleted && "bg-gray-50/50", className)}>
            <div className="flex items-center gap-3 mb-5">
                <Avatar className="w-11 h-11">
                    <AvatarImage src={avatar || ""} />
                    <AvatarFallback className="text-sm bg-[#dadada]">
                        {isDeleted ? <UserRound /> : displayName.slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div className="w-full">
                    <div className="flex justify-between gap-5 mb-1">
                        <div className="flex flex-col">
                            <span className="text-md">{displayName || nickname}</span>
                            <Link to={`/profile/${userId}`} className="text-[12px] opacity-50 hover:underline">
                                #{nickname}
                            </Link>
                        </div>
                        <span className="text-[12px] opacity-50">{moment(createdAt).fromNow()}</span>
                    </div>
                </div>
            </div>
            <Link
                to={`/project/${projectId}`}
                className={cn(
                    "mb-1 text-[16px] inline-block max-w-140 transition-all",
                    isDeleted ? "text-muted-foreground italic" : "hover:underline",
                )}
            >
                {text}
            </Link>
        </div>
    );
};
