import React from "react";

interface IUserBadgeProps {
    displayName: string | null;
    nickname: string;
    email: string;
}

export const UserBadge: React.FC<IUserBadgeProps> = ({ displayName, nickname, email }) => {
    return (
        <div className="">
            <p className="text-3xl font-medium mr-2 max-sm:text-2xl">{displayName || nickname}</p>
            <p className="text-sm font-medium">#{nickname}</p>
            <p className="text-sm opacity-50">{email}</p>
        </div>
    );
};
