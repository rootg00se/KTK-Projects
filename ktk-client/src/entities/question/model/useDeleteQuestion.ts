import { useMutation } from "@tanstack/react-query";
import { questionsApi } from "../api/question.api";
import { queryClient } from "@/app/providers/query-client";
import type { IQuestionResponse } from "./types";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import type { AxiosResponse } from "axios";

export const useDeleteQuestion = (projectId: string) => {
    const deleteQuestionMutation = useMutation({
        mutationKey: [questionsApi.baseKey, "delete"],
        mutationFn: questionsApi.deleteQuestion,
        onMutate: async (dto) => {
            await queryClient.cancelQueries({ queryKey: [questionsApi.baseKey] });

            const previousQuestions = queryClient.getQueryData([questionsApi.baseKey, projectId]);

            queryClient.setQueryData(
                [questionsApi.baseKey, projectId],
                (oldData: AxiosResponse<IQuestionResponse[]>) => ({
                    ...oldData,
                    data: oldData.data.filter((question) => question.question_id !== dto.questionId),
                }),
            );

            return { previousQuestions };
        },
        onError: (error: IErrorResponse, _, context) => {
            queryClient.setQueryData([questionsApi.baseKey, projectId], context?.previousQuestions);
            console.log(error);

            toast.error(error.response.data.message[0]);
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
