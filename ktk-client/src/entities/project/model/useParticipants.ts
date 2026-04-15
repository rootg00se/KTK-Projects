import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/project.api";

export const useParticipants = (projectId: string) => {
    const { data, isPending } = useQuery({
        queryKey: [projectsApi.baseKey, projectId, "participants"],
        queryFn: () => projectsApi.getProjectParticipants(projectId),
        select: (data) => data.data,
    });

    return {
        participantsData: data,
        isParticipantsPending: isPending
    }
};
