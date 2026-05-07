import { useQuery } from "@tanstack/react-query";
import { messagesApi } from "../api/message.api";

export const useMessages = (chatId: string | undefined) => {
    const { data, isPending } = useQuery({
        queryKey: [messagesApi.baseKey, chatId],
        queryFn: () => messagesApi.getMessages(chatId!),
        select: data => data.data,
        enabled: !!chatId
    });

    return {
        messagesData: data,
        isMessagesPending: isPending
    }
}