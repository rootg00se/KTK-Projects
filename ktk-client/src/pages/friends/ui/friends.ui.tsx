import { useFriends, useUsers } from "@/entities/user";
import { useUsersSearch } from "@/features/user/search-users/model/useUsersSearch";
import { FriendsList } from "@/widgets/friends-list";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";

export const FriendsPage: React.FC = () => {
    const { id: userId } = useParams();

    const { userFriendsData } = useFriends(userId);
    const { queryFilter } = useUsersSearch();
    const { usersData, fetchNextPage, hasNextPage } = useUsers(queryFilter);
    
    const { ref, inView } = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const currentUsers = queryFilter.length > 0 ? (usersData || []) : (userFriendsData || []);

    if (!currentUsers?.length && !queryFilter) {
        return <p className="text-center mt-10 text-lg opacity-60 w-full">У вас нет друзей :(</p>;
    }

    return (
        <FriendsList
            loadMoreRef={ref}
            users={currentUsers}
            friends={userFriendsData}
            currendUserId={userId}
        />
    );
};
