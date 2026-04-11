import { useQuery } from "@tanstack/react-query"
import { questionsApi } from "../api/question.api";

export const useProjectQuestions = (projectId: string) => {
    const { data, isPending } = useQuery({
        queryKey: [questionsApi.baseKey, projectId],
        queryFn: () => questionsApi.getProjectQuestions(projectId),
        select: data => data.data
    });

    return {
        projectQuestionsData: data,
        isProjectQuestionsPending: isPending
    }
}