import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/project.api";

export const useUserProjects = (userId: string) => {
    const { data, isPending } = useQuery({
        queryKey: [projectsApi.baseKey, "list", userId],
        queryFn: () => projectsApi.getUserProjects(userId),
        select: (data) => data.data,
    });

    return {
        userProjectsData: data,
        isUserProjectsPending: isPending
    }
};
