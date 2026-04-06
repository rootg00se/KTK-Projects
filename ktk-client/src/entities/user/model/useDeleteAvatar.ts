import { useMutation } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";
import type { IErrorResponse } from "@/shared/types/error-response.type";

export const useDeleteAvatar = () => {
    const deleteUserAvatarMutation = useMutation({
        mutationKey: [userApi.baseKey, "avatar"],
        mutationFn: userApi.deleteAvatar,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Avatar deleted");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });

    return {
        isDeleteAvatarPending: deleteUserAvatarMutation.isPending,
        deleteAvatarFunc: deleteUserAvatarMutation.mutate,
        isDeleteAvatarSuccess: deleteUserAvatarMutation.isSuccess,
    };
};
