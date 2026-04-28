import type { InfiniteData } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/query-client";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { projectsApi } from "../api/project.api";
import type { IPaginationProjectResponse } from "./types";
import { useOptimisticMutation } from "@/shared/hooks/useOptimisticMutation";

export const useToggleLike = (like: boolean) => {
    const toggleLikeMutation = useOptimisticMutation({
        mutationKey: [projectsApi.baseKey, "toggleLike"],
        mutationFn: like ? projectsApi.likeProject : projectsApi.dislikeProject,
        cancelQueryKeys: [[projectsApi.baseKey]],
        optimisticTargets: [
            {
                queryFilters: { queryKey: [projectsApi.baseKey, "list"] },
                updater: (data: unknown, params) => {
                    const listData = data as InfiniteData<AxiosResponse<IPaginationProjectResponse>> | undefined;
                    if (!listData) return data;

                    return {
                        ...listData,
                        pages: listData.pages.map((page) => ({
                            ...page,
                            data: {
                                ...page.data,
                                items: page.data.data.map((post) =>
                                    post.project_id === params.projectId ? { ...post, is_liked: like } : post,
                                ),
                            },
                        })),
                    };
                },
            },
        ],
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [projectsApi.baseKey] });
        },
    });

    return {
        toggleLikeFun: toggleLikeMutation.mutate,
        isToggleLikePending: toggleLikeMutation.isPending,
    };
};
