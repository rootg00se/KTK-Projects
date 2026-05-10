import { Avatar, AvatarFallback, AvatarImage, ContextMenu, ContextMenuTrigger } from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import moment from "moment";
import type React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface IMessageProps {
    isMe?: boolean;
    text: string;
    createdAt: Date;
    nickname: string;
    displayName: string | null;
    avatarUrl: string | null;
    messageActions: React.ReactNode;
    isEditing?: boolean;
    onSubmitEdit?: (content: string) => void;
    onCancelEdit?: () => void;
}

export const Message: React.FC<IMessageProps> = ({
    isMe = false,
    text,
    createdAt,
    nickname,
    displayName,
    avatarUrl,
    messageActions,
    isEditing = false,
    onSubmitEdit,
    onCancelEdit,
}) => {
    const [draft, setDraft] = useState(text);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing) setDraft(text);

        setTimeout(() => {
            if (textareaRef.current) textareaRef.current.focus();
        }, 300);
    }, [isEditing]);

    useLayoutEffect(() => {
        if (!isEditing || !textareaRef.current) return;

        const ta = textareaRef.current;

        ta.style.height = "auto";
        ta.style.height = `${ta.scrollHeight}px`;
    }, [draft, isEditing, text]);

    const submitEdit = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            const trimmed = draft.trim();

            if (trimmed && trimmed !== text) onSubmitEdit?.(trimmed);
            else onCancelEdit?.();
        }

        if (e.key === "Escape") {
            e.preventDefault();
            onCancelEdit?.();
        }
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className={cn("flex items-end gap-2", isMe && "justify-start flex-row-reverse")}>
                    <Avatar className="w-10.5 h-10.5">
                        <AvatarImage src={avatarUrl || ""} />
                        <AvatarFallback className="text-sm bg-[#dadada]">
                            {(displayName || nickname).slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div
                        className={cn(
                            "inline-flex min-w-25 max-w-100 items-end justify-between gap-2 rounded-md bg-[#ebe8e8] p-2",
                            isMe && "bg-primary text-white",
                        )}
                    >
                        {isEditing ? (
                            <textarea
                                ref={textareaRef}
                                value={draft}
                                aria-label="Редактирование сообщения"
                                rows={1}
                                onChange={(e) => setDraft(e.target.value)}
                                onKeyDown={submitEdit}
                                className={cn(
                                    "box-border resize-none overflow-hidden border-0 bg-transparent p-0 font-inherit leading-snug shadow-none outline-none",
                                    "text-white placeholder:text-white/55",
                                    "min-h-9",
                                )}
                            />
                        ) : (
                            <p className="mb-1 min-w-0 flex-1 whitespace-pre-wrap text-left">{text}</p>
                        )}
                        <span className="text-[11px] text-right whitespace-nowrap">
                            {moment(createdAt).format("HH:mm")}
                        </span>
                    </div>
                </div>
            </ContextMenuTrigger>
            {isMe && messageActions}
        </ContextMenu>
    );
};
