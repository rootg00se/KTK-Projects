import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const useFriends = (userId: string | undefined) => {
    const { data, isPending } = useQuery({
        queryKey: [userApi.baseKey, userId, "friends"],
        queryFn: () => userApi.getUserFriends(userId!),
        select: (data) => data.data,
        enabled: !!userId
    });

    return {
        userFriendsData: data,
        isUserFriendsPending: isPending
    }
};
