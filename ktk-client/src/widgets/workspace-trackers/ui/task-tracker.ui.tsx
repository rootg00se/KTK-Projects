import { Task } from "@/entities/task";
import { DeleteTracker } from "@/features/delete-tracker/ui/delete-tracker.ui";
import { UpdateTracker } from "@/features/update-tracker";
import { Plus } from "lucide-react";
import React from "react";

interface ITaskTrackerProps {
    name: string;
    projectId: string;
    trackerId: string;
}

export const TaskTracker: React.FC<ITaskTrackerProps> = ({ name, projectId, trackerId }) => {
    return (
        <div className="min-w-85 border bg-[#fafafa] rounded-lg p-3.5 max-w-85">
            <div className="flex items-center justify-between gap-3 mb-3">
                <UpdateTracker projectId={projectId} trackerId={trackerId} name={name} />
                <DeleteTracker projectId={projectId} trackerId={trackerId} />
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
