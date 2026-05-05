import { $api } from "@/shared/api/api";
import { type ITaskResponse, type TaskStatus } from "../model/types";
import { TASK_TRACKERS_TASK, TASKS_ENDPOINT } from "../lib/constants";

export const tasksApi = {
    baseKey: "tasks",
    createTask: async ({ trackerId, text }: { trackerId: string; text: string }) => {
        return $api.post<ITaskResponse>(`${TASK_TRACKERS_TASK}/${trackerId}/tasks`, { text });
    },
    getAllTasks: async (trackerId: string) => {
        return $api.get<ITaskResponse[]>(`${TASK_TRACKERS_TASK}/${trackerId}/tasks`);
    },
    updateTaskStatus: async ({ taskId, status }: { taskId: string; status: TaskStatus }) => {
        return $api.patch<ITaskResponse>(`${TASKS_ENDPOINT}/${taskId}/status`, { status });
    },
    deleteTask: async ({ taskId }: { taskId: string }) => {
        return $api.delete<ITaskResponse>(`${TASKS_ENDPOINT}/${taskId}`);
    },
    updateTaskText: async ({ taskId, text }: { taskId: string; text: string }) => {
        return $api.patch<ITaskResponse>(`${TASKS_ENDPOINT}/${taskId}/text`, { text });
    },
    changeTaskTracker: async ({ taskTrackerId, taskId }: { taskTrackerId: string; taskId: string }) => {
        return $api.patch<ITaskResponse>(`${TASKS_ENDPOINT}/${taskId}/change-tracker`, { taskTrackerId });
    },
};
