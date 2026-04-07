import { $api } from "@/shared/api/api";
import type { ISkillResponse } from "../model/types";
import { SKILLS_ENDPOINT } from "../lib/constants";

export const skillsApi = {
    baseKey: "skills",
    getAllSkills: async (query?:string) => {
        return await $api.get<ISkillResponse[]>(`${SKILLS_ENDPOINT}?query=${query}`);
    },
}