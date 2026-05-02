import { useProjectQuestions } from "@/entities/question";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectQuestion } from "./project-question.ui";

export const ProjectQuestionsList: React.FC = () => {
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

    const { id: projectId } = useParams();
    const { projectQuestionsData } = useProjectQuestions(projectId!);

    if (!projectQuestionsData) return null;

    return projectQuestionsData.map((question, index, arr) => (
        <ProjectQuestion
            key={question.question_id}
            avatarUrl={question.is_deleted ? null : question.users?.avatar_url || null}
            displayName={question.is_deleted ? "Удаленное сообщение" : question.users?.display_name || null}
            nickname={question.is_deleted ? "deleted" : question.users?.nickname || ""}
            text={question.is_deleted ? "Сообщение удалено" : question.text}
            isDeleted={question.is_deleted}
            createdAt={question.created_at}
            className={`${index === arr.length - 1 && "border-none"}`}
            repliesCount={question.repliesCount}
            userId={question.user_id || ""}
            projectId={question.project_id}
            activeReplyId={activeReplyId}
            setActiveReplyId={setActiveReplyId}
            questionId={question.question_id}
        />
    ));
};
