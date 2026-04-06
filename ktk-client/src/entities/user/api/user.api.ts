import { $api } from "@/shared/api/api";
import { USER_ENDPOINT, USER_ENDPOINTS } from "../lib/constants";
import type { IUserResponse } from "../model/types";

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
};
