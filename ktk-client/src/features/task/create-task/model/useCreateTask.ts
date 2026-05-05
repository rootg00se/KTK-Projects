import { queryClient } from "@/app/providers/query-client";
import { tasksApi } from "@/entities/task";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateTask = () => {
    const createTaskMutation = useMutation({
        mutationKey: [tasksApi.baseKey, "create"],
        mutationFn: tasksApi.createTask,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [tasksApi.baseKey] });
        },
    });

    return {
        isCreateTaskPenfing: createTaskMutation.isPending,
        createTaskFunc: createTaskMutation.mutate,
        isCreateTaskSuccess: createTaskMutation.isSuccess,
    };
};