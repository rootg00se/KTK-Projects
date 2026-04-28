import { useCreateProject } from "@/entities/project";
import { useTags } from "@/entities/tags";
import { selectUserId, useFriends, useUser } from "@/entities/user";
import type { IUserResponse } from "@/entities/user/model/types";
import { MarkdownEditor } from "@/features/markdown-editor";
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
    Input,
    Label,
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from "@/shared/components/ui";
import { ArrowUpRightIcon, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const CreateProjectPage: React.FC = () => {
    const userId = selectUserId();

    const [markdown, setMarkdown] = useState("### Начните расписывать ваш проект");
    const [title, setTitle] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [projectTags, setProjectTags] = useState<string[]>([]);
    const [members, setMembers] = useState<IUserResponse[]>([]);

    const [showTagsData, setShowTagsData] = useState(false);

    const { userData } = useUser();
    const { createProjectFunc } = useCreateProject();
    const { tagsData } = useTags();
    const { userFriendsData } = useFriends(userId);

    const handleCreateProject = () => {
        if (!title) toast.error("Название проекта обязательно!");
        if (!projectTags.length) toast.error("Вам нужно выбрать хотя бы 1 тег для проекта");

        createProjectFunc({
            title,
            projectLink,
            members: members.map((member) => member.user_id),
            tags: projectTags,
            content: markdown,
        });
    };

    if (!userData) return null;
    if (!userFriendsData) return null;
    if (!tagsData) return null;

    return (
        <div className="w-full">
            <div className="mb-8">
                <p className="font-heading mb-5 text-lg">Основная информация:</p>
                <div className="w-full max-w-120">
                    <div className="mb-4">
                        <Label className="font-heading mb-3">
                            Название проекта <span className="text-primary">*</span>
                        </Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите название..."
                        />
                    </div>
                    <div>
                        <Label className="font-heading mb-3">Ссылка на проект</Label>
                        <Input
                            value={projectLink}
                            onChange={(e) => setProjectLink(e.target.value)}
                            placeholder="Укажите ссылку..."
                        />
                    </div>
                </div>
            </div>
            <div className="mb-8">
                <p className="font-heading mb-5 text-lg">Добавьте участников в проект:</p>
                <Empty className="border-2 max-w-120">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            {[...members, userData].map((member) => (
                                <Avatar className="w-11 h-11 relative -ml-3">
                                    <AvatarImage src={member.avatar_url || ""} />
                                    <AvatarFallback className="text-lg bg-[#dadada]">
                                        {member.nickname.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                        </EmptyMedia>
                        <EmptyTitle>Участники проекта</EmptyTitle>
                        <EmptyDescription>
                            Добавьте пользователей, которые есть у вас в друзья в работу над этим проектом.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent className="flex-row justify-center gap-2">
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
                                        {userFriendsData?.filter(
                                            (participant) =>
                                                !members.find((member) => participant.user_id === member.user_id),
                                        ).length ? (
                                            userFriendsData
                                                ?.filter(
                                                    (participant) =>
                                                        !members.find(
                                                            (member) => participant.user_id === member.user_id,
                                                        ),
                                                )
                                                .map((friend) => (
                                                    <Avatar
                                                        className="w-10 h-10 relative cursor-pointer hover:opacity-90"
                                                        key={friend.user_id}
                                                        onClick={() => setMembers((prev) => [...prev, friend])}
                                                    >
                                                        <AvatarImage src={friend.avatar_url || ""} />
                                                        <AvatarFallback className="text-lg bg-[#dadada]">
                                                            {friend.nickname.slice(0, 2)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                ))
                                        ) : (
                                            <p className="font-heading text-center w-full text-[16px] opacity-50">
                                                Здесь пусто
                                            </p>
                                        )}
                                    </div>
                                </PopoverHeader>
                                {userFriendsData?.filter((participant) =>
                                    members.find((member) => participant.user_id === member.user_id),
                                ).length !== 0 && (
                                    <div className="mt-3 mb-2">
                                        <p className="mb-3">Убрать участников</p>
                                        <div className="flex flex-wrap gap-3">
                                            {userFriendsData
                                                ?.filter((participant) =>
                                                    members.find((member) => participant.user_id === member.user_id),
                                                )
                                                .map((participant) => (
                                                    <div
                                                        key={participant.user_id}
                                                        className="max-w-8 relative group cursor-pointer"
                                                        onClick={() =>
                                                            setMembers((prev) =>
                                                                prev.filter(
                                                                    (member) => member.user_id !== participant.user_id,
                                                                ),
                                                            )
                                                        }
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
                    </EmptyContent>
                    <Button variant="link" asChild className="text-muted-foreground" size="sm">
                        <Link to={`/profile/${userData.user_id}/friends`}>
                            Найти себе друзей <ArrowUpRightIcon />
                        </Link>
                    </Button>
                </Empty>
            </div>
            <div className="mb-8">
                <p className="font-heading mb-5 text-lg">Теги проекта:</p>
                <div className="max-w-150">
                    <Popover open={showTagsData} onOpenChange={setShowTagsData}>
                        <PopoverTrigger asChild>
                            <div className="">
                                <Input
                                    onFocus={() => setShowTagsData(true)}
                                    onBlur={() => setShowTagsData(false)}
                                    placeholder="Искать теги..."
                                />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-150">
                            <div className="grid grid-cols-3 gap-3">
                                {tagsData
                                    .filter((tag) => !projectTags.find((tagName) => tag.name === tagName))
                                    .map((tag) => (
                                        <p
                                            onClick={() => setProjectTags((prev) => [...prev, tag.name])}
                                            className="cursor-pointer hover:opacity-100 transition-opacity inline opacity-50"
                                        >
                                            #{tag.name}
                                        </p>
                                    ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                    <div className="flex flex-wrap gap-2 text-sm mt-4">
                        {projectTags &&
                            projectTags.map((tag) => (
                                <p
                                    onClick={() => setProjectTags((prev) => prev.filter((tagName) => tagName !== tag))}
                                    className="cursor-pointer hover:opacity-100 transition-opacity font-heading opacity-50 lowercase"
                                >
                                    #{tag}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
            <div className="mb-8">
                <p className="font-heading mb-5 text-lg">Подробная информация об проекте:</p>
                <div className="max-w-190">
                    <MarkdownEditor value={markdown} onChange={setMarkdown} />
                </div>
            </div>
            <Button onClick={handleCreateProject}>Создать проект</Button>
        </div>
    );
};
