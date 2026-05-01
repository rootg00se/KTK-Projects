import { API_URL } from "@/shared/config/constants";

export const USER_ENDPOINT = `${API_URL}/users`;

export const USER_ENDPOINTS = {
    GET_INFO: `${USER_ENDPOINT}/me`,
    AVATAR: `${USER_ENDPOINT}/me/avatar`,
    BANNER: `${USER_ENDPOINT}/me/banner`,
    SKILLS: `${USER_ENDPOINT}/me/skills`,
    PROFILE: `${USER_ENDPOINT}/me/profile`,
    FRIENDS: `${USER_ENDPOINT}/me/friends`,
};
