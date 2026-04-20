import { useQuery } from "@tanstack/react-query"
import { questionsApi } from "../api/question.api";

export const useProjectQuestions = (projectId: string | undefined) => {
    const { data, isPending } = useQuery({
        queryKey: [questionsApi.baseKey, projectId],
        queryFn: () => questionsApi.getProjectQuestions(projectId!),
        select: data => data.data,
        enabled: !!projectId
    });

    return {
        projectQuestionsData: data,
        isProjectQuestionsPending: isPending
    }
}