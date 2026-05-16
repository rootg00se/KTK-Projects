import { useCreateQuestion } from "../model/useCreateQuestion";
import { Button } from "@/shared/components";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { Forward } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface ISendQuestionProps {
    parentId?: string;
    className?: string;
    onSuccess?: () => void;
}

export const SendQuestion: React.FC<ISendQuestionProps> = ({ parentId, className, onSuccess }) => {
    const { id } = useParams();

    const [question, setQuestion] = useState("");
    const { createQuestionFunc } = useCreateQuestion();

    const handleSendQuestion = () => {
        createQuestionFunc({
            projectId: id!,
            text: question,
            parentId,
        });

        setQuestion("");
        onSuccess?.();
    };

    return (
        <div className={cn("border rounded-md flex-col", className)}>
            <Input
                className="max-sm:text-sm border-none shadow-none focus:border-none focus:outline-0 focus:ring-0 outline-0 focus-visible:border-none focus-visible:ring-0"
                placeholder="Введите свой вопрос..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="mr-2 mb-2">
                <Button
                    onClick={handleSendQuestion}
                    size={"sm"}
                    className="ml-[100%] max-sm:hidden -translate-x-full text-[13px]"
                >
                    Отправить вопрос
                </Button>
                <div onClick={handleSendQuestion} className="sm:hidden flex bg-primary rounded-md p-1 items-center ml-[100%] -translate-x-full justify-center h-8 w-8 text-white">
                    <Forward size={18} />
                </div>
            </div>
        </div>
    );
};
