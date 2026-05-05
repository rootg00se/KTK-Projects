import { questionsApi } from "@/entities/question";
import { queryClient } from "@/app/providers/query-client";
import type { IQuestionResponse } from "@/entities/question";
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
                        data: questionData.data.map((question) => {
                            if (question.question_id === dto.questionId) {
                                return {
                                    ...question,
                                    is_deleted: true,
                                    deleted_at: new Date(),
                                    text: "Сообщение удалено",
                                    users: null,
                                };
                            }
                            return question;
                        }),
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
