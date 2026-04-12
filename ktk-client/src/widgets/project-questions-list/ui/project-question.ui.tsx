import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage, Button, Input } from "@/shared/components/ui";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { selectUserId } from "@/entities/user";
import { useUpdateQuestion } from "@/entities/question";

interface IProjectQuestionProps {
    className?: string;
    avatarUrl: string | null;
    displayName: string | null;
    nickname: string;
    createdAt: Date;
    text: string;
    repliesCount: number;
    userId: string;
    projectId: string;
    questionId: string;
}

export const ProjectQuestion: React.FC<IProjectQuestionProps> = ({
    className,
    avatarUrl,
    displayName,
    nickname,
    createdAt,
    text,
    repliesCount,
    userId,
    projectId,
    questionId,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const { updateFunc } = useUpdateQuestion(projectId);

    const authUserId = selectUserId();
    const canEdit = authUserId === userId;

    const handleUpdateQuestion = () => {
        if (editMode) {
            updateFunc({
                text: editedText,
                questionId,
            });

            setEditMode(false);
        }
    };

    return (
        <div className={cn("border-b py-3", className)}>
            <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-11 h-11">
                    <AvatarImage src={avatarUrl || ""} />
                    <AvatarFallback className="text-sm bg-[#dadada]">{displayName || nickname}</AvatarFallback>
                </Avatar>
                <div className="w-full">
                    <div className="flex justify-between gap-5 mb-1">
                        <div className="flex flex-col">
                            <span className="text-md">{displayName || nickname}</span>
                            <Link to={`/profile/${userId}`} className="text-[12px] opacity-50 hover:underline">
                                #{nickname}
                            </Link>
                        </div>
                        <span className="text-[12px] opacity-50">{moment(createdAt).fromNow()}</span>
                    </div>
                </div>
            </div>
            {editMode ? (
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
            ) : (
                <p className="mb-1">{text}</p>
            )}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 opacity-70 cursor-pointer">
                    <PlusCircle size={16} />
                    <span className="text-sm">{repliesCount} Ответов</span>
                </div>
                <div className="">
                    <Button variant={"link"}>Ответить</Button>
                    {canEdit && (
                        <Button onClick={() => setEditMode((editing) => !editing)} variant={"link"}>
                            {editMode ? "Отмена" : "Изменить"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
