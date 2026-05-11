import { UsersRound } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const ProfileLinks: React.FC<{ projectsCount: number; friendsCount: number }> = ({
    projectsCount,
    friendsCount,
}) => {
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className="px-5 mt-3 flex gap-2 items-center text-sm">
            <UsersRound size={16} />
            <Link to="?tab=projects" onClick={scrollToBottom} className="cursor-pointer hover:underline">
                {projectsCount} <span className="opacity-65">Личных Проектов</span>
            </Link>
            <span>·</span>
            <Link to="friends" className="cursor-pointer hover:underline">
                {friendsCount} <span className="opacity-65">Друзей</span>
            </Link>
        </div>
    );
};
