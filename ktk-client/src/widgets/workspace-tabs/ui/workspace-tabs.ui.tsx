import { TabsList, TabsTrigger } from "@/shared/components";
import React from "react";

export const WorkspaceTabs: React.FC = () => {
    return (
        <div className="_container w-full">
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
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
            </div>
        </div>
    );
};
