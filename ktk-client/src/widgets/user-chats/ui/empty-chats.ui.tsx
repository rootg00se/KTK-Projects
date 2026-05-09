import React from "react";

export const EmptyChats: React.FC = () => {
    return (
        <div className="border-r p-5 overflow-y-auto w-80 flex items-center justify-center">
            <p className="opacity-50 font-heading font-medium text-xl">У вас пока нету чатов</p>
        </div>
    );
};
