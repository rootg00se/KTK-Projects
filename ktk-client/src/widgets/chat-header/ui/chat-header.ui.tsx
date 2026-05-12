import { useChatStore } from "@/entities/chat";
import { Button } from "@/shared/components";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ChatHeader: React.FC = () => {
    const name = useChatStore((store) => store.activeChatPartherName);
    const navigate = useNavigate();
    const { id: chatId } = useParams();

    return (
        <div className="flex min-h-18.5 shrink-0 items-center justify-between gap-2 border-b border-border p-3">
            <div className="flex min-w-0 flex-1 items-center gap-1">
                {chatId ? (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0 md:hidden"
                        aria-label="К списку чатов"
                        onClick={() => navigate("/chats")}
                    >
                        <ChevronLeft className="size-5" />
                    </Button>
                ) : null}
                <div className="min-w-0">
                    <p className="truncate font-heading">{name}</p>
                    <p className="text-[12px] text-muted-foreground">Приватный чат</p>
                </div>
            </div>
        </div>
    );
};
