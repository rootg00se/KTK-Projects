export interface IMessageResponse {
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
}
