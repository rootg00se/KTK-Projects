import { ChatMapper } from "./types/chat-mapper.type";

export const chatMapper = (chat: ChatMapper, currentUserId: string) => {
    const { chat_members, messages, ...chatData } = chat;

    const partner =
        chat.type === "private"
            ? chat_members.find(member => member.users.user_id !== currentUserId)?.users
            : null;

    const lastMessage = messages[0]
        ? {
              content: messages[0].content,
              created_at: messages[0].created_at,
              sender_nickname: messages[0].users.nickname,
          }
        : null;

    return {
        ...chatData,
        partner,
        lastMessage,
        chat_members: chat_members.map(member => member.users),
    };
};
