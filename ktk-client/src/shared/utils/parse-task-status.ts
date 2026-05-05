import type { TaskStatus } from "@/entities/task";

const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
    postponed: "Отложен",
    completed: "Выполнен",
    in_progress: "В процессе",
};

export const parseTaskStatus = (status: TaskStatus): string => {
    return TASK_STATUS_LABELS[status] || status;
};

export const parseTextToTaskStatus = (text: string): TaskStatus | undefined => {
    return (Object.keys(TASK_STATUS_LABELS) as TaskStatus[]).find(
        (key) => TASK_STATUS_LABELS[key] === text
    );
};

export const taskStatusList = ["Отложен", "Выполнен", "В процессе"];
