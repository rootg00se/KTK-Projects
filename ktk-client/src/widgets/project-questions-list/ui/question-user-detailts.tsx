import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components";
import { UserRound } from "lucide-react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

interface IQuestionUserDetailsProps {
    avatarUrl: string | null;
    displayName: string | null;
    nickname: string;
    createdAt: Date;
    userId: string;
    isDeleted: boolean;
}

export const QuestionUserDetails: React.FC<IQuestionUserDetailsProps> = ({
    avatarUrl,
    displayName,
    nickname,
    userId,
    createdAt,
    isDeleted
}) => {
    return (
        <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-11 h-11 max-xs:w-9 max-xs:h-9">
                <AvatarImage src={avatarUrl || ""} />
                <AvatarFallback className="text-sm bg-[#dadada]">
                    {isDeleted ? <UserRound /> : displayName?.slice(0, 2)}
                </AvatarFallback>
            </Avatar>
            <div className="w-full">
                <div className="flex justify-between gap-5 mb-1">
                    <div className="flex flex-col">
                        <span className="text-md max-xs:text-sm">{displayName || nickname}</span>
                        <Link to={`/profile/${userId}`} className="text-[12px] opacity-50 hover:underline">
                            #{nickname}
                        </Link>
                    </div>
                    <span className="text-[12px] opacity-50">{moment(createdAt).fromNow()}</span>
                </div>
            </div>
        </div>
    );
};
