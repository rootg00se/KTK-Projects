import { useMutation } from "@tanstack/react-query";
import { projectsApi } from "../api/project.api";
import { queryClient } from "@/app/providers/query-client";
import type { IProjectResponse } from "./types";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";

export const useUpdateContent = () => {
    const updateContentMutation = useMutation({
        mutationKey: [projectsApi.baseKey, "content"],
        mutationFn: projectsApi.updateProjectContent,
        onMutate: async (dto) => {
            await queryClient.cancelQueries({ queryKey: [projectsApi.baseKey] });

            const previousProject = queryClient.getQueryData([projectsApi.baseKey, dto.projectId]);

            queryClient.setQueryData([projectsApi.baseKey, dto.projectId], (oldData: IProjectResponse) => ({
                ...oldData,
                content: dto.content,
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
        isUpdateContentPending: updateContentMutation.isPending,
        updateContentFunc: updateContentMutation.mutate,
        isUpdateContentSuccess: updateContentMutation.isSuccess,
    };
};
