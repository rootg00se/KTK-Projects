import { Message, useMessages } from "@/entities/message";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { formatChatDate } from "../lib/format-chat-date";
import { selectUserId } from "@/entities/user";

export const ChatMessages: React.FC<{ chatId: string }> = ({ chatId }) => {
    const userId = selectUserId();
    const { messagesData } = useMessages(chatId);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        
        containerRef.current.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "instant",
        });
    }, [chatId, messagesData?.length]);

    return (
        <div ref={containerRef} className="flex flex-1 flex-col gap-1 mt-3 px-3 overflow-y-auto pb-5">
            {(() => {
                let lastDate = "";

                return messagesData?.map((message) => {
                    const currentDate = moment(message.created_at).format("YYYY-MM-DD");
                    const isNewDay = currentDate !== lastDate;

                    lastDate = currentDate;

                    return (
                        <React.Fragment key={message.message_id}>
                            {isNewDay && (
                                <div className="text-center text-[13px] opacity-50 my-4 sticky top-0 z-10">
                                    <span className="px-3 py-1 bg-[#ebe8e8] dark:bg-zinc-800 rounded-xl inline-block shadow-sm">
                                        {formatChatDate(message.created_at)}
                                    </span>
                                </div>
                            )}

                            <Message
                                createdAt={message.created_at}
                                isMe={message.sender_id === userId}
                                text={message.content}
                            />
                        </React.Fragment>
                    );
                });
            })()}
        </div>
    );
};
