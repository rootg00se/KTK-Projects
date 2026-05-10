type ChatMember = {
    user_id: string;
    email: string;
    nickname: string;
    display_name: string;
    avatar_url: string;
    is_verified: boolean;
    method: string;
    profile_data: string;
    banner_url: string;
    created_at: Date;
    updated_at: Date;
    avatar_key: string;
    banner_key: string;
    profile_data_key: string;
};

export interface IChatResponse {
    chat_id: string;
    type: "private" | "group";
    chat_members: { users: ChatMember }[];
    created_at: Date;
    update_at: Date;
    partner: ChatMember | null;
    lastMessage: {
        content: string;
        created_at: Date;
        users: { nickname: string };
    } | null;
}

export type ChatMessages = {
    message_id: string;
    sender_id: string;
    chat_id: string;
    content: string;
    created_at: Date;
    deleted_at?: Date;
    updated_at: Date;
    users: {
        nickname: string;
        display_name: string;
        avatar_url: string;
    };
};
