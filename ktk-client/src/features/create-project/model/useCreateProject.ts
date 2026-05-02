import { useMutation } from "@tanstack/react-query";
import { projectsApi } from "@/entities/project";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/app/providers/query-client";

export const useCreateProject = () => {
    const navigate = useNavigate();

    const createProjectMutation = useMutation({
        mutationKey: [projectsApi.baseKey, "create"],
        mutationFn: projectsApi.createProject,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Проект создан");
            navigate("/");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [projectsApi.baseKey] });
        },
    });

    return {
        isCreateProjectPenfing: createProjectMutation.isPending,
        createProjectFunc: createProjectMutation.mutate,
        isCreateProjectSuccess: createProjectMutation.isSuccess,
    };
};
