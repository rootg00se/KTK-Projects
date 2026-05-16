import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";
import type { IErrorResponse } from "@/shared/types/error-response.type";

export const useUpdateAvatar = () => {
    const updateUserAvatarMutation = useMutation({
        mutationKey: [userApi.baseKey, "avatar"],
        mutationFn: userApi.updateAvatar,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message || error.response.data.message[0]);
        },
        onSuccess: () => {
            toast.success("Аватарка обновлена");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });

    return {
        isUpdateAvatarPending: updateUserAvatarMutation.isPending,
        updateAvatarFunc: updateUserAvatarMutation.mutate,
        isUpdateAvatarSuccess: updateUserAvatarMutation.isSuccess,
    };
};
