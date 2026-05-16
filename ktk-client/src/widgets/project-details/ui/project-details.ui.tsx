import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/shared/components";
import moment from "moment";
import "highlight.js/styles/github.css";
import { useProjectById } from "@/entities/project";
import { ProjectDetailsTag } from "./project-details-tag.ui";
import { useFetchMarkdown } from "@/features/editor/markdown-reader/model/useFetchMarkdown";
import { MarkdownReader } from "@/features/editor/markdown-reader";
import { FaGithubSquare } from "react-icons/fa";
import { parseProjectStatus } from "@/shared/utils/parse-project-status";
import { selectUserId } from "@/entities/user";

export const ProjectDetails: React.FC = () => {
    const [markdown, setMarkdown] = useState("");

    const { id } = useParams();
    const { projectData } = useProjectById(id || "");

    const markdownContent = useFetchMarkdown(projectData?.content_url);
    const authUserId = selectUserId();

    useEffect(() => {
        if (markdownContent) {
            setMarkdown(markdownContent);
        } else {
            setMarkdown("");
        }
    }, [markdownContent]);

    if (!projectData) return null;

    return (
        <div className="mb-5">
            <div className="flex items-start justify-between mb-4 max-sm:mb-2">
                <div className="flex items-center gap-4 mb-3 w-full max-xs:flex-col max-xs:items-start">
                    <Avatar className="w-14 h-14 relative max-xs:w-12 max-xs:h-12">
                        <AvatarImage src={projectData.creator.avatar_url || ""} />
                        <AvatarFallback className="text-lg bg-[#dadada]">
                            {projectData.creator.nickname.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex justify-between w-full max-sm:flex-col max-sm:gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Link to={`/profile/${projectData.creator.user_id}`} className="text-lg">
                                    {projectData.creator.display_name || projectData.creator.nickname}
                                </Link>
                                <span className="text-sm opacity-50">{moment(projectData.created_at).fromNow()}</span>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                                <div className="flex">
                                    {projectData.tags.map((tag) => (
                                        <div className="max-w-5 -ml-2" key={tag.name}>
                                            <img src={tag.badge_url} className="w-full" alt="" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[14px] capitalize">{projectData.tags[0].name}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {(authUserId === projectData.creator_id ||
                                projectData.project_members.some((user) => user.user_id === authUserId)) && (
                                <Button size={"sm"} className="text-[12px]">
                                    <Link to={`/workspace/${id}?tab=settings`}>Редактировать</Link>
                                </Button>
                            )}
                            {projectData.project_link && (
                                <a
                                    href={projectData.project_link}
                                    className="cursor-pointer hover:opacity-80 duration-300"
                                >
                                    <FaGithubSquare size={32} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <div className="mb-5 flex gap-2 max-sm:mb-3">
                    <h2 className="text-2xl font-medium max-sm:text-xl">{projectData.title}</h2>
                    <p className="opacity-60 text-sm max-sm:text-[12px]">{parseProjectStatus(projectData.status)}</p>
                </div>
                <MarkdownReader content={markdown} />
            </div>
            <div className="flex items-center gap-4 flex-wrap mb-3 max-md:gap-2">
                {projectData.tags.map((tag) => (
                    <ProjectDetailsTag key={tag.tag_id} tag={tag.name} />
                ))}
            </div>
        </div>
    );
};
