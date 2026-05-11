import { useQuery } from "@tanstack/react-query";
import { chatsApi } from "../api/chat.api";

export const useProjectChat = (projectId: string | undefined) => {
    const { data, isPending } = useQuery({
        queryKey: [chatsApi.baseKey, projectId],
        queryFn: () => chatsApi.getProjectChat(projectId!),
        select: (data) => data.data,
        enabled: !!projectId,
    });

    return {
        projectChatData: data,
        isProjectChatPending: isPending,
    };
};
