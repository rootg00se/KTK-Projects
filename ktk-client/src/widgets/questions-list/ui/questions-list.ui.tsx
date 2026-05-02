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
                            key={question.question_id}
                            userId={question.user_id || ""}
                            nickname={question.users?.nickname || "deleted"}
                            projectId={question.project_id}
                            avatar={question.is_deleted ? null : question.users?.avatar_url || null}
                            displayName={
                                question.is_deleted
                                    ? "Вопрос удален"
                                    : question.users?.display_name || question.users?.nickname || ""
                            }
                            text={question.is_deleted ? "Этот вопрос был удален" : question.text}
                            isDeleted={question.is_deleted}
                            createdAt={question.created_at}
                            className={questionIndex === userQuestionsData.length - 1 ? "border-none" : ""}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
