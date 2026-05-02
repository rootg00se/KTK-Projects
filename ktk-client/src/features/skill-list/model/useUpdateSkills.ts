import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";
import type { IErrorResponse } from "@/shared/types/error-response.type";

export const useUpdateSkills = () => {
    const updateUserSkillsMutation = useMutation({
        mutationKey: [userApi.baseKey, "skills"],
        mutationFn: userApi.updateSkills,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Скилы обновлены");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey] });
        },
    });

    return {
        isUpdateSkillsPending: updateUserSkillsMutation.isPending,
        updateSkillsFunc: updateUserSkillsMutation.mutate,
        isUpdateSkillsSuccess: updateUserSkillsMutation.isSuccess,
    };
};
