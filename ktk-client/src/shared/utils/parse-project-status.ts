import type { ProjectStatus } from "@/entities/project";

export const parseProjectStatus = (status: ProjectStatus) => {
    switch(status) {
        case "working": return "В работе";
        case "abandoned": return "Заброшен";
        case "completed": return "Выполнен";
        case "paused": return "Приостановлен";
    }
}