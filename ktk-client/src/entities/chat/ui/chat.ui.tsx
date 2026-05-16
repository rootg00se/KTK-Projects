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
                "flex min-h-18.5 w-full min-w-0 cursor-pointer items-center gap-3 border-b border-border p-3",
                activeChatId === chatId && "bg-primary text-white!",
            )}
        >
            <Avatar className="w-12 h-12">
                <AvatarImage src={avatarUrl || ""} />
                <AvatarFallback className="text-sm bg-[#dadada]">
                    {(displayName || nickname).slice(0, 2)}
                </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-start justify-between gap-2">
                    <p className="min-w-0 truncate font-medium text-[14px]">{displayName || nickname}</p>
                    {lastMessageTime && (
                        <span className="shrink-0 text-[12px] font-heading text-muted-foreground">
                            {moment(lastMessageTime).format("HH:MM")}
                        </span>
                    )}
                </div>
                {messageText && <p className="truncate text-[14px] text-muted-foreground">{messageText}</p>}
            </div>
        </div>
    );
};
