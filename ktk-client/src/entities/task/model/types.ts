export type TaskStatus = "in_progress" | "completed" | "postponed";

export interface ITaskResponse {
    task_id: string;
    status: TaskStatus;
    task_tracker_id: string;
    text: string;
    created_at: Date;
    updated_at: Date;
}
