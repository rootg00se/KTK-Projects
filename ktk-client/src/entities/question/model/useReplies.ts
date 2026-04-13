import { useQuery } from "@tanstack/react-query"
import { questionsApi } from "../api/question.api";

export const useReplies = (questionId: string) => {
    const { data, isPending } = useQuery({
        queryKey: [questionsApi.baseKey, questionId, "replies"],
        queryFn: () => questionsApi.getQuestionReplies(questionId),
        select: data => data.data
    });

    return {
        repliesData: data,
        isRepliesPending: isPending
    }
}