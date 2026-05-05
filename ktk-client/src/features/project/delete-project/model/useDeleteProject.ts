import { useMutation } from "@tanstack/react-query";
import { projectsApi } from "@/entities/project";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";

export const useDeleteProject = () => {
    const deleteProjectMutation = useMutation({
        mutationKey: [projectsApi.baseKey, "delete"],
        mutationFn: projectsApi.deleteProject,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Проект удален");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    return {
        isDeleteProjectPending: deleteProjectMutation.isPending,
        deleteProjectFunc: deleteProjectMutation.mutate,
        isDeleteProjectSuccess: deleteProjectMutation.isSuccess,
    };
};
