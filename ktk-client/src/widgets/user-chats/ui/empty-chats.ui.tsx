import React from "react";

export const EmptyChats: React.FC = () => {
    return (
        <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto p-5">
            <p className="text-center font-heading text-lg font-medium text-muted-foreground md:text-xl">
                У вас пока нет чатов
            </p>
        </div>
    );
};
