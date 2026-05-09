import React from "react";
import testImage from "/default-banner.jpg";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui";
import { useChatStore } from "../model/chat.store";
import { useNavigate } from "react-router-dom";

export const Chat: React.FC<{ chatId: string }> = ({ chatId }) => {
    const navigate = useNavigate();

    const setActiveChat = useChatStore((store) => store.setActiveChat);
    const activeChatId = useChatStore((store) => store.activeChatId);

    const handleChangeChat = () => {
        setActiveChat(chatId);

        navigate(`/chats/${chatId}`);
    };

    return (
        <div
            onClick={handleChangeChat}
            className={cn(
                "flex items-center gap-3 min-h-18.5 p-3 border-b cursor-pointer",
                activeChatId === chatId && "bg-primary text-white!",
            )}
        >
            <Avatar className="w-12 h-12">
                <AvatarImage src={testImage} />
                <AvatarFallback className="text-sm bg-[#dadada]">DE</AvatarFallback>
            </Avatar>
            <div>
                <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-[14px]">DeG00se</p>
                    <span className="text-[12px] font-heading opacity-50">4:35</span>
                </div>
                <p className="whitespace-nowrap max-w-75 truncate text-[14px] opacity-50">
                    Я у дерева огромные яйца вижу это считается?
                </p>
            </div>
        </div>
    );
};
