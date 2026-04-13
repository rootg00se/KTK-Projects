import { $api } from "@/shared/api/api";
import { PROJECT_QUESTIONS_ENDPOINT, QUESTIONS_ENDPOINT, USER_QUESTIONS_ENDPOINT } from "../lib/constants";
import type { IQuestionResponse } from "../model/types";

export const questionsApi = {
    baseKey: "questions",
    getUserQuestions: async (userId: string) => {
        return $api.get<IQuestionResponse[]>(`${USER_QUESTIONS_ENDPOINT}/${userId}/questions`);
    },
    getProjectQuestions: async (projectId: string) => {
        return $api.get<IQuestionResponse[]>(`${PROJECT_QUESTIONS_ENDPOINT}/${projectId}/questions`);
    },
    createQuestion: async ({ projectId, text, parentId }: { projectId: string; text: string, parentId?: string }) => {
        return $api.post<IQuestionResponse>(`${PROJECT_QUESTIONS_ENDPOINT}/${projectId}/questions`, { text, questionId: parentId });
    },
    updateQuestion: async ({ questionId, text }: { questionId: string; text: string }) => {
        return $api.put<IQuestionResponse>(`${QUESTIONS_ENDPOINT}/${questionId}`, { text });
    },
    deleteQuestion: async ({ questionId }: { questionId: string }) => {
        return $api.delete<IQuestionResponse>(`${QUESTIONS_ENDPOINT}/${questionId}`);
    },
    getQuestionReplies: async (questionId: string) => {
        return $api.get<IQuestionResponse[]>(`${QUESTIONS_ENDPOINT}/${questionId}/replies`);
    },
};
