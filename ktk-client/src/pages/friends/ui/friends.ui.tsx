import { useFriends, useUsers } from "@/entities/user";
import { useUsersSearch } from "@/features/search-users/model/useUsersSearch";
import { ToggleFriendship } from "@/features/toggle-friendship";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useParams } from "react-router-dom";

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

    const currentUsers = queryFilter ? usersData : userFriendsData;

    if (!currentUsers?.length && !queryFilter) {
        return <p className="text-center mt-10 text-lg opacity-60 w-full">У вас нет друзей :(</p>;
    }

    return (
        <div className="w-full">
            <div>
                {currentUsers
                    ?.filter((user) => user.user_id !== userId)
                    ?.map((user) => {
                        const isFriend = !!userFriendsData?.some(friend => friend.user_id === user.user_id);
                        

                        return (
                            <div className="flex items-center justify-between border-b py-3">
                                <div className="flex items-center gap-2 mb-3">
                                    <Avatar className="w-11 h-11 relative">
                                        <AvatarImage src={user.avatar_url || ""} />
                                        <AvatarFallback className="text-lg bg-[#dadada]">
                                            {user.nickname.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p>{user.display_name || user.nickname}</p>
                                        <Link
                                            to={`/profile/${user.user_id}`}
                                            className="text-[14px] opacity-50 hover:underline"
                                        >
                                            #{user.nickname}
                                        </Link>
                                    </div>
                                </div>
                                <ToggleFriendship targetUserId={user.user_id} isFriend={isFriend} />
                            </div>
                        );
                    })}
            </div>
            <div ref={ref}></div>
        </div>
    );
};
