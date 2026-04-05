type Account = {
    account_id: string;
    provider: string;
    created_at: Date;
    user_id: string;
    provider_account_id: string;
};

type Skill = {
    skill_id: string;
    badge_url: string;
    name: string;
    created_at: Date;
};

export interface IAuthResponse {
    user_id: string;
    email: string;
    nickname: string;
    display_name: string;
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
    accounts: Account[];
    skills: Skill[];
}

export type SignUpDto = {
    email: string;
    nickname: string;
    password: string;
};

export type SignInDto = {
    email: string;
    password: string;
};
