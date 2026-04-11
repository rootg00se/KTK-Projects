export const USER_INCLUDE = {
    users_skills: { select: { skills: true } },
    accounts: { omit: { access_token: true, refresh_token: true } },
    _count: {
        select: {
            users_friends_users_friends_friend_idTousers: true,
            projects: true,
        },
    },
};
