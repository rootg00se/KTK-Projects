import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui";
import { IconDots } from "@tabler/icons-react";
import React from "react";

export const TaskActions: React.FC = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-0! cursor-pointer">
                <IconDots size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full mt-4 min-w-40">
                <DropdownMenuItem className="cursor-pointer">
                    <p className="text-sm font-medium">Переместить в</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <p className="text-sm font-medium">Удалить</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
