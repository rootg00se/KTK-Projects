import React, { useEffect } from "react";
import { ProjectItem, useProjects } from "@/entities/project";
import { useInView } from "react-intersection-observer";
import { useProjectsFilter } from "../../../features/project/projects-filter/model/useProjectsFilter";
import { chunkProjects } from "../lib/chunk-projects";

export const ProjectsList: React.FC = () => {
    const { tagsFilter, queryFilter } = useProjectsFilter();
    const { projectsData, projectsPending, fetchNextPage, hasNextPage } = useProjects(tagsFilter, queryFilter);
    const { ref, inView } = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (projectsPending) return null;

    const projectGroups = chunkProjects(projectsData || [], 4);

    return (
        <div className="mt-2 w-full">
            <div className="di">
                {projectGroups.map((group, groupIndex) => (
                    <div key={`group-${groupIndex}`} className="rounded-md px-5 bg-white mb-7">
                        {group!.map((project, projectIndex) => (
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
                                className={projectIndex === group.length - 1 ? "border-none" : ""}
                                likes={project.likes}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div ref={ref}></div>
        </div>
    );
};
