import { auth_method } from "@prisma/generated/enums";

export type QuestionMapper = {
    project_id: string;
    created_at: Date;
    updated_at: Date;
    question_id: string;
    parent_id: string | null;
    user_id: string;
    text: string;
    users: {
        created_at: Date;
        updated_at: Date;
        user_id: string;
        email: string;
        password_hash: string | null;
        nickname: string;
        display_name: string | null;
        avatar_url: string | null;
        is_verified: boolean;
        method: auth_method;
        profile_data: string | null;
        banner_url: string | null;
        avatar_key: string | null;
        banner_key: string | null;
        profile_data_key: string | null;
    };
    _count: {
        other_questions: number;
    };
};
