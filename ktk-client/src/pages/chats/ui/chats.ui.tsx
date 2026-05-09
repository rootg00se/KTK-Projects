import React, { useEffect } from "react";
import { UserChats } from "@/widgets/user-chats";
import { ChatSidebar } from "@/widgets/chat-sidebar";
import { ChatHeader } from "@/widgets/chat-header";
import { ChatMessages } from "@/widgets/chat-messages";
import { SendMessage } from "@/features/chat/send-message";
import { useParams } from "react-router-dom";
import { selectUserId } from "@/entities/user";
import { useChatStore } from "@/entities/chat";

export const ChatsPage: React.FC = () => {
    const userId = selectUserId();

    const { id: chatId } = useParams();
    const { initSocket, disconnect, joinChat, leaveChat, isConnected } = useChatStore();

    useEffect(() => {
        if (userId) {
            initSocket(userId);
        }

        return () => disconnect();
    }, [userId, initSocket, disconnect]);

    useEffect(() => {
        if (isConnected && chatId) {
            joinChat(chatId);

            return () => {
                leaveChat(chatId);
            };
        }
    }, [chatId, isConnected, joinChat, leaveChat]);

    return (
        <div className="flex h-screen overflow-hidden">
            <UserChats />
            {chatId ? (
                <div className="flex flex-col flex-1 max-w-280 border-r h-full">
                    <ChatHeader />
                    <ChatMessages chatId={chatId} />
                    <SendMessage chatId={chatId} />
                </div>
            ) : (
                <div className="flex flex-col flex-1 max-w-280 border-r h-full justify-center items-center">
                    <p className="text-xl font-heading opacity-50 font-medium">Выберите чат чтобы начать общенение</p>
                </div>
            )}
            <ChatSidebar />
        </div>
    );
};
