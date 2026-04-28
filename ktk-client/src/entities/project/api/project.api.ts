import { $api } from "@/shared/api/api";
import { PROJECTS_ENDPOINT, USER_PROJECT_ENDPOINT } from "../lib/constants";
import {
    type Member,
    type IPaginationProjectResponse,
    type IProjectResponse,
    type ProjectsFilterDto,
    type UpdateProjectDto,
    type ProjectStatus,
    type CreateProjectDto,
} from "../model/types";

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
    getProjectById: async (projectId: string) => {
        return $api.get<IProjectResponse>(`${PROJECTS_ENDPOINT}/${projectId}`);
    },
    getProjectParticipants: async (projectId: string) => {
        return $api.get<Member[]>(`${PROJECTS_ENDPOINT}/${projectId}/participants`);
    },
    updateProject: async ({ projectId, title, projectLink }: UpdateProjectDto) => {
        return $api.patch<IProjectResponse>(`${PROJECTS_ENDPOINT}/${projectId}`, { title, projectLink });
    },
    updateProjectContent: async ({ projectId, content }: { projectId: string, content: string }) => {
        return $api.patch<IProjectResponse>(`${PROJECTS_ENDPOINT}/${projectId}/content`, { content });
    },
    updateProjectStatus: async ({ projectId, status }: { projectId: string, status: ProjectStatus}) => {
        return $api.patch<IProjectResponse>(`${PROJECTS_ENDPOINT}/${projectId}/status`, { status });
    },
    addParticipant: async ({ projectId, userId }: { projectId: string, userId: string}) => {
        return $api.post<Member[]>(`${PROJECTS_ENDPOINT}/${projectId}/participants`, { userId });
    },
    removeParticipant: async ({ projectId, userId } : { projectId: string, userId: string }) => {
        return $api.delete<Member[]>(`${PROJECTS_ENDPOINT}/${projectId}/participants/${userId}`);
    },
    deleteProject: async ({ projectId }: { projectId: string }) => {
        return $api.delete<IProjectResponse>(`${PROJECTS_ENDPOINT}/${projectId}`);
    },
    createProject: async (data: CreateProjectDto) => {
        return $api.post<IProjectResponse>(`${PROJECTS_ENDPOINT}`, data);
    }
};
