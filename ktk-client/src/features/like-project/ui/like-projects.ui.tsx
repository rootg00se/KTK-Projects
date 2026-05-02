import { useToggleLike } from "../model/useToggleLike";
import { Heart } from "lucide-react";
import React from "react";

interface ILikeProjectProps {
    likes: number;
    isLiked: boolean;
    projectId: string;
}

export const LikeProject: React.FC<ILikeProjectProps> = ({ likes, isLiked, projectId }) => {
    const { toggleLikeFun } = useToggleLike(!isLiked);

    return (
        <div
            className={`flex items-center gap-2 cursor-pointer ${isLiked ? "text-primary" : ""}`}
            onClick={() => toggleLikeFun({ projectId })}
        >
            <Heart size={18} />
            <span className="">{likes}</span>
        </div>
    );
};
