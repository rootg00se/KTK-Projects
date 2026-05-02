import { QuestionMapper } from "./types/question-mapper.type";

export const questionMapper = (question: QuestionMapper) => {
    const { _count, ...questionData } = question;

    if (question.deleted_at) {
        return {
            ...questionData,
            text: "Сообщение удалено",
            userId: null,
            users: null,
            is_deleted: true,
            repliesCount: _count.other_questions,
        };
    }

    return {
        ...questionData,
        is_deleted: false,
        repliesCount: _count.other_questions,
    };
};
