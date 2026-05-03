import { queryClient } from "@/app/providers/query-client";
import { taskTrackersApi, type ITaskTrackerResponse } from "@/entities/task-tracker";
import { useOptimisticMutation } from "@/shared/hooks/useOptimisticMutation";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const useDeleteTracker = (projectId: string) => {
    const deleteTrackerMutation = useOptimisticMutation({
        mutationKey: [taskTrackersApi.baseKey, "delete"],
        mutationFn: taskTrackersApi.deleteTracker,
        cancelQueryKeys: [[taskTrackersApi.baseKey]],
        optimisticTargets: [
            {
                queryKey: [taskTrackersApi.baseKey, projectId],
                updater: (oldData: unknown, dto) => {
                    const trackerData = oldData as AxiosResponse<ITaskTrackerResponse[]> | undefined;
                    if (!trackerData) return oldData;

                    return {
                        ...trackerData,
                        data: trackerData.data.filter((tracker) => tracker.task_tracker_id !== dto.trackerId),
                    };
                },
            },
        ],
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Трекер удален");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskTrackersApi.baseKey] });
        },
    });

    return {
        isDeletePending: deleteTrackerMutation.isPending,
        deleteFunc: deleteTrackerMutation.mutate,
        isDeleteSuccess: deleteTrackerMutation.isSuccess,
    };
};
