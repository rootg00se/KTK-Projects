import React from "react";

interface ITaskProps {
    contentSlot: React.ReactNode;
    statusSlot: React.ReactNode;
    menuSlot: React.ReactNode;
}

export const Task: React.FC<ITaskProps> = ({ contentSlot, statusSlot, menuSlot }) => {
    return (
        <div className="px-3 py-3 rounded-lg border bg-white shadow-sm group">
            <p className="mb-4 text-[14px]">{contentSlot}</p>
            <div className="flex items-center justify-between">
                {statusSlot}
                <div className="opacity-0 group-hover:opacity-100 transition-all cursor-pointer max-md:opacity-100">{menuSlot}</div>
            </div>
        </div>
    );
};
