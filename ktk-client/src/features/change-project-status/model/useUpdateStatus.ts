import { projectsApi } from "@/entities/project";
import { queryClient } from "@/app/providers/query-client";
import type { IProjectResponse } from "@/entities/project";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import { useOptimisticMutation } from "@/shared/hooks/useOptimisticMutation";

export const useUpdateStatus = () => {
    const updateStatusMutation = useOptimisticMutation({
        mutationKey: [projectsApi.baseKey, "status"],
        mutationFn: projectsApi.updateProjectStatus,
        cancelQueryKeys: [[projectsApi.baseKey]],
        optimisticTargets: [
            {
                queryKey: (dto) => [projectsApi.baseKey, dto.projectId],
                updater: (oldData: unknown, dto) => {
                    const projectData = oldData as IProjectResponse | undefined;
                    if (!projectData) return oldData;

                    return {
                        ...projectData,
                        status: dto.status,
                    };
                },
            },
        ],
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Проект обновлен");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    return {
        isUpdateStatusPending: updateStatusMutation.isPending,
        updateStatusFunc: updateStatusMutation.mutate,
        isUpdateStatusSuccess: updateStatusMutation.isSuccess,
    };
};
