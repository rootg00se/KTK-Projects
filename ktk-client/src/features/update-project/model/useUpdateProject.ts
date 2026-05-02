import { projectsApi } from "@/entities/project";
import { queryClient } from "@/app/providers/query-client";
import type { IProjectResponse } from "@/entities/project";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import { useOptimisticMutation } from "@/shared/hooks/useOptimisticMutation";

export const useUpdateProject = () => {
    const updateProjectMutation = useOptimisticMutation({
        mutationKey: [projectsApi.baseKey, "update"],
        mutationFn: projectsApi.updateProject,
        cancelQueryKeys: [[projectsApi.baseKey]],
        optimisticTargets: [
            {
                queryKey: (dto) => [projectsApi.baseKey, dto.projectId],
                updater: (oldData: unknown, dto) => {
                    const projectData = oldData as IProjectResponse | undefined;
                    if (!projectData) return oldData;

                    return {
                        ...projectData,
                        title: dto.title,
                        project_link: dto.projectLink,
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
        isUpdatePending: updateProjectMutation.isPending,
        updateFunc: updateProjectMutation.mutate,
        isUpdateSuccess: updateProjectMutation.isSuccess,
    };
};
