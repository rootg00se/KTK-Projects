import { UserMapper } from "./types/user-mapper.type";

export const userMapper = (user: UserMapper | null) => {
    if (!user) return null;

    const { users_skills, ...userData } = user;

    return {
        ...userData,
        skills: users_skills.map(el => el.skills),
    };
};
