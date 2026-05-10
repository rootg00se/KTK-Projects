import React from "react";
import {
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/shared/components";
import { IconFolderCode } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const CreateProject: React.FC = () => {
    return (
        <Empty className="border-2 mb-5 max-h-40 flex flex-row items-end px-4 py-4">
            <EmptyHeader className="text-left items-start gap-1">
                <EmptyMedia variant="icon">
                    <IconFolderCode />
                </EmptyMedia>
                <EmptyTitle>Создайте новый проект</EmptyTitle>
                <EmptyDescription>Создайте новый проект или присоеденитесь к уже существующему</EmptyDescription>
            </EmptyHeader>
            <div className="">
                <EmptyContent className="flex-row justify-start items-start gap-2">
                    <Button>
                        <Link to="/project/create">Создать проект</Link>
                    </Button>
                    <Button variant="outline">
                        <Link to="/">Найти проект</Link>
                    </Button>
                </EmptyContent>
            </div>
        </Empty>
    );
};
