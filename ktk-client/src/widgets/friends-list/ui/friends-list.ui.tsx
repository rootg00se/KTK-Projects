import type { IUserResponse } from "@/entities/user";
import { ToggleFriendship } from "@/features/user/toggle-friendship";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components";
import React from "react";
import { Link } from "react-router-dom";

interface IFriendsListProps {
    users: IUserResponse[];
    friends: IUserResponse[] | undefined;
    loadMoreRef: (node?: Element | null | undefined) => void;
    currendUserId: string | undefined;
}

export const FriendsList: React.FC<IFriendsListProps> = ({ users, friends, loadMoreRef, currendUserId }) => {
    return (
        <div className="w-full">
            <div>
                {users
                    ?.filter((user) => user.user_id !== currendUserId)
                    ?.map((user) => {
                        const isFriend = !!friends?.some((friend) => friend.user_id === user.user_id);

                        return (
                            <div className="flex items-center justify-between border-b py-3 max-xs:flex-col max-xs:items-start">
                                <div className="flex items-center gap-2 mb-3">
                                    <Avatar className="w-11 h-11 relative">
                                        <AvatarImage src={user.avatar_url || ""} />
                                        <AvatarFallback className="text-lg bg-[#dadada]">
                                            {user.nickname.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="max-md:text-[14px]">{user.display_name || user.nickname}</p>
                                        <Link
                                            to={`/profile/${user.user_id}`}
                                            className="text-[14px] opacity-50 hover:underline max-xs:text-[12px]"
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
            <div ref={loadMoreRef}></div>
        </div>
    );
};
