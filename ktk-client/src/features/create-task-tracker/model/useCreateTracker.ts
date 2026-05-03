import { queryClient } from "@/app/providers/query-client";
import { taskTrackersApi } from "@/entities/task-tracker";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateTracker = () => {
    const createTrackerMutation = useMutation({
        mutationKey: [taskTrackersApi.baseKey, "create"],
        mutationFn: taskTrackersApi.createTaskTracker,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Трекер задач создан");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskTrackersApi.baseKey] });
        },
    });

    return {
        isCreateTrackerPenfing: createTrackerMutation.isPending,
        createTrackerFunc: createTrackerMutation.mutate,
        isCreateTrackerSuccess: createTrackerMutation.isSuccess,
    };
};