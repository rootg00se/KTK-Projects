import { selectUserId } from "@/entities/user";
import { useAddFriend } from "../model/useAddFriend";
import { useRemoveFriend } from "../model/useRemoveFriend";
import { Button } from "@/shared/components/ui";
import React from "react";

interface IToggleFriendshipProps {
    targetUserId: string;
    isFriend: boolean;
}

export const ToggleFriendship: React.FC<IToggleFriendshipProps> = ({ targetUserId, isFriend }) => {
    const userId = selectUserId();

    const { addFriendFunc, isAddFriendPending: isAdding } = useAddFriend(userId);
    const { removeFriendFunc, isRemoveFriendPending: isRemoving } = useRemoveFriend(userId);

    const handleAction = () => {
        if (isFriend) {
            removeFriendFunc({ userId: targetUserId });
        } else {
            addFriendFunc({ userId: targetUserId });
        }
    };

    return (
        <Button
            variant={isFriend ? "outline" : "default"}
            size="sm"
            onClick={handleAction}
            disabled={isAdding || isRemoving}
            className="text-[12px]"
        >
            {isFriend ? "Убрать из друзей" : "Добавить в друзья"}
        </Button>
    );
};
