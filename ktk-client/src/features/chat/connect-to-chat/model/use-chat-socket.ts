import { useEffect, useState } from "react";
import { createSocket } from "@/shared/api/socket";
import { useQueryClient } from "@tanstack/react-query";
import { messagesApi, type IMessageResponse } from "@/entities/message";
import type { AxiosResponse } from "axios";

export const useChatSocket = (userId: string, chatId?: string) => {
    const [socket, setSocket] = useState<ReturnType<typeof createSocket> | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        const s = createSocket(userId);
        setSocket(s);

        s.on("newMessage", (message: IMessageResponse) => {
            queryClient.setQueryData([messagesApi.baseKey, chatId], (oldData: unknown) => {
                const messagesData = oldData as AxiosResponse<IMessageResponse[]> | undefined;
                if (!messagesData) return oldData;

                return {
                    ...messagesData,
                    data: messagesData.data ? [...messagesData.data, message] : [message],
                };
            });
        });

        return () => {
            s.disconnect();
        };
    }, [userId]);

    useEffect(() => {
        if (socket && chatId) {
            socket.emit("joinChat", { chatId });
            return () => {
                socket.emit("leaveChat", { chatId });
            };
        }
    }, [socket, chatId]);

    const sendMessage = (content: string) => {
        if (socket && chatId) {
            socket.emit("sendMessage", { chatId, content });
        }
    };

    return { sendMessage };
};
