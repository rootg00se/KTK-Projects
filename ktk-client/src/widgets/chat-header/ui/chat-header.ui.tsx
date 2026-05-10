import { useChatStore } from "@/entities/chat";
import React from "react";

export const ChatHeader: React.FC = () => {
    const name = useChatStore((store) => store.activeChatPartherName);

    return (
        <div className="p-3 min-h-18.5 flex items-center justify-between border-b">
            <div className="">
                <p className="font-heading">{name}</p>
                <p className="text-[12px] opacity-50">Приватный чат</p>
            </div>
        </div>
    );
};
