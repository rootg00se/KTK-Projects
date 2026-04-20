import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/project.api";

export const useUserProjects = (userId: string | undefined) => {
    const { data, isPending } = useQuery({
        queryKey: [projectsApi.baseKey, "list", userId],
        queryFn: () => projectsApi.getUserProjects(userId!),
        select: (data) => data.data,
        enabled: !!userId
    });

    return {
        userProjectsData: data,
        isUserProjectsPending: isPending
    }
};
