import { Button } from "@/shared/components";
import React from "react";
import { useCreateChat } from "../model/useCreateChat";
import { toast } from "react-toastify";
import { useChats } from "@/entities/chat";
import { useNavigate } from "react-router-dom";

export const CreatePrivateChat: React.FC<{ userId: string }> = ({ userId }) => {
    const navigate = useNavigate();

    const { createChatFunc, isCreateChatPenfing } = useCreateChat();
    const { chatsData } = useChats();

    const handleCreateChat = () => {
        if (!userId) return toast.error("Что-то пошло не так");

        const existingChat = chatsData?.find((chat) => chat.partner?.user_id === userId);
        if (existingChat) return navigate(`/chats/${existingChat.chat_id}`);

        createChatFunc({
            userId,
        });
    };

    return (
        <Button onClick={handleCreateChat} disabled={isCreateChatPenfing} className="w-full mb-3 max-w-40">
            Написать
        </Button>
    );
};
