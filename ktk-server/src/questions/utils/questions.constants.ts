export const QUESTIONS_INCLUDE = {
    users: { omit: { password_hash: true } },
    _count: { select: { other_questions: true } },
};
