import { queryClient } from "@/app/providers/query-client";
import { tasksApi } from "@/entities/task";
import type { ITaskResponse } from "@/entities/task/model/types";
import { useOptimisticMutation } from "@/shared/hooks/useOptimisticMutation";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const useUpdateTask = (trackerId: string) => {
    const updateTaskMutation = useOptimisticMutation({
        mutationKey: [tasksApi.baseKey, "update"],
        mutationFn: tasksApi.updateTaskText,
        cancelQueryKeys: [[tasksApi.baseKey]],
        optimisticTargets: [
            {
                queryKey: [tasksApi.baseKey, trackerId],
                updater: (oldData: unknown, dto) => {
                    const tasksData = oldData as AxiosResponse<ITaskResponse[]> | undefined;
                    if (!tasksData) return oldData;

                    return {
                        ...tasksData,
                        data: tasksData.data.map((task) =>
                            task.task_id === dto.taskId ? { ...task, text: dto.text } : task,
                        ),
                    };
                },
            },
        ],
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [tasksApi.baseKey, trackerId] });
        },
    });

    return {
        isUpdatePending: updateTaskMutation.isPending,
        updateFunc: updateTaskMutation.mutate,
        isUpdateSuccess: updateTaskMutation.isSuccess,
    };
};
