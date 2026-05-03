import { Plus } from "lucide-react";
import React from "react";
import { TaskTracker } from "./task-tracker.ui";

export const WorkspaceTrackers: React.FC = () => {
    return (
        <div className="flex-1 px-20 py-5 flex gap-5 overflow-x-auto items-start">
            <TaskTracker />
            <button className="flex items-center justify-center w-80 shrink-0 border-2 border-dashed rounded-md min-h-37.5 hover:border-primary transition-all hover:text-primary text-[#0000007e] gap-2 font-medium shadow-sm">
                <Plus size={20} />
                <span>Новая колонка</span>
            </button>
        </div>
    );
};
