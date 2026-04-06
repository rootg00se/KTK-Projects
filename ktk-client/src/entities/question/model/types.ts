export interface IQuestionResponse {
    question_id: string;
    parent_id: string | null;
    user_id: string;
    project_id: string;
    text: string;
    created_at: Date;
    updated_at: Date;
    users: {
        user_id: string;
        email: string;
        nickname: string;
        display_name: string | null;
        avatar_url: string | null;
        is_verified: boolean;
        method: string;
        profile_data: string | null;
        banner_url: string | null;
        created_at: Date;
        updated_at: Date;
        avatar_key: string | null;
        banner_key: string | null;
        profile_data_key: string | null;
    };
}
