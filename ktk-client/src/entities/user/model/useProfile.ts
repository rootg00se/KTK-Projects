import { userApi } from "@/entities/user";
import { useQuery } from "@tanstack/react-query"

export const useProfile = (userId: string) => {
    const { data, isPending } = useQuery({
        queryKey: [userApi.baseKey, userId],
        queryFn: () => userApi.getProfile(userId),
        select: data => data.data,
    });

    return {
        userProfileData: data,
        isUserProfilePending: isPending
    }
}