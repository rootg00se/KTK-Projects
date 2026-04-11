import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/shared/components/ui";
import React from "react";
import { PlusCircle } from "lucide-react";
import moment from "moment";

interface IProjectQuestionProps {
    className?: string;
    avatarUrl: string | null;
    displayName: string | null;
    nickname: string;
    createdAt: Date;
    text: string;
    repliesCount: number;
}

export const ProjectQuestion: React.FC<IProjectQuestionProps> = ({
    className,
    avatarUrl,
    displayName,
    nickname,
    createdAt,
    text,
    repliesCount
}) => {
    return (
        <div className={cn("border-b py-3", className)}>
            <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-11 h-11">
                    <AvatarImage src={avatarUrl || ""} />
                    <AvatarFallback className="text-sm bg-[#dadada]">{displayName || nickname}</AvatarFallback>
                </Avatar>
                <div className="w-full">
                    <div className="flex justify-between gap-5 mb-1">
                        <div className="flex flex-col">
                            <span className="text-md">{displayName || nickname}</span>
                            <span className="text-[12px] opacity-50">#{nickname}</span>
                        </div>
                        <span className="text-[12px] opacity-50">{moment(createdAt).fromNow()}</span>
                    </div>
                </div>
            </div>
            <p className="mb-1">{text}</p>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 opacity-70 cursor-pointer">
                    <PlusCircle size={16} />
                    <span className="text-sm">{repliesCount} Ответов</span>
                </div>
                <Button variant={"link"}>Ответить</Button>
            </div>
        </div>
    );
};
