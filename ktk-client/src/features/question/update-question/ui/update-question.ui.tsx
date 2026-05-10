import { useUpdateQuestion } from "../model/useUpdateQuestion";
import { Button, Input } from "@/shared/components";
import React, { useState } from "react";

interface IUpdateQuestionProps {
    text: string;
    projectId: string;
    questionId: string;
    onSuccess: () => void;
}

export const UpdateQuestion: React.FC<IUpdateQuestionProps> = ({ text, projectId, questionId, onSuccess }) => {
    const [editedText, setEditedText] = useState(text);
    const { updateFunc } = useUpdateQuestion(projectId);

    const handleUpdateQuestion = () => {
        updateFunc({
            text: editedText,
            questionId,
        });

        onSuccess?.();
    };

    return (
        <div className="flex">
            <Input
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleUpdateQuestion();
                }}
                autoFocus={true}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />
            <Button onClick={handleUpdateQuestion}>Сохранить</Button>
        </div>
    );
};
