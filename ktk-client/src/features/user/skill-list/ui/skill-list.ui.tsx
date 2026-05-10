import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/shared/components";
import type { Skill } from "@/entities/user";
import { SkillListPopover } from "./skill-list-popover.ui";

interface ISkillListProps {
    skills: Skill[];
    editable: boolean;
}

export const SkillList: React.FC<ISkillListProps> = ({ skills, editable }) => {
    return (
        <div className="flex items-center">
            {editable && <SkillListPopover userSkills={skills} />}
            {skills.map((skill) => (
                <Tooltip>
                    <TooltipTrigger className="max-w-8 not-last:-mr-2">
                        <img className="w-full" src={skill.badge_url} alt="" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{skill.name}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    );
};
