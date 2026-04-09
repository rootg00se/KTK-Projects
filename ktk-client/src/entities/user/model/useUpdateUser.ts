import { useMutation } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";
import type { IUserResponse } from "./types";
import type { IErrorResponse } from "@/shared/types/error-response.type";

export const useUpdateUser = () => {
    const updateUserMutation = useMutation({
        mutationKey: [userApi.baseKey, "update"],
        mutationFn: userApi.updateUser,
        onMutate: async (dto) => {
            await queryClient.cancelQueries({ queryKey: [userApi.baseKey] });

            const previousUser = queryClient.getQueryData([userApi.baseKey, "info"]);

            queryClient.setQueryData([userApi.baseKey, "info"], (oldData: IUserResponse) => ({
                ...oldData,
                nickname: dto.nickname,
                display_name: dto.displayName
            }));

            return { previousUser };
        },
        onError: (error: IErrorResponse, _, context) => {
            queryClient.setQueryData([userApi.baseKey, "info"], context?.previousUser);
            console.log(error);
            
            toast.error(error.response.data.message[0]);
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
