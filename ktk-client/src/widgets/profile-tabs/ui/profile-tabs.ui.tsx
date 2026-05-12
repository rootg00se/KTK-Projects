import { selectUserId } from "@/entities/user";
import { TabsList, TabsTrigger } from "@/shared/components";
import React from "react";
import { useParams } from "react-router-dom";

export const ProfileTabs: React.FC = () => {
    const userId = selectUserId();
    const { id } = useParams();

    return (
        <TabsList className="bg-white rounded-md p-1 py-5 flex items-center justify-start mt-3 w-full">
            <TabsTrigger value="projects" className="flex h-auto items-center gap-3 px-3 rounded-md text-foreground max-w-40">
                <span>‼️</span>
                <p className="text-sm opacity-80 max-xs:text-[12px]">{userId === id ? "Мои проекты" : "Проекта юзера"}</p>
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex h-auto items-center gap-3 px-3 rounded-md text-foreground max-w-40">
                <span>❓</span>
                <p className="text-sm opacity-80 max-xs:text-[12px]">{userId === id ? "Мои вопросы" : "Вопросы юзера"}</p>
            </TabsTrigger>
        </TabsList>
    );
};
