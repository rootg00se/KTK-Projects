import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { userApi } from "../api/user.api";

export const useUsers = (nickname: string) => {
    const { data, isPending, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: [userApi.baseKey, "list", nickname],
        queryFn: (meta) => userApi.getUsers({ page: meta.pageParam, nickname }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.data.meta.hasNextPage ? lastPage.data.meta.page + 1 : undefined;
        },
        enabled: nickname !== ""
    });

    const usersData = useMemo(() => data?.pages.flatMap((page) => page.data.data) ?? [], [data]);

    return {
        usersData,
        usersPending: isPending,
        fetchNextPage,
        hasNextPage,
    };
};
