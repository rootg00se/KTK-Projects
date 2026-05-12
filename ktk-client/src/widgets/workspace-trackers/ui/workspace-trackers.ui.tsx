import React from "react";
import { TaskTracker } from "./task-tracker.ui";
import { CreateTaskTracker } from "@/features/task-tracker/create-task-tracker";
import { useParams } from "react-router-dom";
import { useTrackers } from "@/entities/task-tracker";

export const WorkspaceTrackers: React.FC = () => {
    const { id: projectId } = useParams();
    const { trackersData } = useTrackers(projectId);

    return (
        <div className="flex-1 px-20 py-5 flex gap-5 overflow-x-auto items-start max-md:px-5">
            {trackersData?.map((tracker) => (
                <TaskTracker 
                    key={tracker.task_tracker_id}
                    projectId={tracker.project_id} 
                    trackerId={tracker.task_tracker_id} 
                    name={tracker.name} 
                />
            ))}
            <CreateTaskTracker />
        </div>
    );
};
