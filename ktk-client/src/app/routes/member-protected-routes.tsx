import { useProjectById } from "@/entities/project";
import { selectUserId } from "@/entities/user";
import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

export const MemberProtectedRoutes: React.FC = () => {
    const { id } = useParams();
    const userId = selectUserId();

    const { projectData, isProjectPending, isProjectError } = useProjectById(id);

    if (isProjectPending) return null;
    if (isProjectError) return <Navigate to="/" replace />;

    const isCreator = projectData?.creator_id === userId;
    const isMember = projectData?.project_members?.some((m) => m.user_id === userId);

    if (!isCreator && !isMember) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
