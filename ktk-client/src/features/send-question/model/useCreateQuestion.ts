import { useMutation } from "@tanstack/react-query";
import { questionsApi } from "@/entities/question";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/query-client";

export const useCreateQuestion = () => {
    const createQuestionMutation = useMutation({
        mutationKey: [questionsApi.baseKey, "create"],
        mutationFn: questionsApi.createQuestion,
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Вопрос отправлен");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [questionsApi.baseKey] });
        },
    });

    return {
        isCreateQuestionPenfing: createQuestionMutation.isPending,
        createQuestionFunc: createQuestionMutation.mutate,
        isCreateQuestionSuccess: createQuestionMutation.isSuccess,
    };
};
