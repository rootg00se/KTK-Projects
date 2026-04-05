import { $api } from "@/shared/api/api";
import { USER_ENDPOINTS } from "../lib/constants";
import type { IUserResponse } from "../model/types";

export const userApi = {
    baseKey: "users",
    getInfo: async () => {
        return await $api.get<IUserResponse>(USER_ENDPOINTS.GET_INFO);
    }
};
