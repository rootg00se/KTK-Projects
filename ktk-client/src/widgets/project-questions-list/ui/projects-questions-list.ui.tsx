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
            text={question.text}
            createdAt={question.created_at}
            avatarUrl={question.users.avatar_url}
            displayName={question.users.display_name}
            nickname={question.users.nickname}
            className={`${index === arr.length - 1 && "border-none"}`}
            repliesCount={question.repliesCount}
            userId={question.user_id}
            projectId={question.project_id}
            activeReplyId={activeReplyId}
            setActiveReplyId={setActiveReplyId}
            questionId={question.question_id}
        />
    ));
};
