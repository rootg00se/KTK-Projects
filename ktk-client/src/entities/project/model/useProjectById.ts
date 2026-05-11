import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/project.api";

export const useProjectById = (projectId: string | undefined) => {
    const { data, isPending, isError } = useQuery({
        queryKey: [projectsApi.baseKey, projectId],
        queryFn: () => projectsApi.getProjectById(projectId!),
        select: (data) => data.data,
        enabled: !!projectId
    });

    return {
        projectData: data,
        isProjectPending: isPending,
        isProjectError: isError
    };
};
