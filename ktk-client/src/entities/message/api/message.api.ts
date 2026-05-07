import { $api } from "@/shared/api/api";
import { type IMessageResponse } from "../model/types";
import { CHAT_MESSAGES_ENDPOINT } from "../lib/constants";

export const messagesApi = {
    baseKey: "messages",
    getMessages: async (chatId: string) => {
        return $api.get<IMessageResponse[]>(`${CHAT_MESSAGES_ENDPOINT}/${chatId}/messages`);
    },
};
