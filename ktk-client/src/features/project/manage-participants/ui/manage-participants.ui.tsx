import React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/shared/components";
import { ArrowUpRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ManageParticipantsPopover } from "./manage-participants-popover.ui";
import type { IUserResponse } from "@/entities/user";

interface IManageParticipantsProps {
    members: IUserResponse[];
    friends: IUserResponse[];
    onAdd: (user: IUserResponse) => void;
    onRemove: (userId: string) => void;
    currentUserId: string;
    title?: string;
    description?: string;
}

export const ManageParticipants: React.FC<IManageParticipantsProps> = ({
    members,
    friends,
    onAdd,
    onRemove,
    currentUserId,
    title = "Участники проекта",
    description = "Добавьте своиих друзей в проект или удалите их если они больше не приносят пользы",
}) => {
    const availableFriends = friends.filter((friend) => !members.find((m) => m.user_id === friend.user_id));

    return (
        <div className="mb-10 max-w-120 max-md:max-w-none">
            <Empty className="border-2">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        {members?.map((member) => (
                            <Avatar className="w-11 h-11 relative -ml-3">
                                <AvatarImage src={member.avatar_url || ""} />
                                <AvatarFallback className="text-lg bg-[#dadada]">
                                    {member.nickname.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                    </EmptyMedia>
                    <EmptyTitle>{title}</EmptyTitle>
                    <EmptyDescription>{description}</EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-row justify-center gap-2">
                    <ManageParticipantsPopover
                        filteredFriends={availableFriends}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        members={members}
                    />
                </EmptyContent>
                <Button variant="link" asChild className="text-muted-foreground" size="sm">
                    <Link to={`/profile/${currentUserId}/friends`}>
                        Найти себе друзей <ArrowUpRightIcon />
                    </Link>
                </Button>
            </Empty>
        </div>
    );
};
