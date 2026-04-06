import { useQuery } from "@tanstack/react-query"
import { questionsApi } from "../api/question.api";

export const useUserQuestions = (userId: string) => {
    const { data, isPending } = useQuery({
        queryKey: [questionsApi.baseKey, userId],
        queryFn: () => questionsApi.getUserQuestions(userId),
        select: data => data.data
    });

    return {
        userQuestionsData: data,
        isUserQuestionsPending: isPending
    }
}