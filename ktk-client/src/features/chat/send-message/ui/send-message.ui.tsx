import { useChatStore } from "@/entities/chat";
import { Input } from "@/shared/components";
import { Forward } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const SendMessage: React.FC<{ chatId: string }> = ({ chatId }) => {
    const [text, setText] = useState("");
    const sendMessage = useChatStore(store => store.sendMessage);

    const onMessageSend = () => {
        if (!text.trim()) return;
        if (!chatId) return toast.error("Что-то пошло не так")

        sendMessage(chatId, text);
        setText("");
    };

    return (
        <div className="flex shrink-0 items-center justify-center gap-2 border-t border-border bg-background pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onMessageSend()}
                autoFocus
                className="py-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 max-sm:text-sm"
                placeholder="Введите свое сообщение и нажмите enter"
            />
            <div
                onClick={onMessageSend}
                className="cursor-pointer mr-2 w-10 h-10 rounded-md flex items-center justify-center"
            >
                <Forward className="text-primary" />
            </div>
        </div>
    );
};
