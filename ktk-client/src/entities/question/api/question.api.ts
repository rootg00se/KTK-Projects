import { $api } from "@/shared/api/api";
import { USER_QUESTIONS_ENDPOINT } from "../lib/constants";
import type { IQuestionResponse } from "../model/types";

export const questionsApi = {
    baseKey: "questions",
    getUserQuestions: async (userId: string) => {
        return $api.get<IQuestionResponse[]>(`${USER_QUESTIONS_ENDPOINT}/${userId}/questions`);
    }
};
