import { UserMapper } from "./types/user-mapper.type";

export const userMapper = (user: UserMapper | null) => {
    if (!user) return null;

    const { users_skills, _count, ...userData } = user;

    return {
        ...userData,
        skills: users_skills.map(el => el.skills),
        projectsCount: _count.projects,
        friendCount: _count.users_friends_users_friends_user_idTousers,
    };
};
