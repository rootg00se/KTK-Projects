import type { ProjectStatus } from "@/entities/project";

export const parseProjectStatus = (status: ProjectStatus) => {
    switch (status) {
        case "working":
            return "В работе";
        case "abandoned":
            return "Заброшен";
        case "completed":
            return "Выполнен";
        case "paused":
            return "Приостановлен";
    }
};

export const parseTextToProjectState = (text: string) => {
    switch (text) {
        case "В работе":
            return "working";
        case "Заброшен":
            return "abandoned";
        case "Выполнен":
            return "completed";
        case "Приостановлен":
            return "paused";
    }
};

export const projectStatusList = ["В работе", "Заброшен", "Выполнен", "Приостановлен"];
