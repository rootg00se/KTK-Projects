import { useQuery } from "@tanstack/react-query";
import { skillsApi } from "../api/skill.api";

export const useSkills = (query: string) => {
    const { data, isPending } = useQuery({
        queryKey: [skillsApi.baseKey, query],
        queryFn: () => skillsApi.getAllSkills(query),
        select: (data) => data.data,
    });

    return {
        skillsData: data,
        isSkillsPending: isPending,
    };
};