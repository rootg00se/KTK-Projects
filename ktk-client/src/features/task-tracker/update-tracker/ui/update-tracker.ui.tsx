import { Input } from "@/shared/components";
import React, { useState } from "react";
import { useUpdateTracker } from "../model/useUpdateTracker";

interface IUpdateTrackerProps {
    name: string;
    projectId: string;
    trackerId: string;
}

export const UpdateTracker: React.FC<IUpdateTrackerProps> = ({ name, projectId, trackerId }) => {
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(name);

    const { updateFunc } = useUpdateTracker(projectId);

    const handleUpdateTracker = () => {
        updateFunc({
            trackerId,
            name: newName
        });

        setEditMode(false);
    }

    return (
        <div className="w-full h-8 flex items-center">
            {editMode ? (
                <Input
                    autoFocus={true}
                    onChange={(e) => setNewName(e.target.value)}
                    value={newName}
                    className="w-full"
                    placeholder="Enter name"
                    onKeyDown={(e) => e.key === "Enter" && handleUpdateTracker()}
                    onBlur={() => setEditMode(false)}
                />
            ) : (
                <p onClick={() => setEditMode(true)} className="w-full cursor-pointer font-heading text-[15px]">
                    {name}
                </p>
            )}
        </div>
    );
};
