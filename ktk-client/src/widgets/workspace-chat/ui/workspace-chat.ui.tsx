import { useChatStore, useProjectChat } from "@/entities/chat";
import { selectUserId } from "@/entities/user";
import { SendMessage } from "@/features/chat/send-message";
import { ChatMessages } from "@/widgets/chat-messages";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const WorkspaceChat: React.FC = () => {
    const userId = selectUserId();

    const { id: projectId } = useParams();
    const { projectChatData } = useProjectChat(projectId);

    const { initSocket, disconnect, setActiveChat, joinChat, leaveChat, isConnected } = useChatStore();

    useEffect(() => {
        if (userId) {
            initSocket(userId);
        }

        return () => disconnect();
    }, [userId, initSocket, disconnect]);

    useEffect(() => {
        if (!projectChatData?.chat_id) return setActiveChat(null);
        if (!isConnected) return;

        setActiveChat(projectChatData.chat_id);
        joinChat(projectChatData.chat_id);

        return () => {
            leaveChat(projectChatData.chat_id);
        };
    }, [projectChatData?.chat_id, isConnected, joinChat, leaveChat, setActiveChat]);

    if (!projectChatData) return;

    return (
        <div className="_container w-full flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-auto">
                <ChatMessages chatId={projectChatData.chat_id} />
            </div>
            <SendMessage chatId={projectChatData.chat_id} />
        </div>
    );
};
