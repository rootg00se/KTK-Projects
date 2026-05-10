import { Chat, useChats } from "@/entities/chat";
import React from "react";
import { EmptyChats } from "./empty-chats.ui";

export const UserChats: React.FC = () => {
    const { chatsData } = useChats();

    if (!chatsData) return <EmptyChats />;

    return (
        <div className="border-r overflow-y-auto">
            {chatsData
                ?.filter((chat) => chat.type !== "group")
                .map((chat) => (
                    <Chat
                        key={chat.chat_id}
                        nickname={chat.partner?.nickname!}
                        avatarUrl={chat.partner?.avatar_url || null}
                        displayName={chat.partner?.display_name || null}
                        messageText={chat.lastMessage?.content || null}
                        lastMessageTime={chat.lastMessage?.created_at || null}
                        chatId={chat.chat_id}
                    />
                ))}
        </div>
    );
};
