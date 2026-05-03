import { queryClient } from "@/app/providers/query-client";
import { taskTrackersApi, type ITaskTrackerResponse } from "@/entities/task-tracker";
import { useOptimisticMutation } from "@/shared/hooks/useOptimisticMutation";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const useUpdateTracker = (projectId: string) => {
    const updateTrackerMutation = useOptimisticMutation({
        mutationKey: [taskTrackersApi.baseKey, "update"],
        mutationFn: taskTrackersApi.updateTrackerName,
        cancelQueryKeys: [[taskTrackersApi.baseKey]],
        optimisticTargets: [
            {
                queryKey: [taskTrackersApi.baseKey, projectId],
                updater: (oldData: unknown, dto) => {
                    const trackersData = oldData as AxiosResponse<ITaskTrackerResponse[]> | undefined;
                    if (!trackersData) return oldData;

                    return {
                        ...trackersData,
                        data: trackersData.data.map((tracker) =>
                            tracker.task_tracker_id === dto.trackerId ? { ...tracker, name: dto.name } : tracker,
                        ),
                    };
                },
            },
        ],
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskTrackersApi.baseKey] });
        },
    });

    return {
        isUpdatePending: updateTrackerMutation.isPending,
        updateFunc: updateTrackerMutation.mutate,
        isUpdateSuccess: updateTrackerMutation.isSuccess,
    };
};
