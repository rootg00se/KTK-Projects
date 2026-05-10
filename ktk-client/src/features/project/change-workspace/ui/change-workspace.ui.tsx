import React from "react";
import { LayoutTemplate } from "lucide-react";
import { useProjectById, useUserProjects } from "@/entities/project";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/entities/user";

export const ChangeWorkspace: React.FC = () => {
    const { id: projectId } = useParams();
    const { userData } = useUser();

    const navigate = useNavigate();

    const { userProjectsData } = useUserProjects(userData?.user_id);
    const { projectData } = useProjectById(projectId);

    if (!userData) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-0!">
                <div className="flex items-center gap-2 border-2 rounded-sm p-2 cursor-pointer">
                    <LayoutTemplate size={16} />
                    <p className="text-sm font-medium">{projectData?.title}</p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full mt-4">
                {userProjectsData?.map((project) => (
                    <DropdownMenuItem onClick={() => navigate(`/workspace/${project.project_id}?tab=general`)}>
                        <div className="flex gap-2 items-center rounded-sm p-2 cursor-pointer">
                            <LayoutTemplate size={16} />
                            <p className="text-sm font-medium">{project.title}</p>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
