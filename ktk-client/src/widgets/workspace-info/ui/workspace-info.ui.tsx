import React, { useEffect, useState } from "react";
import { MarkdownReader } from "@/features/editor/markdown-reader";
import { ProjectDetailsTag } from "@/widgets/project-details/ui/project-details-tag.ui";
import { FaGithubSquare } from "react-icons/fa";
import { ProjectQuestionsList } from "@/widgets/project-questions-list";
import { useParams } from "react-router-dom";
import { useProjectQuestions } from "@/entities/question";
import { useParticipants, useProjectById } from "@/entities/project";
import { parseProjectStatus } from "@/shared/utils/parse-project-status";
import { useFetchMarkdown } from "@/features/editor/markdown-reader/model/useFetchMarkdown";
import { ProjectSummary } from "./project-summary.ui";
import { ProjectParticipant } from "./project-participant.ui";

export const WorkspaceInfo: React.FC = () => {
    const [markdown, setMarkdown] = useState("");

    const { id: projectId } = useParams();

    const { projectData } = useProjectById(projectId);
    const { projectQuestionsData } = useProjectQuestions(projectId);
    const { participantsData } = useParticipants(projectId);

    const markdownContent = useFetchMarkdown(projectData?.content_url);

    useEffect(() => {
        if (markdownContent) {
            setMarkdown(markdownContent);
        } else {
            setMarkdown("");
        }
    }, [markdownContent]);

    if (!projectData) return null;
    if (!participantsData) return null;
    if (!projectQuestionsData) return null;

    return (
        <div className="_container">
            <div className="mb-5 py-10 flex gap-10 flex-wrap justify-between">
                <div className="max-w-180">
                    <div className="flex justify-between">
                        <div className="mb-2 flex gap-2 max-xs:flex-col">
                            <h2 className="text-4xl font-semibold max-xs:text-3xl">{projectData.title}</h2>
                            <p className="opacity-60 text-sm">{parseProjectStatus(projectData.status)}</p>
                        </div>
                        {projectData.project_link && (
                            <a href={projectData.project_link} className="cursor-pointer hover:opacity-80 duration-300">
                                <FaGithubSquare size={32} />
                            </a>
                        )}
                    </div>
                    <div className="flex items-center gap-2 ml-2 mb-5">
                        <div className="flex">
                            {projectData.tags.map((tag) => (
                                <div className="max-w-7 -ml-2" key={tag.name}>
                                    <img src={tag.badge_url} className="w-full" alt="" />
                                </div>
                            ))}
                        </div>
                        <p className="text-[17px] capitalize max-xs:hidden">{projectData.tags[0].name}</p>
                    </div>
                    <MarkdownReader content={markdown} />
                    <div className="flex items-center flex-wrap gap-4 mb-3">
                        {projectData.tags.map((tag) => (
                            <ProjectDetailsTag key={tag.tag_id} tag={tag.name} />
                        ))}
                    </div>
                </div>
                <div className="w-full max-w-100">
                    <div className="mb-10">
                        <p className="text-xl mb-4">Участники проекта:</p>
                        <div className="flex-col gap-2">
                            {participantsData.map((participant) => (
                                <ProjectParticipant
                                    key={participant.user_id}
                                    avatar_url={participant.avatar_url}
                                    nickname={participant.nickname}
                                    displayName={participant.display_name}
                                    userId={participant.user_id}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-10">
                        <p className="text-xl mb-4">Сводная информация:</p>
                        <ProjectSummary
                            participantsCount={participantsData.length}
                            likes={projectData.likes}
                            questionsCount={projectQuestionsData?.length}
                        />
                    </div>
                    <div>
                        <p className="text-xl mb-4">Вопросы к проекту:</p>
                        <ProjectQuestionsList />
                    </div>
                </div>
            </div>
        </div>
    );
};
