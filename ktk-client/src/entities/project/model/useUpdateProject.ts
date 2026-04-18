import { useMutation } from "@tanstack/react-query";
import { projectsApi } from "../api/project.api";
import { queryClient } from "@/app/providers/query-client";
import type { IProjectResponse } from "./types";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";

export const useUpdateProject = () => {
    const updateProjectMutation = useMutation({
        mutationKey: [projectsApi.baseKey, "update"],
        mutationFn: projectsApi.updateProject,
        onMutate: async (dto) => {
            await queryClient.cancelQueries({ queryKey: [projectsApi.baseKey] });

            const previousProject = queryClient.getQueryData([projectsApi.baseKey, dto.projectId]);

            queryClient.setQueryData([projectsApi.baseKey, dto.projectId], (oldData: IProjectResponse) => ({
                ...oldData,
                title: dto.title,
                project_link: dto.projectLink
            }));

            return { previousProject };
        },
        onError: (error: IErrorResponse, dto, context) => {
            queryClient.setQueryData([projectsApi.baseKey, dto.projectId], context?.previousProject);
            console.log(error);
            
            toast.error(error.response.data.message[0]);
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
