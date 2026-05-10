import { queryClient } from "@/app/providers/query-client";
import { chatsApi } from "@/entities/chat";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateChat = () => {
    const navigate = useNavigate();

    const createChatMutation = useMutation({
        mutationKey: [chatsApi.baseKey, "create"],
        mutationFn: chatsApi.createPrivateChat,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: (data) => {
            navigate(`/chats/${data.data.chat_id}`);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [chatsApi.baseKey] });
        },
    });

    return {
        isCreateChatPenfing: createChatMutation.isPending,
        createChatFunc: createChatMutation.mutate,
        isCreateChatSuccess: createChatMutation.isSuccess,
    };
};
