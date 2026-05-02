import { userApi } from "@/entities/user";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";
import { useMutation } from "@tanstack/react-query";

export const useAddFriend = (userId: string | undefined) => {
    const addFriendMutation = useMutation({
        mutationKey: [userApi.baseKey, "friends", "add"],
        mutationFn: userApi.addFriend,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Пользователь добавлени в друзья");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey, userId, "friends"] });
        },
    });

    return {
        isAddFriendPending: addFriendMutation.isPending,
        addFriendFunc: addFriendMutation.mutate,
        isAddFriendSuccess: addFriendMutation.isSuccess,
    };
};