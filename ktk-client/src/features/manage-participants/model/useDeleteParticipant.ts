import { useMutation } from "@tanstack/react-query";
import { projectsApi } from "@/entities/project";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";

export const useDeleteParticipant = () => {
    const deleteParticipantMutation = useMutation({
        mutationKey: [projectsApi.baseKey, "participants", "delete"],
        mutationFn: projectsApi.removeParticipant,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Участник удален");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    return {
        isDeleteParticipantPending: deleteParticipantMutation.isPending,
        deleteParticipantFunc: deleteParticipantMutation.mutate,
        isDeleteParticipantSuccess: deleteParticipantMutation.isSuccess,
    };
};
