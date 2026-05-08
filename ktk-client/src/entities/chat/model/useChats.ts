import { useQuery } from "@tanstack/react-query";
import { chatsApi } from "../api/chat.api";

export const useChats = () => {
    const { data, isPending } = useQuery({
        queryKey: [chatsApi.baseKey, "list"],
        queryFn: () => chatsApi.getChats(),
        select: data => data.data,
    });

    return {
        chatsData: data,
        isChatsPending: isPending
    }
}