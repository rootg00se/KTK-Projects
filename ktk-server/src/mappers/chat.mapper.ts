import { ChatMapper } from "./types/chat-mapper.type";

export const chatMapper = (chat: ChatMapper) => {
    const { chat_members, ...chatData } = chat;

    return {
        ...chatData,
        chat_members: chat_members.map(member => member.users),
    };
};
