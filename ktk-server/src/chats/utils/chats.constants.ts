import { SortOrder } from "@prisma/generated/internal/prismaNamespace";

export const CHATS_INCLUDE = {
    chat_members: {
        include: {
            users: { omit: { password_hash: true } },
        },
    },
    messages: {
        orderBy: { created_at: SortOrder.desc },
        take: 1,
        include: {
            users: { select: { nickname: true } },
        },
    },
};
