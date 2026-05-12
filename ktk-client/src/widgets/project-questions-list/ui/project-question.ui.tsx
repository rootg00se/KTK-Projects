import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components";
import React, { useState } from "react";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { selectUserId } from "@/entities/user";
import { useReplies } from "@/entities/question";
import { useDeleteQuestion } from "@/features/question/delete-question";
import { SendQuestion } from "@/features/question/send-question";
import { QuestionUserDetails } from "./question-user-detailts";
import { UpdateQuestion } from "@/features/question/update-question";

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
    activeReplyId?: string | null;
    setActiveReplyId?: (id: string | null) => void;
    isDeleted: boolean;
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
    activeReplyId,
    setActiveReplyId,
    isDeleted,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    const { repliesData } = useReplies(questionId);
    const { deleteFunc } = useDeleteQuestion(projectId);

    const authUserId = selectUserId();
    const canEdit = !isDeleted && authUserId === userId;

    const handleDeleteQuestion = () => deleteFunc({ questionId });
    const handleReplies = () => setShowReplies((prev) => !prev);

    return (
        <div className={cn("border-b py-3", className)}>
            <QuestionUserDetails
                userId={userId}
                avatarUrl={avatarUrl}
                nickname={nickname}
                displayName={displayName}
                isDeleted={isDeleted}
                createdAt={createdAt}
            />
            {editMode ? (
                <UpdateQuestion
                    onSuccess={() => setEditMode(false)}
                    questionId={questionId}
                    projectId={projectId}
                    text={text}
                />
            ) : (
                <p className={cn("mb-1", isDeleted && "italic text-muted-foreground")}>{text}</p>
            )}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 opacity-70 cursor-pointer" onClick={handleReplies}>
                        {showReplies ? <MinusCircle size={16} /> : <PlusCircle size={16} />}
                        <span className="text-sm max-xs:hidden">{repliesCount} Ответов</span>
                    </div>
                    <div className="">
                        <Button
                            onClick={() => setActiveReplyId?.(activeReplyId === questionId ? null : questionId)}
                            variant={"link"}
                            className="max-sm:text-[13px]"
                        >
                            {activeReplyId !== null && activeReplyId === questionId ? "Отмена" : "Ответить"}
                        </Button>
                        {canEdit && (
                            <Button onClick={() => setEditMode((editing) => !editing)} className="max-sm:text-[13px]" variant={"link"}>
                                {editMode ? "Отмена" : "Изменить"}
                            </Button>
                        )}
                    </div>
                </div>
                {canEdit && !isDeleted && (
                    <Trash2
                        onClick={handleDeleteQuestion}
                        size={21}
                        className="text-primary cursor-pointer hover:text-destructive transition-colors"
                    />
                )}
            </div>
            {showReplies &&
                repliesData?.map((reply) => (
                    <ProjectQuestion
                        key={reply.question_id}
                        text={reply.is_deleted ? "Сообщение удалено" : reply.text}
                        isDeleted={reply.is_deleted}
                        createdAt={reply.created_at}
                        avatarUrl={reply.is_deleted ? null : reply.users?.avatar_url || null}
                        displayName={reply.is_deleted ? "Удаленное сообщение" : reply.users?.display_name || null}
                        nickname={reply.is_deleted ? "deleted" : reply.users?.nickname || ""}
                        repliesCount={reply.repliesCount}
                        userId={reply.user_id || ""}
                        projectId={reply.project_id}
                        className="border-0 pl-15 pt-6 max-md:pl-5"
                        questionId={reply.question_id}
                        setActiveReplyId={setActiveReplyId}
                        activeReplyId={activeReplyId}
                    />
                ))}
            {activeReplyId === questionId && (
                <SendQuestion
                    onSuccess={() => {
                        setShowReplies(true);
                        setActiveReplyId?.(null);
                    }}
                    className="mt-2"
                    parentId={questionId}
                />
            )}
        </div>
    );
};
