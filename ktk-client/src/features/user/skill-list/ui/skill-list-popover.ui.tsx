import React, { useState } from "react";
import { Button, Input, Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/shared/components";
import { PlusCircleIcon, X } from "lucide-react";
import { useSkills } from "@/entities/skill";
import { type Skill } from "@/entities/user";
import { useUpdateSkills } from "../model/useUpdateSkills";

export const SkillListPopover: React.FC<{ userSkills: Skill[] }> = ({ userSkills }) => {
    const [query, setQuery] = useState("");
    const [currentSkills, setCurrentSkills] = useState(userSkills);

    const { skillsData } = useSkills(query);
    const { updateSkillsFunc } = useUpdateSkills();

    const handleRemoveSkill = (skill: Skill) => {
        setCurrentSkills((prev) => prev.filter((el) => el.skill_id !== skill.skill_id));
    };

    const handleAddSkill = (skill: Skill) => {
        setCurrentSkills((prev) => [...prev, skill]);
    };

    const handleUpddateSkills = () => {
        updateSkillsFunc({
            skillsToAddIds: currentSkills
                .filter((currentSkill) => userSkills.find((skill) => skill.name !== currentSkill.name))
                .map((el) => el.skill_id),

            skillsToRemoveIds: userSkills
                .filter((userSkill) => !currentSkills.find((skill) => skill.name === userSkill.name))
                .map((el) => el.skill_id),
        });
    };

    return (
        <Popover>
            <PopoverTrigger>
                <div className="cursor-pointer mr-2 opacity-80">
                    <PlusCircleIcon />
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Добавить скиллы..." />
                </PopoverHeader>
                <div className="flex flex-wrap items-center gap-3">
                    {skillsData
                        ?.filter((el) => !currentSkills.find((skill) => skill.name === el.name))
                        .slice(0, 9)
                        .map((skill) => (
                            <div
                                key={skill.skill_id}
                                onClick={() => handleAddSkill(skill)}
                                className="cursor-pointer hover:opacity-80 flex-1/4 flex flex-col text-center items-center"
                            >
                                <div className="max-w-8 my-auto">
                                    <img className="w-full text-center" src={skill.badge_url} alt="" />
                                </div>
                                <p className="text-[12px] inline-block">{skill.name}</p>
                            </div>
                        ))}
                </div>
                <div className="mt-3 mb-2">
                    <p className="mb-2">Убрать скиллы</p>
                    <div className="flex flex-wrap gap-3">
                        {currentSkills.map((skill) => (
                            <div
                                key={skill.skill_id}
                                onClick={() => handleRemoveSkill(skill)}
                                className="max-w-8 relative group cursor-pointer"
                            >
                                <img className="w-full" src={skill.badge_url} alt="" />
                                <div className="absolute hidden w-full h-full group-hover:flex bg-[#00000093] top-0 left-0 rounded-[8px] items-center justify-center">
                                    <X color="white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Button onClick={handleUpddateSkills}>Сохранить</Button>
            </PopoverContent>
        </Popover>
    );
};
