import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/project.api";

export const useProjectById = (projectId: string) => {
    const { data, isPending } = useQuery({
        queryKey: [projectsApi.baseKey, projectId],
        queryFn: () => projectsApi.getProjectById(projectId),
        select: (data) => data.data,
    });

    return {
        projectData: data,
        isProjectPending: isPending,
    };
};
