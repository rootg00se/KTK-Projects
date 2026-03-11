import { auth_method, provider_type } from "@prisma/generated/enums";

export type UserMapper = {
    email: string;
    user_id: string;
    nickname: string;
    avatar_url: string | null;
    profile_data: string | null;
    banner_url: string | null;
    password_hash: string | null;
    display_name: string | null;
    is_verified: boolean;
    method: auth_method;
    created_at: Date;
    updated_at: Date;
    users_skills: {
        skills: {
            created_at: Date;
            skill_id: string;
            name: string;
            badge_url: string;
        };
    }[];
    accounts: {
        user_id: string;
        created_at: Date | null;
        account_id: string;
        provider: provider_type;
        provider_account_id: string;
    }[];
};
