import { Task, useTasks } from "@/entities/task";
import { ChangeTaskStatus } from "@/features/task/change-task-status";
import { CreateTask } from "@/features/task/create-task";
import { DeleteTracker } from "@/features/task-tracker/delete-tracker/ui/delete-tracker.ui";
import { UpdateTask } from "@/features/task/update-task";
import { UpdateTracker } from "@/features/task-tracker/update-tracker";
import React from "react";
import { TaskActions } from "@/features/task/task-actions";

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
                            <ChangeTaskStatus status={task.status} taskId={task.task_id} trackerId={trackerId} />
                        }
                        contentSlot={<UpdateTask taskId={task.task_id} trackerId={trackerId} initialText={task.text} />}
                        menuSlot={<TaskActions trackerId={trackerId} taskId={task.task_id} />}
                    />
                ))}
            </div>
            <CreateTask trackerId={trackerId} />
        </div>
    );
};
