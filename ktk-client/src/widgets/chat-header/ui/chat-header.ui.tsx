import { IconDots } from "@tabler/icons-react";
import React from "react";

export const ChatHeader: React.FC = () => {
    return (
        <div className="p-3 min-h-18.5 flex items-center justify-between border-b">
            <div className="">
                <p className="font-heading">Маг воздуха</p>
                <p className="text-[12px] opacity-50">Гори в аду гандон</p>
            </div>
            <div>
                <IconDots size={20} />
            </div>
        </div>
    );
};
