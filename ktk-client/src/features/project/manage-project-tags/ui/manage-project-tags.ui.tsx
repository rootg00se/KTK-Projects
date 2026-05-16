import { useTags } from "@/entities/tags";
import { Input, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import React, { useState } from "react";

interface IManageProjectTagsProps {
    projectTags: string[];
    onAdd: (tagName: string) => void;
    onRemove: (tagName: string) => void;
}

export const ManageProjectTags: React.FC<IManageProjectTagsProps> = ({ projectTags, onAdd, onRemove }) => {
    const [showTagsData, setShowTagsData] = useState(false);
    const { tagsData } = useTags();

    if (!tagsData) return null;

    return (
        <div className="max-w-150">
            <Popover open={showTagsData} onOpenChange={setShowTagsData}>
                <PopoverTrigger asChild>
                    <div className="">
                        <Input
                            onFocus={() => setShowTagsData(true)}
                            onBlur={() => setShowTagsData(false)}
                            placeholder="Искать теги..."
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-150">
                    <div className="grid grid-cols-3 gap-3">
                        {projectTags.length != tagsData.length ? (
                            tagsData
                                .filter((tag) => !projectTags.find((tagName) => tag.name === tagName))
                                .map((tag) => (
                                    <p
                                        onClick={() => onAdd(tag.name)}
                                        className="cursor-pointer hover:opacity-100 transition-opacity inline opacity-50"
                                    >
                                        #{tag.name}
                                    </p>
                                ))
                        ) : (
                            <p className="opacity-50">Больше тегов нет</p>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-2 text-sm mt-4">
                {projectTags &&
                    projectTags.map((tag) => (
                        <p
                            onClick={() => onRemove(tag)}
                            className="cursor-pointer hover:opacity-100 transition-opacity font-heading opacity-50 lowercase"
                        >
                            #{tag}
                        </p>
                    ))}
            </div>
        </div>
    );
};
