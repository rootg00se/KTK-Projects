import React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui";
import moment from "moment";
import { Link } from "react-router-dom";
import type { TagData } from "../model/types";
import { LikeProject } from "@/features/project/like-project";

interface IProjectItemProps {
    projectId: string;
    createdAt: Date;
    tags: TagData[];
    title: string;
    displayName: string;
    avatar: string | null;
    className?: string;
    likes: number;
    userId: string;
    isLiked: boolean;
    renderAction?: React.ReactNode; 
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
    renderAction 

}) => {
    return (
        <div className={cn("py-4 border-b flex justify-between items-end gap-4", className)}>
            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 mb-3">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={avatar || ""} />
                            <AvatarFallback className="text-sm bg-[#dadada]">
                                {displayName.slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Link to={`/profile/${userId}`} className="hover:underline font-medium text-sm">
                                    {displayName}
                                </Link>
                                <span className="text-sm opacity-50">{moment(createdAt).fromNow()}</span>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                                <div className="flex">
                                    {tags.map((el) => (
                                        <div className="max-w-5 -ml-2" key={el.name}>
                                            <img src={el.badge_url} className="w-full" alt={el.name} />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[14px] capitalize text-muted-foreground">
                                    {tags[0]?.name || "Empty tag"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={`/project/${projectId}`} className="text-lg font-medium font-heading mb-3 hover:underline block">
                    {title}
                </Link>
                <div className="flex items-center gap-4 mt-3">
                    <LikeProject isLiked={isLiked} projectId={projectId} likes={likes} />
                    <div className="flex items-center gap-2 opacity-70 hover:opacity-100 cursor-pointer transition-opacity">
                        <MessageCircle size={18} />
                        <span className="text-sm">Задать вопрос</span>
                    </div>
                </div>
            </div>
            {renderAction && (
                <div className="shrink-0 mb-1">
                    {renderAction}
                </div>
            )}
        </div>
    );
};
