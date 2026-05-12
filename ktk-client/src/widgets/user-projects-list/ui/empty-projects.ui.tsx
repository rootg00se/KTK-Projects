import React from "react";
import { IconFolderCode } from "@tabler/icons-react";
import { ArrowUpRightIcon } from "lucide-react";
import {
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/shared/components";
import { Link } from "react-router-dom";

export const EmtpyProjects: React.FC = () => {
    return (
        <Empty className="border-2">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconFolderCode />
                </EmptyMedia>
                <EmptyTitle>У вас еще нет проектов</EmptyTitle>
                <EmptyDescription>
                    Вы пока еще не создали ни один проект. Начните свой путь создав первый проект на ktk projects.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2 max-sm:flex-col max-w-none">
                <Button>
                    <Link to="/project/create">Создать проект</Link>
                </Button>
                <Button variant="outline">
                    <Link to="/">Найти проект</Link>
                </Button>
            </EmptyContent>
            <Button variant="link" asChild className="text-muted-foreground" size="sm">
                <Link to="/">
                    Страница проектов <ArrowUpRightIcon />
                </Link>
            </Button>
        </Empty>
    );
};