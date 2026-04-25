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
} from "@/shared/components/ui";
import { ArrowUpRightIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useParticipants } from "@/entities/project";
import { UpdateParticipantsPopover } from "./update-participants-popover.ui";

export const UpdateParticipants: React.FC = () => {
    const { id: projectId } = useParams();
    const { participantsData } = useParticipants(projectId);

    if (!participantsData) return null;

    return (
        <div className="mb-10 max-w-120">
            <Empty className="border-2">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        {participantsData?.map((participant) => (
                            <Avatar className="w-11 h-11 relative -ml-3">
                                <AvatarImage src={participant.avatar_url || ""} />
                                <AvatarFallback className="text-lg bg-[#dadada]">
                                    {participant.nickname.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                    </EmptyMedia>
                    <EmptyTitle>Участники проекта</EmptyTitle>
                    <EmptyDescription>
                        Добавьте своиих друзей в проект или удалите их если они больше не приносят пользы
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-row justify-center gap-2">
                    <UpdateParticipantsPopover />
                </EmptyContent>
                <Button variant="link" asChild className="text-muted-foreground" size="sm">
                    <Link to="/">
                        Найти себе друзей <ArrowUpRightIcon />
                    </Link>
                </Button>
            </Empty>
        </div>
    );
};
