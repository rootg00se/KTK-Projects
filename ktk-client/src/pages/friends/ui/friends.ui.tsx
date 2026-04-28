import { useFriends } from "@/entities/user";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/shared/components/ui";
import React from "react";
import { Link, useParams } from "react-router-dom";

export const FriendsPage: React.FC = () => {
    const { id: userId } = useParams();
    const { userFriendsData } = useFriends(userId);

    if (!userFriendsData || !userFriendsData.length) return <p className="text-center mt-10 text-lg opacity-60 w-full">У вас нет друзей :(</p>;

    return (
        <div className="w-full">
            {userFriendsData.map((friend) => (
                <div className="flex items-center justify-between border-b py-3">
                    <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-11 h-11 relative">
                            <AvatarImage src={friend.avatar_url || ""} />
                            <AvatarFallback className="text-lg bg-[#dadada]">
                                {friend.nickname.slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p>{friend.display_name || friend.nickname}</p>
                            <Link to={`/profile/${friend.user_id}`} className="text-[14px] opacity-50 hover:underline">
                                #{friend.nickname}
                            </Link>
                        </div>
                    </div>
                    <Button size="sm" className="text-[12px]">Убрать из друзей</Button>
                </div>
            ))}
        </div>
    );
};
