import { Heart, MailQuestion, UsersRound } from "lucide-react";
import React from "react";

interface IProjectSummaryProps {
    likes: number;
    participantsCount: number;
    questionsCount: number;
}

export const ProjectSummary: React.FC<IProjectSummaryProps> = ({ likes, participantsCount, questionsCount }) => {
    return (
        <ul>
            <li className="mb-2 flex items-center gap-2">
                <Heart className="opacity-70" size={18} />
                <div className="text-[16px] flex gap-3">
                    <span className="opacity-70">Лайков:</span>
                    <span className="text-primary font-bold">{likes}</span>
                </div>
            </li>
            <li className="mb-2 flex items-center gap-2">
                <UsersRound className="opacity-70" size={18} />
                <div className="text-[16px] flex gap-3">
                    <span className="opacity-70">Участников:</span>
                    <span className="text-primary font-bold">{participantsCount}</span>
                </div>
            </li>
            <li className="mb-2 flex items-center gap-2">
                <MailQuestion className="opacity-70" size={18} />
                <div className="text-[16px] flex gap-3">
                    <span className="opacity-70">Вопросов:</span>
                    <span className="text-primary font-bold">{questionsCount}</span>
                </div>
            </li>
        </ul>
    );
};
