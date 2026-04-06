import React from "react";
import { useParams } from "react-router-dom";
import { QuestionItem } from "./question-item.ui";
import { useUserQuestions } from "@/entities/question";

export const QuestionsList: React.FC = () => {
    const { id } = useParams();
    const { userQuestionsData } = useUserQuestions(id || "");

    if (!userQuestionsData) return null;

    return (
        <div className="mt-2">
            <div className="di">
                <div className="rounded-md bg-white mb-7">
                    {userQuestionsData!.map((question, questionIndex) => (
                        <QuestionItem
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
