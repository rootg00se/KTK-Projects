import React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from "@/shared/components/ui";
import { Plus, X } from "lucide-react";
import { useAddParticipant, useDeleteParticipant, useParticipants } from "@/entities/project";
import { toast } from "react-toastify";
import { selectUserId, useFriends } from "@/entities/user";
import { useParams } from "react-router-dom";

export const UpdateParticipantsPopover: React.FC = () => {
    const userId = selectUserId();
    const { id: projectId } = useParams();

    const { addParticipantFunc } = useAddParticipant();
    const { deleteParticipantFunc } = useDeleteParticipant();

    const handleRemoveParticipant = (userId: string) => {
        if (!projectId) return toast.error("Что-то пошло не так");

        deleteParticipantFunc({
            projectId,
            userId,
        });
    };

    const handleAddParticipant = (userId: string) => {
        if (!projectId) return toast.error("Что-то пошло не так");

        addParticipantFunc({
            projectId,
            userId,
        });
    };

    const { userFriendsData } = useFriends(userId);
    const { participantsData } = useParticipants(projectId);

    if (!participantsData) return null;
    if (!userFriendsData) return null;

    const filteredFriends = userFriendsData.filter(
        (friend) => !participantsData?.find((participant) => participant.user_id === friend.user_id),
    );

    return (
        <Popover>
            <PopoverTrigger>
                <Button>
                    <Plus />
                    <div>Добавить участников</div>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <p className="mb-3">Добавтье в проект друзей:</p>
                    <div className="flex gap-2">
                        {filteredFriends.length ? (
                            filteredFriends.map((friend) => (
                                <Avatar
                                    className="w-10 h-10 relative cursor-pointer hover:opacity-90"
                                    key={friend.user_id}
                                    onClick={() => handleAddParticipant(friend.user_id)}
                                >
                                    <AvatarImage src={friend.avatar_url || ""} />
                                    <AvatarFallback className="text-lg bg-[#dadada]">
                                        {friend.nickname.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                            ))
                        ) : (
                            <p className="font-heading text-center w-full text-[16px] opacity-50">Здесь пусто</p>
                        )}
                    </div>
                </PopoverHeader>
                {participantsData && (
                    <div className="mt-3 mb-2">
                        <p className="mb-3">Убрать участников</p>
                        <div className="flex flex-wrap gap-3">
                            {participantsData?.map((participant) => (
                                <div
                                    key={participant.user_id}
                                    className="max-w-8 relative group cursor-pointer"
                                    onClick={() => handleRemoveParticipant(participant.user_id)}
                                >
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={participant.avatar_url || ""} />
                                        <AvatarFallback className="text-lg bg-[#dadada]">
                                            {participant.nickname.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute hidden w-10 h-10 rounded-full group-hover:flex bg-[#00000093] top-0 left-0 items-center justify-center">
                                        <X color="white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <PopoverClose asChild>
                    <Button variant={"outline"}>Готово</Button>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    );
};
