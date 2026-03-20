export const USER_INCLUDE = {
    users_skills: { select: { skills: true } },
    accounts: { omit: { access_token: true, refresh_token: true } },
};
