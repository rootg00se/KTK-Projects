import { userApi } from "@/entities/user";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";
import type { IUserResponse } from "@/entities/user";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { useOptimisticMutation } from "@/shared/hooks/useOptimisticMutation";

export const useUpdateUser = () => {
    const updateUserMutation = useOptimisticMutation({
        mutationKey: [userApi.baseKey, "update"],
        mutationFn: userApi.updateUser,
        cancelQueryKeys: [[userApi.baseKey]],
        optimisticTargets: [
            {
                queryKey: [userApi.baseKey, "info"],
                updater: (oldData: unknown, dto) => {
                    const userData = oldData as IUserResponse | undefined;
                    if (!userData) return oldData;

                    return {
                        ...userData,
                        nickname: dto.nickname,
                        display_name: dto.displayName,
                    };
                },
            },
        ],
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Проифль обновлен");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });

    return {
        isUpdatePending: updateUserMutation.isPending,
        updateFunc: updateUserMutation.mutate,
        isUpdateSuccess: updateUserMutation.isSuccess,
    };
};
