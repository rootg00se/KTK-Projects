import { queryClient } from "@/app/providers/query-client";
import type { AxiosResponse } from "axios";
import type { Socket } from "socket.io-client";
import type { ChatMessages } from "./types";

export const registerChatHandlers = (socket: Socket) => {
    socket.on("newMessage", (message: ChatMessages) => {
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

    socket.on("messageEdited", (message: ChatMessages) => {
        const chatId = message.chat_id;

        queryClient.setQueryData(["messages", chatId], (oldData: unknown) => {
            const messagesData = oldData as AxiosResponse<ChatMessages[]> | undefined;
            if (!messagesData?.data) return oldData;

            return {
                ...messagesData,
                data: messagesData.data.map((m) =>
                    m.message_id === message.message_id ? { ...m, ...message } : m,
                ),
            };
        });
    });

    socket.on("messageDeleted", (message: ChatMessages) => {
        const chatId = message.chat_id;

        queryClient.setQueryData(["messages", chatId], (oldData: unknown) => {
            const messagesData = oldData as AxiosResponse<ChatMessages[]> | undefined;
            if (!messagesData) return oldData;

            return {
                ...messagesData,
                data: messagesData.data.filter((messageOld) => messageOld.message_id !== message.message_id),
            };
        });
    });
};
