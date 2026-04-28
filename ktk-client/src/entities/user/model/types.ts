type Account = {
    account_id: string;
    provider: string;
    created_at: Date;
    user_id: string;
    provider_account_id: string;
};

export type Skill = {
    skill_id: string;
    badge_url: string;
    name: string;
    created_at: Date;
};

export type UpdateSkillsDto = {
    skillsToAddIds: string[];
    skillsToRemoveIds: string[];
};

export type UpdateUserDto = {
    nickname: string;
    displayName: string;
};

export interface IUserResponse {
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
    projectsCount: number;
    friendCount: number;
}

export interface IPaginationUsersResponse {
    data: IUserResponse[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
    };
}