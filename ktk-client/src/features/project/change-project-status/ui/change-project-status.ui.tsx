import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components";
import { parseProjectStatus, parseTextToProjectState, projectStatusList } from "@/shared/utils/parse-project-status";
import { useProjectById } from "@/entities/project";
import { useUpdateStatus } from "../model/useUpdateStatus";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const ChangeProjectStatus: React.FC = () => {
    const { id: projectId } = useParams();

    const { updateStatusFunc } = useUpdateStatus();
    const { projectData } = useProjectById(projectId);

    const handleUpdateStatus = (status: string) => {
        if (!projectId) return toast.error("Что-то пошло не так");

        updateStatusFunc({
            projectId,
            status: parseTextToProjectState(status)!,
        });
    };

    if (!projectData) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-0!">
                <div className="cursor-pointer">
                    <p className="font-medium text-[16px] font-heading text-primary">
                        {parseProjectStatus(projectData.status)}
                    </p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full mt-4">
                {projectStatusList.map((status) => (
                    <DropdownMenuItem onClick={() => handleUpdateStatus(status)}>
                        <div className="flex gap-2 items-center rounded-sm p-2 cursor-pointer">
                            <p className="text-sm font-medium">{status}</p>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
