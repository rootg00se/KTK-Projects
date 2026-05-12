import { useChatStore } from "@/entities/chat";
import { Message, useMessages } from "@/entities/message";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { formatChatDate } from "../lib/format-chat-date";
import { selectUserId } from "@/entities/user";
import { MessageActions } from "@/features/chat/message-actions";

export const ChatMessages: React.FC<{ chatId: string }> = ({ chatId }) => {
    const userId = selectUserId();
    const editMessage = useChatStore((s) => s.editMessage);
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const { messagesData } = useMessages(chatId);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setEditingMessageId(null);
    }, [chatId]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        el.scrollTo({
            top: el.scrollHeight - el.clientHeight,
            behavior: "auto",
        });
    }, [chatId, messagesData?.length]);

    return (
        <div
            ref={containerRef}
            data-slot="chat-messages-scroll"
            className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden px-3 pb-5 pt-3 [overflow-anchor:none]"
        >
            {(() => {
                let lastDate = "";

                return messagesData?.map((message) => {
                    const currentDate = moment(message.created_at).format("YYYY-MM-DD");
                    const isNewDay = currentDate !== lastDate;

                    lastDate = currentDate;

                    return (
                        <React.Fragment key={message.message_id}>
                            {isNewDay && (
                                <div className="text-center text-[13px] opacity-50 my-4">
                                    <span className="px-3 py-1 bg-[#ebe8e8] dark:bg-zinc-800 rounded-xl inline-block shadow-sm">
                                        {formatChatDate(message.created_at)}
                                    </span>
                                </div>
                            )}

                            <Message
                                messageActions={
                                    <MessageActions
                                        messageId={message.message_id}
                                        onEdit={() => setEditingMessageId(message.message_id)}
                                    />
                                }
                                createdAt={message.created_at}
                                isEditing={editingMessageId === message.message_id}
                                onCancelEdit={() => setEditingMessageId(null)}
                                onSubmitEdit={(content) => {
                                    editMessage(message.message_id, content);
                                    setEditingMessageId(null);
                                }}
                                isMe={message.sender_id === userId}
                                avatarUrl={message.users.avatar_url}
                                displayName={message.users.display_name}
                                nickname={message.users.nickname}
                                text={message.content}
                            />
                        </React.Fragment>
                    );
                });
            })()}
        </div>
    );
};
