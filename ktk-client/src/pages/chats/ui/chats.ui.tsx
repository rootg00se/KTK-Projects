import { Avatar, AvatarFallback, AvatarImage, Input } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import React from "react";
import testImage from "/default-banner.jpg";
import { IconDots } from "@tabler/icons-react";
import { Forward } from "lucide-react";

const Chat: React.FC<{ active?: boolean }> = ({ active = false }) => {
    return (
        <div className={cn("flex items-center gap-3 min-h-20.5 p-3 border-b", active && "bg-[#c55245] text-white!")}>
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

const Message: React.FC<{ left?: boolean; text?: string }> = ({ left = false, text = "Когда блять" }) => {
    return (
        <div className={cn("flex items-end gap-2", left && "justify-start flex-row-reverse")}>
            <Avatar className="w-10.5 h-10.5">
                <AvatarImage src={testImage} />
                <AvatarFallback className="text-sm bg-[#dadada]">DE</AvatarFallback>
            </Avatar>
            <div className={cn("bg-[#ebe8e8] min-w-25 justify-between p-2 gap-2 rounded-md max-w-100 flex items-end", left && "bg-[#c55245] text-white")}>
                <p className="mb-1">{text}</p>
                <p className="text-[11px] text-right">12:03</p>
            </div>
        </div>
    );
};

export const ChatsPage: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="border-r">
                <Chat active />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
            </div>
            <div className="flex flex-col flex-1 max-w-280 border-r h-full">
                <div className="p-4 min-h-20.5 flex items-center justify-between border-b">
                    <div className="">
                        <p className="font-heading">Маг воздуха</p>
                        <p className="text-[12px] opacity-50">Гори в аду гандон</p>
                    </div>
                    <div>
                        <IconDots />
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-1 mt-3 px-3">
                    <div className="text-center text-[13px] opacity-50 mb-4">
                        <span className="px-2 py-1 bg-[#ebe8e8] rounded-xl inline-block">Май 5 - 2025</span>
                    </div>
                    <Message />
                    <Message left text="lorem ipsum dolar lorem ipsum dolar nice pets nice" />
                    <Message text="Okat" />
                    <div className="text-center text-[13px] opacity-50 mb-4">
                        <span className="px-2 py-1 bg-[#ebe8e8] rounded-xl inline-block">Вчера</span>
                    </div>
                    <Message
                        text="lorem ipsum dolar lorem ipsum dolar nice pets nice lorem ipsum dolar lorem ipsum dolar nice pets nice lorem ipsum"
                        left
                    />
                    <Message text="lorem ipsum dolar lorem ipsum dolar nice pets nice" left />
                    <Message />
                </div>
                <div className="flex justify-center py-5 px-5 gap-2">
                    <Input className="py-5" placeholder="Введите свое сообщение и нажмите enter" />
                    <div className="bg-[#c55245] w-10 h-10 rounded-md flex items-center justify-center">
                        <Forward className="text-white" />
                    </div>
                </div>
            </div>
            <div>Extra</div>
        </div>
    );
};
