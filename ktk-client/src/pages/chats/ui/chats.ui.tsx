import React, { useEffect } from "react";
import { UserChats } from "@/widgets/user-chats";
import { ChatSidebar } from "@/widgets/chat-sidebar";
import { ChatHeader } from "@/widgets/chat-header";
import { ChatMessages } from "@/widgets/chat-messages";
import { SendMessage } from "@/features/chat/send-message";
import { useParams } from "react-router-dom";
import { selectUserId } from "@/entities/user";
import { useChatStore, useChats } from "@/entities/chat";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { Menu } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export const ChatsPage: React.FC = () => {
    const userId = selectUserId();

    const { id: chatId } = useParams();
    const { chatsData } = useChats();

    const { initSocket, disconnect, setActiveChat, setActiveChatPartherName, joinChat, leaveChat, isConnected } =
        useChatStore();

    useEffect(() => {
        if (userId) {
            initSocket(userId);
        }

        return () => disconnect();
    }, [userId, initSocket, disconnect]);

    useEffect(() => {
        if (!chatId) return setActiveChat(null);
        if (!isConnected) return;

        setActiveChat(chatId);
        joinChat(chatId);

        return () => {
            leaveChat(chatId);
        };
    }, [chatId, isConnected, joinChat, leaveChat, setActiveChat]);

    useEffect(() => {
        if (!chatId || !chatsData?.length) return;

        const entry = chatsData.find((chat) => chat.chat_id === chatId);
        const partnerLabel = entry?.partner ? entry.partner.display_name || entry.partner.nickname || null : null;

        if (partnerLabel) setActiveChatPartherName(partnerLabel);
    }, [chatId, chatsData, setActiveChatPartherName]);

    return (
        <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-background">
            <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2 lg:hidden">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button type="button" variant="ghost" size="icon" aria-label="Открыть меню">
                            <Menu className="size-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="start"
                        side="bottom"
                        sideOffset={8}
                        className="w-[min(100vw-1rem,22rem)] max-h-[min(85dvh,36rem)] gap-0 overflow-y-auto overflow-x-hidden p-0"
                    >
                        <ChatSidebar />
                    </PopoverContent>
                </Popover>
                <h1 className="min-w-0 truncate text-center font-heading text-base font-medium">Чаты</h1>
                <span className="size-9 shrink-0" aria-hidden />
            </header>
            <div className="flex min-h-0 flex-1 flex-row overflow-hidden">
                <aside
                    className={cn(
                        "flex h-full min-h-0 w-full shrink-0 flex-col overflow-hidden border-r border-border bg-background md:max-w-80 lg:w-80 lg:max-w-80",
                        chatId && "hidden md:flex",
                    )}
                >
                    <UserChats />
                </aside>
                <main
                    className={cn(
                        "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-r border-border bg-background",
                        !chatId && "hidden md:flex",
                    )}
                >
                    {chatId ? (
                        <>
                            <ChatHeader />
                            <ChatMessages chatId={chatId} />
                            <SendMessage chatId={chatId} />
                        </>
                    ) : (
                        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8">
                            <p className="max-w-md text-center font-heading text-base font-medium text-muted-foreground md:text-lg">
                                Выберите чат, чтобы начать общение
                            </p>
                        </div>
                    )}
                </main>
                <aside className="h-full min-h-0 w-full max-w-100 shrink-0 hidden flex-col overflow-y-auto border-l border-border lg:flex">
                    <ChatSidebar />
                </aside>
            </div>
        </div>
    );
};
