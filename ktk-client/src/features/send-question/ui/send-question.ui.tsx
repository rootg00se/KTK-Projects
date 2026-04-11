import { useCreateQuestion } from "@/entities/question";
import { Button } from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const SendQuestion: React.FC = () => {
    const { id } = useParams();

    const [question, setQuestion] = useState("");
    const { createQuestionFunc } = useCreateQuestion();

    const handleSendQuestion = () => {
        createQuestionFunc({
            projectId: id!,
            text: question,
        });

        setQuestion("");
    };

    return (
        <div className="border rounded-md flex-col">
            <Input
                className="border-none shadow-none focus:border-none focus:outline-0 focus:ring-0 outline-0 focus-visible:border-none focus-visible:ring-0"
                placeholder="Введите свой вопрос..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="mr-2 mb-2">
                <Button onClick={handleSendQuestion} size={"sm"} className="ml-[100%] -translate-x-full text-[13px]">
                    Отправить вопрос
                </Button>
            </div>
        </div>
    );
};
