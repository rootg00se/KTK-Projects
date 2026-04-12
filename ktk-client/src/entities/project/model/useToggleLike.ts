import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/query-client";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { projectsApi } from "../api/project.api";
import type { IPaginationProjectResponse } from "./types";

export const useToggleLike = (like: boolean) => {
    const toggleLikeMutation = useMutation({
        mutationKey: [projectsApi.baseKey, "toggleLike"],
        mutationFn: like ? projectsApi.likeProject : projectsApi.dislikeProject,
        onMutate: async (params) => {
            await queryClient.cancelQueries({ queryKey: [projectsApi.baseKey] });

            const previousProjects = queryClient.getQueriesData<InfiniteData<AxiosResponse<IPaginationProjectResponse>>>({
                queryKey: [projectsApi.baseKey, "list"],
            });

            queryClient.setQueriesData<InfiniteData<AxiosResponse<IPaginationProjectResponse>>>(
                { queryKey: [projectsApi.baseKey, "list"] },
                (data) => {
                    if (!data) return data;

                    return {
                        ...data,
                        pages: data.pages.map((page) => ({
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
            );

            return { previousProjects };
        },
        onError: (error: IErrorResponse, _, context) => {
            queryClient.setQueryData([projectsApi.baseKey, "list"], context?.previousProjects);

            toast.error(error.response.data.message);
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
