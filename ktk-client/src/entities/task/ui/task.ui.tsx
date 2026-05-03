import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui";
import React from "react";

export const Task: React.FC = () => {
    return (
        <div className="px-3 py-3 rounded-lg border bg-white shadow-sm">
            <p className="mb-2 text-[14px] opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit sdf.</p>
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-heading font-medium tracking-wider text-white bg-[#a0350c] px-2 py-0.5 rounded">
                    Выполнена
                </span>
                <Avatar className="w-7 h-7">
                    <AvatarImage src={""} />
                    <AvatarFallback className="text-[10px] bg-white">DE</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};
