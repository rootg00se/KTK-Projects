import { useMutation } from "@tanstack/react-query";
import { projectsApi } from "@/entities/project";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";

export const useAddParticipant = () => {
    const addParticipantMutation = useMutation({
        mutationKey: [projectsApi.baseKey, "participants", "add"],
        mutationFn: projectsApi.addParticipant,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Участник добавлен");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    return {
        isAddParticipantPending: addParticipantMutation.isPending,
        addParticipantFunc: addParticipantMutation.mutate,
        isAddParticipantSuccess: addParticipantMutation.isSuccess,
    };
};
