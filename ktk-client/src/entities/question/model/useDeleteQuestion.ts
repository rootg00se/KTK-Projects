import { questionsApi } from "../api/question.api";
import { queryClient } from "@/app/providers/query-client";
import type { IQuestionResponse } from "./types";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import type { AxiosResponse } from "axios";
import { useOptimisticMutation } from "@/shared/hooks/useOptimisticMutation";

export const useDeleteQuestion = (projectId: string) => {
    const deleteQuestionMutation = useOptimisticMutation({
        mutationKey: [questionsApi.baseKey, "delete"],
        mutationFn: questionsApi.deleteQuestion,
        cancelQueryKeys: [[questionsApi.baseKey]],
        optimisticTargets: [
            {
                queryKey: [questionsApi.baseKey, projectId],
                updater: (oldData: unknown, dto) => {
                    const questionData = oldData as AxiosResponse<IQuestionResponse[]> | undefined;
                    if (!questionData) return oldData;

                    return {
                        ...questionData,
                        data: questionData.data.filter((question) => question.question_id !== dto.questionId),
                    };
                },
            },
        ],
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Вопрос удален");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });

    return {
        isDeletePending: deleteQuestionMutation.isPending,
        deleteFunc: deleteQuestionMutation.mutate,
        isDeleteSuccess: deleteQuestionMutation.isSuccess,
    };
};
