import { Task, useTasks } from "@/entities/task";
import { ChangeTaskStatus } from "@/features/change-task-status";
import { CreateTask } from "@/features/create-task";
import { DeleteTracker } from "@/features/delete-tracker/ui/delete-tracker.ui";
import { UpdateTask } from "@/features/update-task";
import { UpdateTracker } from "@/features/update-tracker";
import React from "react";

interface ITaskTrackerProps {
    name: string;
    projectId: string;
    trackerId: string;
}

export const TaskTracker: React.FC<ITaskTrackerProps> = ({ name, projectId, trackerId }) => {
    const { tasksData } = useTasks(trackerId);

    return (
        <div className="min-w-85 border bg-[#fafafa] rounded-lg p-3.5 max-w-85">
            <div className="flex items-center justify-between gap-3 mb-3">
                <UpdateTracker projectId={projectId} trackerId={trackerId} name={name} />
                <DeleteTracker projectId={projectId} trackerId={trackerId} />
            </div>
            <div className="flex flex-col gap-2 mb-3">
                {tasksData?.map((task) => (
                    <Task
                        key={task.task_id}
                        statusSlot={
                            <ChangeTaskStatus 
                                status={task.status} 
                                taskId={task.task_id} 
                                trackerId={trackerId} 
                            />
                        }
                        contentSlot={
                            <UpdateTask 
                                taskId={task.task_id} 
                                trackerId={trackerId} 
                                initialText={task.text} 
                            />
                        }
                        menuSlot={<div></div>}
                    />
                ))}
            </div>
            <CreateTask trackerId={trackerId} />
        </div>
    );
};
