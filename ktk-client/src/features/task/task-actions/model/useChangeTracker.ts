import { queryClient } from "@/app/providers/query-client";
import { tasksApi } from "@/entities/task";
import { taskTrackersApi } from "@/entities/task-tracker";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useChangeTracker = () => {
    const changeTrackerMutation = useMutation({
        mutationKey: [tasksApi.baseKey, "tracker"],
        mutationFn: tasksApi.changeTaskTracker,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [tasksApi.baseKey] });
            queryClient.invalidateQueries({ queryKey: [taskTrackersApi.baseKey] });
        },
    });

    return {
        isChangeTrackerPending: changeTrackerMutation.isPending,
        changeTrackerFunc: changeTrackerMutation.mutate,
        isChangeTrackerSuccess: changeTrackerMutation.isSuccess,
    };
};