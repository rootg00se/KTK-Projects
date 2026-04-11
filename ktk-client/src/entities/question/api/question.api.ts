import { $api } from "@/shared/api/api";
import { PROJECT_QUESTIONS_ENDPOINT, USER_QUESTIONS_ENDPOINT } from "../lib/constants";
import type { IQuestionResponse } from "../model/types";

export const questionsApi = {
    baseKey: "questions",
    getUserQuestions: async (userId: string) => {
        return $api.get<IQuestionResponse[]>(`${USER_QUESTIONS_ENDPOINT}/${userId}/questions`);
    },
    getProjectQuestions: async (projectId: string) => {
        return $api.get<IQuestionResponse[]>(`${PROJECT_QUESTIONS_ENDPOINT}/${projectId}/questions`);
    },
    createQuestion: async ({ projectId, text }: { projectId: string; text: string }) => {
        return $api.post<IQuestionResponse>(`${PROJECT_QUESTIONS_ENDPOINT}/${projectId}/questions`, { text });
    },
};
