import { Input } from "@/shared/components";
import React, { useState } from "react";
import { useUpdateTask } from "../model/useUpdateTask";

interface IUpdateTaskProps {
    initialText: string;
    taskId: string;
    trackerId: string;
}

export const UpdateTask: React.FC<IUpdateTaskProps> = ({ initialText, taskId, trackerId }) => {
    const [text, setText] = useState(initialText);
    const [editMode, setEditMode] = useState(false);

    const { updateFunc } = useUpdateTask(trackerId);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            updateFunc({
                taskId,
                text,
            });

            setEditMode(false);
        }

        if (event.key === "Escape") setEditMode(false);
    };

    return (
        <div>
            {editMode ? (
                <Input
                    autoFocus
                    defaultValue={initialText}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Распишите задачу и нажмите enter"
                    onKeyDown={handleKeyDown}
                    onBlur={() => setEditMode(false)}
                    className="max-sm:text-sm"
                />
            ) : (
                <p onClick={() => setEditMode(true)} className="opacity-80 cursor-pointer">
                    {initialText}
                </p>
            )}
        </div>
    );
};
