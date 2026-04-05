import React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui";
import moment from "moment";
import { Link } from "react-router-dom";
import type { TagData } from "../model/types";
import { LikeProject } from "@/features/like-project";

interface IProjectItemProps {
    projectId: string;
    createdAt: Date;
    tags: TagData[];
    title: string;
    displayName: string;
    avatar: string | null;
    className?: string;
    likes: number;
    userId: string
    isLiked: boolean;
}

export const ProjectItem: React.FC<IProjectItemProps> = ({
    projectId,
    className,
    createdAt,
    tags,
    title,
    displayName,
    avatar,
    likes,
    isLiked,
    userId,
}) => { 
    return (
        <div className={cn("py-4 border-b", className)}>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 mb-3">
                        <Avatar className="w-12 h-12">
                            {avatar && <AvatarImage src={avatar} />}
                            <AvatarFallback className="text-sm bg-[#dadada]">{displayName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Link to={`/profile/${userId}`} className="hover:underline">{displayName}</Link>
                                <span className="text-sm opacity-50">{moment(createdAt).fromNow()}</span>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                                <div className="flex">
                                    {tags.map((el) => (
                                        <div className="max-w-5 -ml-2" key={el.name}>
                                            <img src={el.badge_url} className="w-full" alt="" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[14px] capitalize">{tags[0]?.name || "Empty tag"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={`/project/${projectId}`} className="text-lg font-medium mb-3 hover:underline">{title}</Link>
                <div className="flex items-center gap-4 mt-3">
                    <LikeProject isLiked={isLiked} projectId={projectId} likes={likes} />
                    <div className="flex items-center gap-2">
                        <MessageCircle size={18} />
                        <span className="text-sm">Задать вопрос</span>
                    </div>
                </div>
        </div>
    );
};
