import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { projectsApi } from "../api/project.api";

export const useProjects = (tags: string, query: string) => {
    const { data, isPending, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: [projectsApi.baseKey, "list", tags, query],
        queryFn: (meta) => projectsApi.getAllProjects({ page: meta.pageParam, tags, query }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.data.meta.hasNextPage ? lastPage.data.meta.page + 1 : undefined;
        },
    });

    const projectsData = useMemo(() => data?.pages.flatMap((page) => page.data.data) ?? [], [data]);

    return {
        projectsData,
        projectsPending: isPending,
        fetchNextPage,
        hasNextPage,
    };
};
