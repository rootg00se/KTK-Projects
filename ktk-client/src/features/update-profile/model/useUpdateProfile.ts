import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";
import type { IErrorResponse } from "@/shared/types/error-response.type";

export const useUpdateProfile = () => {
    const updateProfileMutation = useMutation({
        mutationKey: [userApi.baseKey, "profile"],
        mutationFn: userApi.updateUserProfile,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Профиль обновлен");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey] });
        },
    });

    return {
        isUpdateProfilePending: updateProfileMutation.isPending,
        updateProfileFunc: updateProfileMutation.mutate,
        isUpdateProfileSuccess: updateProfileMutation.isSuccess,
    };
};
