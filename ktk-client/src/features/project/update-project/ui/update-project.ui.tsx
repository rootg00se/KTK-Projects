import { useProjectById } from "@/entities/project";
import { useUpdateProject } from "../model/useUpdateProject";
import { Button, Input, Label } from "@/shared/components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const UpdateProject: React.FC = () => {
    const [projectName, setProjectName] = useState("");
    const [link, setLink] = useState("");

    const { id: projectId } = useParams();

    const { updateFunc } = useUpdateProject();
    const { projectData } = useProjectById(projectId);

    const handleUpdateProject = () => {
        if (!projectId) return toast.error("Что-то пошло не так");

        updateFunc({
            projectId,
            title: projectName,
            projectLink: link,
        });
    };

    useEffect(() => {
        if (projectData) {
            setProjectName(projectData.title || "");
            setLink(projectData.project_link || "");
        }
    }, [projectData]);

    if (!projectId) return null;

    return (
        <div className="mb-7">
            <div className="mb-5">
                <div className="mb-5">
                    <Label className="text-[16px] mb-3 font-normal font-heading">Название проекта:</Label>
                    <Input
                        className="max-xs:text-sm"
                        placeholder="Введите название проекта: "
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>
                <div>
                    <Label className="text-[16px] mb-3 font-normal font-heading">Ссылка проекта:</Label>
                    <Input
                        className="max-xs:text-sm"
                        placeholder="Введите ссылку на репо проекта: "
                        value={link || ""}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
            </div>
            <Button onClick={handleUpdateProject}>Сохранить</Button>
        </div>
    );
};
