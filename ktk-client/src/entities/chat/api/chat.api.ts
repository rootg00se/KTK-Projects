import { $api } from "@/shared/api/api";
import { type IChatResponse } from "../model/types";
import { CHATS_ENDPOINT } from "../lib/constants";

export const chatsApi = {
    baseKey: "chats",
    getChats: async () => {
        return $api.get<IChatResponse[]>(CHATS_ENDPOINT);
    },
    createPrivateChat: async ({ userId }: { userId: string }) => {
        return $api.post<IChatResponse>(`${CHATS_ENDPOINT}/private`, { userId });
    },
};
