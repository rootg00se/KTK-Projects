import { $api } from "@/shared/api/api";
import { PROJECTS_ENDPOINT, USER_PROJECT_ENDPOINT } from "../lib/constants";
import type { IPaginationProjectResponse, IProjectResponse, ProjectsFilterDto } from "../model/types";

export const projectsApi = {
    baseKey: "projects",
    getAllProjects: async ({ page, tags, query }: ProjectsFilterDto) => {
        return $api.get<IPaginationProjectResponse>(
            `${PROJECTS_ENDPOINT}?limit=8&page=${page}&tags=${tags}&query=${query}`,
        );
    },
    likeProject: async ({ projectId }: { projectId: string }) => {
        return $api.post<IProjectResponse>(`${PROJECTS_ENDPOINT}/${projectId}/like`);
    },
    dislikeProject: async ({ projectId }: { projectId: string }) => {
        return $api.delete<IProjectResponse>(`${PROJECTS_ENDPOINT}/${projectId}/dislike`);
    },
    getUserProjects: async (userId: string) => {
        return $api.get<IProjectResponse[]>(`${USER_PROJECT_ENDPOINT}/${userId}/projects`);
    },
};
