import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/shared/components";
import { IconDots } from "@tabler/icons-react";
import { Trash } from "lucide-react";
import React from "react";
import { useDeleteTask } from "../model/useDeleteTask";
import { useTrackers } from "@/entities/task-tracker";
import { useParams } from "react-router-dom";
import { useChangeTracker } from "../model/useChangeTracker";

interface ITaskActionsProps {
    trackerId: string;
    taskId: string;
}

export const TaskActions: React.FC<ITaskActionsProps> = ({ trackerId, taskId }) => {
    const { id: projectId } = useParams();

    const { trackersData } = useTrackers(projectId);
    const { deleteFunc } = useDeleteTask(trackerId);
    const { changeTrackerFunc } = useChangeTracker();

    const handleDeleteTask = () => {
        deleteFunc({
            taskId,
        });
    };

    const handleChangeTracker = (trackerId: string) => {
        changeTrackerFunc({
            taskId,
            taskTrackerId: trackerId,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-0! cursor-pointer">
                <IconDots size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full mt-4 min-w-40">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <p className="text-sm font-medium">Переместить в</p>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="min-w-40">
                        {trackersData
                            ?.filter((tracker) => tracker.task_tracker_id !== trackerId)
                            .map((tracker) => (
                                <DropdownMenuItem onClick={() => handleChangeTracker(tracker.task_tracker_id)}>
                                    <p className="text-sm font-medium">{tracker.name}</p>
                                </DropdownMenuItem>
                            ))}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleDeleteTask}>
                    <div className="flex items-center text-primary gap-2">
                        <Trash />
                        <p className="text-sm font-medium">Удалить</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
