import { $api } from "@/shared/api/api";
import { type IChatResponse } from "../model/types";
import { CHATS_ENDPOINT, PROJECT_CHATS_ENDPOINT } from "../lib/constants";

export const chatsApi = {
    baseKey: "chats",
    getChats: async () => {
        return $api.get<IChatResponse[]>(CHATS_ENDPOINT);
    },
    getProjectChat: async (projectId: string) => {
        return $api.get<IChatResponse>(`${PROJECT_CHATS_ENDPOINT}/${projectId}/chats`);
    },
    createPrivateChat: async ({ userId }: { userId: string }) => {
        return $api.post<IChatResponse>(`${CHATS_ENDPOINT}/private`, { userId });
    },
};
