import { userApi } from "@/entities/user";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";
import { useMutation } from "@tanstack/react-query";

export const useRemoveFriend = (userId: string | undefined) => {
    const removeFriendMutation = useMutation({
        mutationKey: [userApi.baseKey, "friends", "remove"],
        mutationFn: userApi.removeFriend,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Пользователь удален из друзей");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey, userId, "friends"] });
        },
    });

    return {
        isRemoveFriendPending: removeFriendMutation.isPending,
        removeFriendFunc: removeFriendMutation.mutate,
        isRemoveFriendSuccess: removeFriendMutation.isSuccess,
    };
};