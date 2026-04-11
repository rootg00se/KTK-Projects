import { QuestionMapper } from "./types/question-mapper.type";

export const questionMapper = (question: QuestionMapper) => {
    const { _count, ...questionData } = question;

    return {
        ...questionData,
        repliesCount: _count.other_questions,
    };
};
