import { useTags } from "@/entities/tags";
import { TagFilter } from "@/features/project/tag-filter";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useState } from "react";

export const SidebarTags: React.FC = () => {
    const [moreTags, setMoreTags] = useState(false);
    const { tagsData } = useTags();

    const toggleTags = () => {
        setMoreTags(() => !moreTags);
    };

    return (
        <div className="pt-3 pb-4">
            <p className="mb-4 opacity-55">Теги проектов:</p>
            <div className={`mb-4 ${moreTags ? "max-h-120 overflow-y-auto scrollbar" : ""}`}>
                {tagsData?.slice(0, moreTags ? tagsData.length : 13).map((el) => (
                    <TagFilter badge_url={el.badge_url} tag={el.name} key={el.tag_id} />
                ))}
            </div>
            <div className="flex items-center justify-between cursor-pointer" onClick={toggleTags}>
                <p className="opacity-55">{moreTags ? "Меньше тегов:" : "Больше тегов:"}</p>
                {moreTags ? <ArrowUp size={16} className="opacity-55" /> : <ArrowDown size={16} className="opacity-55" />}
            </div>
        </div>
    );
};
