import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components";
import React from "react";
import { Link } from "react-router-dom";

interface IProjectParticipantProps {
    avatar_url: string | null;
    nickname: string;
    displayName: string | null;
    userId: string;
}

export const ProjectParticipant: React.FC<IProjectParticipantProps> = ({
    avatar_url,
    nickname,
    displayName,
    userId,
}) => {
    return (
        <div className="flex items-center border-b pb-3 max-w-80 gap-2 mb-3">
            <Avatar className="w-11 h-11 relative">
                <AvatarImage src={avatar_url || ""} />
                <AvatarFallback className="text-lg bg-[#dadada]">{nickname.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
                <p>{displayName || nickname}</p>
                <Link to={`/profile/${userId}`} className="text-[12px] opacity-50 hover:underline">
                    #{nickname}
                </Link>
            </div>
        </div>
    );
};
