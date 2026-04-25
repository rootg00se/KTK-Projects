import type { ProjectStatus } from "@/entities/project";

const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
    working: "В работе",
    abandoned: "Заброшен",
    completed: "Выполнен",
    paused: "Приостановлен",
};

export const parseProjectStatus = (status: ProjectStatus): string => {
    return PROJECT_STATUS_LABELS[status] || status;
};

export const parseTextToProjectState = (text: string): ProjectStatus | undefined => {
    return (Object.keys(PROJECT_STATUS_LABELS) as ProjectStatus[]).find(
        (key) => PROJECT_STATUS_LABELS[key] === text
    );
};

export const projectStatusList = ["В работе", "Заброшен", "Выполнен", "Приостановлен"];
