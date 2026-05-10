import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components";
import { parseTaskStatus, parseTextToTaskStatus, taskStatusList } from "@/shared/utils/parse-task-status";
import type { TaskStatus } from "@/entities/task";
import { useUpdateStatus } from "../model/useUpdateStatus";

interface IChangeTaskStatusProps {
    status: TaskStatus;
    taskId: string;
    trackerId: string;
}

export const ChangeTaskStatus: React.FC<IChangeTaskStatusProps> = ({ status, taskId, trackerId }) => {
    const { updateStatusFunc } = useUpdateStatus(trackerId);

    const handleUpdateStatus = (status: TaskStatus) => {
        updateStatusFunc({
            taskId,
            status,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-0! cursor-pointer">
                <span className="text-[10px] font-heading font-medium tracking-wider text-white bg-[#a0350c] px-2 py-0.5 rounded">
                    {parseTaskStatus(status)}
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full mt-4">
                {taskStatusList.map((status) => (
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleUpdateStatus(parseTextToTaskStatus(status) || "in_progress")}
                    >
                        <div className="flex gap-2 items-center rounded-sm">
                            <p className="text-sm font-medium">{status}</p>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
