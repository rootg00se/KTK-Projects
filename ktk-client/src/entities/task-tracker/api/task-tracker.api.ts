import { $api } from "@/shared/api/api";
import type { ITaskTrackerResponse } from "../model/types";
import { PROJECT_TASK_TRACKERS_ENDPOINT, TASK_TRACKER_ENDPOTINT } from "../lib/constants";

export const taskTrackersApi = {
    baseKey: "trackers",
    createTaskTracker: async ({ projectId, name }: { projectId: string; name: string }) => {
        return $api.post<ITaskTrackerResponse>(`${PROJECT_TASK_TRACKERS_ENDPOINT}/${projectId}/task-trackers`, {
            name,
        });
    },
    getTaskTrackers: async (projectId: string) => {
        return $api.get<ITaskTrackerResponse[]>(`${PROJECT_TASK_TRACKERS_ENDPOINT}/${projectId}/task-trackers`);
    },
    updateTrackerName: async ({ trackerId, name }: { trackerId: string; name: string }) => {
        return $api.put<ITaskTrackerResponse>(`${TASK_TRACKER_ENDPOTINT}/${trackerId}`, { name });
    },
    deleteTracker: async ({ trackerId }: { trackerId: string }) => {
        return $api.delete<ITaskTrackerResponse>(`${TASK_TRACKER_ENDPOTINT}/${trackerId}`);
    },
};
