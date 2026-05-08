import { Avatar, AvatarFallback, AvatarImage, Input } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import React, { useState } from "react";
import testImage from "/default-banner.jpg";
import { IconDots } from "@tabler/icons-react";
import { Forward } from "lucide-react";
import { useMessages } from "@/entities/message";
import { selectUserId, useUser } from "@/entities/user";
import moment from "moment";
import { SidebarNav } from "@/widgets/sidebar/ui/sidebar-nav.ui";
import { Link } from "react-router-dom";
import { LogoutButton } from "@/features/auth/logout-button";
import { Chat, useChats } from "@/entities/chat";
import { useChatSocket } from "@/features/chat/connect-to-chat";

const formatChatDate = (date: Date) => {
    const messageDate = moment(date);
    const now = moment();

    if (messageDate.isSame(now, "day")) {
        return "Сегодня";
    } else if (messageDate.isSame(now.subtract(1, "day"), "day")) {
        return "Вчера";
    } else {
        return messageDate.format("D MMMM YYYY");
    }
};

const Message: React.FC<{ isMe?: boolean; text?: string; createdAt: Date }> = ({
    isMe = false,
    text = "Когда блять",
    createdAt,
}) => {
    return (
        <div className={cn("flex items-end gap-2", isMe && "justify-start flex-row-reverse")}>
            <Avatar className="w-10.5 h-10.5">
                <AvatarImage src={testImage} />
                <AvatarFallback className="text-sm bg-[#dadada]">DE</AvatarFallback>
            </Avatar>
            <div
                className={cn(
                    "bg-[#ebe8e8] min-w-25 justify-between p-2 gap-2 rounded-md max-w-100 flex items-end",
                    isMe && "bg-primary text-white",
                )}
            >
                <p className="mb-1">{text}</p>
                <p className="text-[11px] text-right">{moment(createdAt).format("HH:MM")}</p>
            </div>
        </div>
    );
};

export const ChatsPage: React.FC = () => {
    const userId = selectUserId();

    const [text, setText] = useState("");

    const { messagesData } = useMessages("a53fc0f9-91ec-41aa-a43a-6e02350fe325");
    const { sendMessage } = useChatSocket(userId!, "a53fc0f9-91ec-41aa-a43a-6e02350fe325");
    const { userData } = useUser();
    const { chatsData } = useChats();

    const onMessageSend = () => {
        if (!text.trim()) return;

        sendMessage(text);
        setText("");
    };

    if (!userData) return null;

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="border-r overflow-y-auto">
                {chatsData?.filter(chat => chat.type !== "group").map((chat) => (
                    <Chat key={chat.chat_id} />
                ))}
            </div>
            <div className="flex flex-col flex-1 max-w-280 border-r h-full">
                <div className="p-3 min-h-18.5 flex items-center justify-between border-b">
                    <div className="">
                        <p className="font-heading">Маг воздуха</p>
                        <p className="text-[12px] opacity-50">Гори в аду гандон</p>
                    </div>
                    <div>
                        <IconDots size={20} />
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-1 mt-3 px-3 overflow-y-auto pb-5">
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
                <div className="flex bg-white items-center justify-center border-t gap-2">
                    <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onMessageSend()}
                        autoFocus
                        className="py-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Введите свое сообщение и нажмите enter"
                    />
                    <div
                        onClick={onMessageSend}
                        className="cursor-pointer mr-2 w-10 h-10 rounded-md flex items-center justify-center"
                    >
                        <Forward className="text-primary" />
                    </div>
                </div>
            </div>
            <div className="w-full max-w-100">
                <div className="flex items-center gap-7 min-h-18.5 border-b justify-between w-full px-5">
                    <Link to={`/profile/${userData.user_id}`} className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={userData.avatar_url || ""} />
                            <AvatarFallback className="text-sm bg-[#dadada]">
                                {userData.nickname.slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-[16px]">{userData.display_name || userData.nickname}</div>
                    </Link>
                    <Link to={`/chats`}>
                        <LogoutButton />
                    </Link>
                </div>
                <div className="p-5 pb-0 w-full border-b">
                    <SidebarNav />
                </div>
            </div>
        </div>
    );
};
