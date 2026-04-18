import React, { useEffect, useState } from "react";
import logo from "/ktk-logo.png";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Input,
    Label,
    TabsContent,
} from "@/shared/components/ui";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isActivated, useUser } from "@/entities/user";
import { ArrowUpRightIcon, Heart, LayoutTemplate, MailQuestion, Plus, UsersRound } from "lucide-react";
import { useTabsUrlQuery } from "@/shared/hooks/useTabsUrlQuery";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui";
import {
    useProjectById,
    useParticipants,
    useUserProjects,
    useUpdateProject,
    useUpdateStatus,
} from "@/entities/project";
import { useFetchMarkdown } from "@/features/markdown-reader/model/useFetchMarkdown";
import { parseProjectStatus, parseTextToProjectState, projectStatusList } from "@/shared/utils/parse-project-status";
import { MarkdownReader } from "@/features/markdown-reader";
import { ProjectDetailsTag } from "@/widgets/project-details/ui/project-details-tag.ui";
import { FaGithubSquare } from "react-icons/fa";
import { ProjectQuestionsList } from "@/widgets/project-questions-list";
import { useProjectQuestions } from "@/entities/question";
import { MarkdownEditor } from "@/features/markdown-editor";
import {
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/shared/components/ui";
import { toast } from "react-toastify";

export const ProjectWorkspace: React.FC = () => {
    const [markdown, setMarkdown] = useState("");
    const [projectName, setProjectName] = useState("");
    const [link, setLink] = useState("");

    const { id: projectId } = useParams();
    const { activateTab, handleTabChange } = useTabsUrlQuery("tab", "projects");

    const { userData } = useUser();
    const { userProjectsData } = useUserProjects(userData?.user_id || "");
    const { projectData } = useProjectById(projectId!);
    const { participantsData } = useParticipants(projectId!);
    const { projectQuestionsData } = useProjectQuestions(projectId!);

    const { updateFunc } = useUpdateProject();
    const { updateStatusFunc } = useUpdateStatus();

    const navigate = useNavigate();
    const isUserActivated = isActivated();

    const markdownContent = useFetchMarkdown(projectData?.content_url);

    useEffect(() => {
        if (markdownContent) {
            setMarkdown(markdownContent);
        } else {
            setMarkdown("");
        }
    }, [markdownContent]);

    useEffect(() => {
        if (projectData) {
            setProjectName(projectData.title || "");
            setLink(projectData.project_link || "");
        }
    }, [projectData]);

    const handleUpdateProject = () => {
        if (!projectId) return toast.error("Что-то пошло не так");

        updateFunc({
            projectId,
            title: projectName,
            projectLink: link,
        });
    };

    const handleUpdateStatus = (status: string) => {
        if (!projectId) return toast.error("Что-то пошло не так");

        updateStatusFunc({
            projectId,
            status: parseTextToProjectState(status)!
        });
    };

    if (!userData) return null;
    if (!projectData) return null;

    return (
        <div>
            <header className="py-3 bg-white sticky top-0 z-100 border-b">
                <div className="_container flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <Link className="max-w-35" to={"/"}>
                            <img src={logo} className="w-full" alt="" />
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-0!">
                                <div className="flex items-center gap-2 border-2 rounded-sm p-2 cursor-pointer">
                                    <LayoutTemplate size={16} />
                                    <p className="text-sm font-medium">{projectData?.title}</p>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full mt-4">
                                {userProjectsData?.map((project) => (
                                    <DropdownMenuItem
                                        onClick={() => navigate(`/workspace/${project.project_id}?tab=general`)}
                                    >
                                        <div className="flex gap-2 items-center rounded-sm p-2 cursor-pointer">
                                            <LayoutTemplate size={16} />
                                            <p className="text-sm font-medium">{project.title}</p>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {isUserActivated && userData ? (
                        <Link to={`/profile/${userData.user_id}`} className="flex items-center gap-4">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={userData.avatar_url || ""} />
                                <AvatarFallback className="text-sm bg-[#dadada]">
                                    {userData.nickname.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-[16px]">{userData.display_name || userData.nickname}</div>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to={"/sign-in"} className="underline">
                                Логин
                            </Link>
                            <div className="h-6 bg-accent-foreground w-[0.2px] block"></div>
                            <Link className="cursor-pointer bg-primary text-white rounded-md py-2 px-4" to={"/sign-up"}>
                                Регистрация
                            </Link>
                        </div>
                    )}
                </div>
            </header>
            <div className="bg-white pt-2 border-b">
                <div className="_container">
                    <Tabs value={activateTab} onValueChange={handleTabChange}>
                        <TabsList className="border-0 bg-transparent p-0 gap-3">
                            <TabsTrigger
                                value="general"
                                className="w-27 p-0 pb-2 data-active:border-b-primary data-active:[&_p]:text-primary rounded-none bg-white shadow-none!"
                            >
                                <p className="">Общее</p>
                            </TabsTrigger>
                            <TabsTrigger
                                value="settings"
                                className="data-active:border-b-primary data-active:[&_p]:text-primary w-27 p-0 pb-2 rounded-none bg-white shadow-none!"
                            >
                                <p className="">Настройки</p>
                            </TabsTrigger>
                            <TabsTrigger
                                value="chat"
                                className="data-active:border-b-primary data-active:[&_p]:text-primary w-27 p-0 pb-2 rounded-none bg-white shadow-none!"
                            >
                                <p className="">Чат</p>
                            </TabsTrigger>
                            <TabsTrigger
                                value="tracker"
                                className="data-active:border-b-primary data-active:[&_p]:text-primary w-27 p-0 pb-2 rounded-none bg-white shadow-none!"
                            >
                                <p className="">Трекер задач</p>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="general">
                            <div className="mb-5 py-10 flex justify-between">
                                <div className="max-w-180">
                                    <div className="flex justify-between">
                                        <div className="mb-2 flex gap-2">
                                            <h2 className="text-4xl font-semibold">{projectData.title}</h2>
                                            <p className="opacity-60 text-sm">
                                                {parseProjectStatus(projectData.status)}
                                            </p>
                                        </div>
                                        {projectData.project_link && (
                                            <a
                                                href={projectData.project_link}
                                                className="cursor-pointer hover:opacity-80 duration-300"
                                            >
                                                <FaGithubSquare size={32} />
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 ml-2 mb-5 ">
                                        <div className="flex">
                                            {projectData.tags.map((tag) => (
                                                <div className="max-w-7 -ml-2" key={tag.name}>
                                                    <img src={tag.badge_url} className="w-full" alt="" />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-[17px] capitalize">{projectData.tags[0].name}</p>
                                    </div>
                                    <MarkdownReader content={markdown} />
                                    <div className="flex items-center gap-4 mb-3">
                                        {projectData.tags.map((tag) => (
                                            <ProjectDetailsTag key={tag.tag_id} tag={tag.name} />
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full max-w-100">
                                    <div className="mb-10">
                                        <p className="text-xl mb-4">Участники проекта:</p>
                                        <div className="flex-col gap-2">
                                            {participantsData?.map((participant) => (
                                                <div className="flex items-center border-b pb-3 max-w-80 gap-2 mb-3">
                                                    <Avatar className="w-11 h-11 relative">
                                                        <AvatarImage src={participant.avatar_url || ""} />
                                                        <AvatarFallback className="text-lg bg-[#dadada]">
                                                            {participant.nickname.slice(0, 2)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p>{participant.display_name || participant.nickname}</p>
                                                        <Link
                                                            to={`/profile/${participant.user_id}`}
                                                            className="text-[12px] opacity-50 hover:underline"
                                                        >
                                                            #{participant.nickname}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-10">
                                        <p className="text-xl mb-4">Сводная информация:</p>
                                        <ul>
                                            <li className="mb-2 flex items-center gap-2">
                                                <Heart className="opacity-70" size={18} />
                                                <div className="text-[16px] flex gap-3">
                                                    <span className="opacity-70">Лайков:</span>
                                                    <span className="text-primary font-bold">{projectData.likes}</span>
                                                </div>
                                            </li>
                                            <li className="mb-2 flex items-center gap-2">
                                                <UsersRound className="opacity-70" size={18} />
                                                <div className="text-[16px] flex gap-3">
                                                    <span className="opacity-70">Участников:</span>
                                                    <span className="text-primary font-bold">
                                                        {participantsData?.length}
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="mb-2 flex items-center gap-2">
                                                <MailQuestion className="opacity-70" size={18} />
                                                <div className="text-[16px] flex gap-3">
                                                    <span className="opacity-70">Вопросов:</span>
                                                    <span className="text-primary font-bold">
                                                        {projectQuestionsData?.length}
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-xl mb-4">Вопросы к проекту:</p>
                                        <ProjectQuestionsList />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="settings">
                            <div className="py-10">
                                <div className="flex justify-between flex-row-reverse max-w-250">
                                    <div className="w-full max-w-100 mb-10 flex flex-col">
                                        <div className="mb-7">
                                            <div className="mb-5">
                                                <div className="mb-5">
                                                    <Label className="text-[16px] mb-3 font-normal font-heading">
                                                        Название проекта:
                                                    </Label>
                                                    <Input
                                                        placeholder="Введите название проекта: "
                                                        value={projectName}
                                                        onChange={(e) => setProjectName(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-[16px] mb-3 font-normal font-heading">
                                                        Ссылка проекта:
                                                    </Label>
                                                    <Input
                                                        placeholder="Введите ссылку на репо проекта: "
                                                        value={link || ""}
                                                        onChange={(e) => setLink(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <Button onClick={handleUpdateProject}>Сохранить</Button>
                                        </div>
                                        <div className="flex gap-3 items-center mt-auto">
                                            <p className="text-[16px] font-heading">Статус проекта :</p>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="outline-0!">
                                                    <div className="cursor-pointer">
                                                        <p className="font-medium text-[16px] font-heading text-primary">
                                                            {parseProjectStatus(projectData?.status)}
                                                        </p>
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-full mt-4">
                                                    {projectStatusList?.map((status) => (
                                                        <DropdownMenuItem onClick={() => handleUpdateStatus(status)}>
                                                            <div className="flex gap-2 items-center rounded-sm p-2 cursor-pointer">
                                                                <p className="text-sm font-medium">{status}</p>
                                                            </div>
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
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
                                                    Добавьте своиих друзей в проект или удалите их если они больше не
                                                    приносят пользы
                                                </EmptyDescription>
                                            </EmptyHeader>
                                            <EmptyContent className="flex-row justify-center gap-2">
                                                <Button>
                                                    <Plus />
                                                    <Link to="/project/create">Добавить участников</Link>
                                                </Button>
                                            </EmptyContent>
                                            <Button variant="link" asChild className="text-muted-foreground" size="sm">
                                                <Link to="/">
                                                    Найти себе друзей <ArrowUpRightIcon />
                                                </Link>
                                            </Button>
                                        </Empty>
                                    </div>
                                </div>
                                <div className="max-w-250">
                                    <MarkdownEditor value={markdown} onChange={setMarkdown} />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};
