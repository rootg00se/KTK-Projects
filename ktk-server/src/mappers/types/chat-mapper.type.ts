import { auth_method, chat_type } from "@prisma/generated/enums";

export type ChatMapper = {
    created_at: Date;
    updated_at: Date;
    chat_id: string;
    type: chat_type;
    chat_members: {
        users: {
            created_at: Date;
            updated_at: Date;
            user_id: string;
            email: string;
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
};
