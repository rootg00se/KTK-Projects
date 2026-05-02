import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/query-client";
import { toast } from "react-toastify";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { projectsApi } from "@/entities/project";

export const useToggleLike = (like: boolean) => {
    const toggleLikeMutation = useMutation({
        mutationKey: [projectsApi.baseKey, "toggleLike"],
        mutationFn: like ? projectsApi.likeProject : projectsApi.dislikeProject,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    return {
        toggleLikeFun: toggleLikeMutation.mutate,
        isToggleLikePending: toggleLikeMutation.isPending,
    };
};
