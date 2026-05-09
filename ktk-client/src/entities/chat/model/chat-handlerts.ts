import { queryClient } from "@/app/providers/query-client";
import type { AxiosResponse } from "axios";
import type { Socket } from "socket.io-client";
import type { ChatMessages } from "./types";

export const registerChatHandlers = (socket: Socket) => {
    socket.on("newMessage", (message) => {
        const chatId = message.chat_id;

        queryClient.setQueryData(["messages", chatId], (oldData: unknown) => {
            const messagesData = oldData as AxiosResponse<ChatMessages[]> | undefined;
            if (!messagesData) return oldData;

            return {
                ...messagesData,
                data: messagesData.data ? [...messagesData.data, message] : [message],
            };
        });
    });
};
