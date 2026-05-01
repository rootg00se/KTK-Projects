import { $api } from "@/shared/api/api";
import { USER_ENDPOINT, USER_ENDPOINTS } from "../lib/constants";
import { type IPaginationUsersResponse, type IUserResponse, type UpdateSkillsDto, type UpdateUserDto } from "../model/types";

export const userApi = {
    baseKey: "users",
    getInfo: async () => {
        return await $api.get<IUserResponse>(USER_ENDPOINTS.GET_INFO);
    },
    getProfile: async (userId: string) => {
        return await $api.get<IUserResponse>(`${USER_ENDPOINT}/${userId}`);
    },
    updateAvatar: async (formData: FormData) => {
        return await $api.patch<IUserResponse>(USER_ENDPOINTS.AVATAR, formData);
    },
    deleteAvatar: async () => {
        return await $api.delete<IUserResponse>(USER_ENDPOINTS.AVATAR);
    },
    updateBanner: async (formData: FormData) => {
        return await $api.patch<IUserResponse>(USER_ENDPOINTS.BANNER, formData);
    },
    deleteBanner: async () => {
        return await $api.delete<IUserResponse>(USER_ENDPOINTS.BANNER);
    },
    updateSkills: async (data: UpdateSkillsDto) => {
        return await $api.patch<IUserResponse>(USER_ENDPOINTS.SKILLS, data);
    },
    updateUser: async (data: UpdateUserDto) => {
        return await $api.patch<IUserResponse>(USER_ENDPOINTS.GET_INFO, data);
    },
    updateUserProfile: async (data: { content: string }) => {
        return await $api.patch<IUserResponse>(USER_ENDPOINTS.PROFILE, data);
    },
    getUserFriends: async (userId: string) => {
        return await $api.get<IUserResponse[]>(`${USER_ENDPOINT}/${userId}/friends`);
    },
    getUsers: async ({ page, nickname }: { page: number; nickname: string }) => {
        return await $api.get<IPaginationUsersResponse>(`${USER_ENDPOINT}?limit=20&page=${page}&nickname=${nickname}`);
    },
    addFriend: async ({ userId }: { userId: string }) => {
        return await $api.post<IUserResponse>(`${USER_ENDPOINTS.FRIENDS}/${userId}`);
    },
    removeFriend: async ({ userId }: { userId: string }) => {
        return await $api.delete<IUserResponse>(`${USER_ENDPOINTS.FRIENDS}/${userId}`);
    }
};
