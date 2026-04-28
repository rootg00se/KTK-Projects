import React from "react";
import { useParams } from "react-router-dom";
import { QuestionItem } from "./question-item.ui";
import { useUserQuestions } from "@/entities/question";

export const QuestionsList: React.FC = () => {
    const { id } = useParams();
    const { userQuestionsData } = useUserQuestions(id || "");

    if (!userQuestionsData?.length)
        return <p className="text-center py-8 text-lg font-bold opacity-40">Здесь пока нету вопросов</p>;

    return (
        <div className="mt-2">
            <div className="di">
                <div className="rounded-md bg-white mb-7">
                    {userQuestionsData!.map((question, questionIndex) => (
                        <QuestionItem
                            userId={question.user_id}
                            nickname={question.users.nickname}
                            projectId={question.project_id}
                            avatar={question.users.avatar_url}
                            displayName={question.users.display_name || question.users.nickname}
                            text={question.text}
                            createdAt={question.created_at}
                            key={question.question_id}
                            className={questionIndex === userQuestionsData!.length - 1 ? "border-none" : ""}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
