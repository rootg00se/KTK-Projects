import { selectUserId } from "@/entities/user";
import { useAddFriend } from "../model/useAddFriend";
import { useRemoveFriend } from "../model/useRemoveFriend";
import { Button } from "@/shared/components";
import React from "react";
import { cn } from "@/shared/lib/utils";

interface IToggleFriendshipProps {
    targetUserId: string;
    isFriend: boolean;
    className?: string;
}

export const ToggleFriendship: React.FC<IToggleFriendshipProps> = ({ targetUserId, isFriend, className }) => {
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
            onClick={handleAction}
            disabled={isAdding || isRemoving}
            className={cn("text-[12px] max-xs:text-[11px] max-xs:max-h-8", className)}
        >
            {isFriend ? "Убрать из друзей" : "Добавить в друзья"}
        </Button>
    );
};
