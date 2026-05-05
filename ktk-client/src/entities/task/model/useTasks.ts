import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "../api/task.api";

export const useTasks = (trackerId: string | undefined) => {
    const { data, isPending } = useQuery({
        queryKey: [tasksApi.baseKey, trackerId],
        queryFn: () => tasksApi.getAllTasks(trackerId!),
        select: data => data.data,
        enabled: !!trackerId
    });

    return {
        tasksData: data,
        isTasksPending: isPending
    }
}