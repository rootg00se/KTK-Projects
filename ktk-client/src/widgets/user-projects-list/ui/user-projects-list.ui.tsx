import { useUserProjects } from "@/entities/project";
import React from "react";
import { ProjectItem } from "../../../entities/project/ui/project-item.ui";
import { useParams } from "react-router-dom";
import { EmtpyProjects } from "./empty-projects.ui";
import { selectUserId } from "@/entities/user";

export const UserProjectsList: React.FC = () => {
    const { id } = useParams();
    const userId = selectUserId();
    const { userProjectsData } = useUserProjects(id || "");

    if (!userProjectsData?.length) {
        return userId === id ? (
            <EmtpyProjects />
        ) : (
            <p className="text-center py-8 text-lg font-bold opacity-40">Здесь пока нету проектов</p>
        );
    }

    return (
        <div className="mt-2">
            <div className="di">
                <div className="rounded-md px-5 bg-white mb-7">
                    {userProjectsData!.map((project, projectIndex) => (
                        <ProjectItem
                            userId={project.creator_id}
                            projectId={project.project_id}
                            isLiked={project.is_liked || false}
                            avatar={project.creator.avatar_url}
                            createdAt={project.created_at}
                            title={project.title}
                            tags={project.tags}
                            key={project.project_id}
                            displayName={project.creator.display_name || project.creator.nickname}
                            className={projectIndex === userProjectsData!.length - 1 ? "border-none" : ""}
                            likes={project.likes}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
