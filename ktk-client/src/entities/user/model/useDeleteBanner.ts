import { useMutation } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";
import type { IErrorResponse } from "@/shared/types/error-response.type";

export const useDeleteBanner = () => {
    const deleteUserBannerMutation = useMutation({
        mutationKey: [userApi.baseKey, "banner"],
        mutationFn: userApi.deleteBanner,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Banner deleted");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });

    return {
        isDeleteBannerPending: deleteUserBannerMutation.isPending,
        deleteBannerFunc: deleteUserBannerMutation.mutate,
        isDeleteBannerSuccess: deleteUserBannerMutation.isSuccess,
    };
};
