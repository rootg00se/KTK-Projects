import { questionsApi } from "@/entities/question";
import { queryClient } from "@/app/providers/query-client";
import type { IQuestionResponse } from "@/entities/question";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import type { AxiosResponse } from "axios";
import { useOptimisticMutation } from "@/shared/hooks/useOptimisticMutation";

export const useUpdateQuestion = (projectId: string) => {
    const updateQuestionMutation = useOptimisticMutation({
        mutationKey: [questionsApi.baseKey, "update"],
        mutationFn: questionsApi.updateQuestion,
        cancelQueryKeys: [[questionsApi.baseKey]],
        optimisticTargets: [
            {
                queryKey: [questionsApi.baseKey, projectId],
                updater: (oldData: unknown, dto) => {
                    const questionData = oldData as AxiosResponse<IQuestionResponse[]> | undefined;
                    if (!questionData) return oldData;

                    return {
                        ...questionData,
                        data: questionData.data.map((question) =>
                            question.question_id === dto.questionId ? { ...question, text: dto.text } : question,
                        ),
                    };
                },
            },
        ],
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Вопрос обновлен");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });

    return {
        isUpdatePending: updateQuestionMutation.isPending,
        updateFunc: updateQuestionMutation.mutate,
        isUpdateSuccess: updateQuestionMutation.isSuccess,
    };
};
