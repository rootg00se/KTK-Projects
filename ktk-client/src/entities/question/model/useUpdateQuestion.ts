import { useMutation } from "@tanstack/react-query";
import { questionsApi } from "../api/question.api";
import { queryClient } from "@/app/providers/query-client";
import type { IQuestionResponse } from "./types";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import type { AxiosResponse } from "axios";

export const useUpdateQuestion = (projectId: string) => {
    const updateQuestionMutation = useMutation({
        mutationKey: [questionsApi.baseKey, "update"],
        mutationFn: questionsApi.updateQuestion,
        onMutate: async (dto) => {
            await queryClient.cancelQueries({ queryKey: [questionsApi.baseKey] });

            const previousUser = queryClient.getQueryData([questionsApi.baseKey, projectId]);

            queryClient.setQueryData(
                [questionsApi.baseKey, projectId],
                (oldData: AxiosResponse<IQuestionResponse[]>) => ({
                    ...oldData,
                    data: oldData.data.map((question) =>
                        question.question_id === dto.questionId ? { ...question, text: dto.text } : question,
                    ),
                }),
            );

            return { previousUser };
        },
        onError: (error: IErrorResponse, _, context) => {
            queryClient.setQueryData([questionsApi.baseKey, projectId], context?.previousUser);
            console.log(error);

            toast.error(error.response.data.message[0]);
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
