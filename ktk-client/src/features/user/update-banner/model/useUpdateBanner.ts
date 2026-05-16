import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";
import type { IErrorResponse } from "@/shared/types/error-response.type";

export const useUpdateBanner = () => {
    const updateUserBannerMutation = useMutation({
        mutationKey: [userApi.baseKey, "banner"],
        mutationFn: userApi.updateBanner,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message || error.response.data.message[0]);
        },
        onSuccess: () => {
            toast.success("Банер обновлен");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });

    return {
        isUpdateBannerPending: updateUserBannerMutation.isPending,
        updateBannerFunc: updateUserBannerMutation.mutate,
        isUpdateBannerSuccess: updateUserBannerMutation.isSuccess,
    };
};
