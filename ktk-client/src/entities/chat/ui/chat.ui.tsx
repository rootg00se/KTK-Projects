import React from "react";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components";
import { useChatStore } from "../model/chat.store";
import { useNavigate } from "react-router-dom";
import moment from "moment";

interface IChatProps {
    chatId: string;
    avatarUrl: string | null;
    displayName: string | null;
    nickname: string;
    messageText: string | null;
    lastMessageTime: Date | null;
}

export const Chat: React.FC<IChatProps> = ({
    chatId,
    avatarUrl,
    displayName,
    nickname,
    messageText,
    lastMessageTime,
}) => {
    const navigate = useNavigate();

    const setActiveChat = useChatStore((store) => store.setActiveChat);
    const activeChatId = useChatStore((store) => store.activeChatId);
    const setName = useChatStore((store) => store.setActiveChatPartherName);

    const handleChangeChat = () => {
        setActiveChat(chatId);
        setName(displayName || nickname);

        navigate(`/chats/${chatId}`);
    };

    return (
        <div
            onClick={handleChangeChat}
            className={cn(
                "flex min-w-95 w-full items-center gap-3 min-h-18.5 p-3 border-b cursor-pointer",
                activeChatId === chatId && "bg-primary text-white!",
            )}
        >
            <Avatar className="w-12 h-12">
                <AvatarImage src={avatarUrl || ""} />
                <AvatarFallback className="text-sm bg-[#dadada]">
                    {(displayName || nickname).slice(0, 2)}
                </AvatarFallback>
            </Avatar>
            <div className="w-full">
                <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-[14px]">{displayName || nickname}</p>
                    <span className="text-[12px] font-heading opacity-50">
                        {moment(lastMessageTime).format("HH:MM")}
                    </span>
                </div>
                <p className="whitespace-nowrap max-w-75 truncate text-[14px] opacity-50">{messageText}</p>
            </div>
        </div>
    );
};
