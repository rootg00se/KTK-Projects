import { useQuery } from "@tanstack/react-query";
import { taskTrackersApi } from "../api/task-tracker.api";

export const useTrackers = (projectId: string | undefined) => {
    const { data, isPending } = useQuery({
        queryKey: [taskTrackersApi.baseKey, projectId],
        queryFn: () => taskTrackersApi.getTaskTrackers(projectId!),
        select: data => data.data,
        enabled: !!projectId
    });

    return {
        trackersData: data,
        isTrackersPending: isPending
    }
}