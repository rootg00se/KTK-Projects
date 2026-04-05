import { auth_method } from "@prisma/generated/enums";

export type ProjectMapper = {
    project_likes: {
        project_id: string;
        user_id: string;
    }[];
    project_members: {
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
    }[];
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
    projects_tags: {
        tags: {
            created_at: Date;
            tag_id: string;
            name: string;
            badge_url: string;
        };
    }[];
    _count: {
        project_likes: number;
    };
};
