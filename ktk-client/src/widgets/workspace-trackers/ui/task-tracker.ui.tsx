import { Task } from "@/entities/task";
import { IconDots } from "@tabler/icons-react";
import { Plus } from "lucide-react";
import React from "react";

export const TaskTracker: React.FC = () => {
    return (
        <div className="min-w-85 border bg-[#fafafa] rounded-lg p-3.5 max-w-95">
            <div className="flex items-center justify-between gap-3 mb-5">
                <p className="font-heading text-[15px]">Тестовая группа задач</p>
                <IconDots size={18} />
            </div>
            <div className="flex flex-col gap-2 mb-5">
                <Task />
            </div>
            <div className="flex gap-2 opacity-80 items-center">
                <Plus size={16} />
                <p>Добавить задачу</p>
            </div>
        </div>
    );
};
