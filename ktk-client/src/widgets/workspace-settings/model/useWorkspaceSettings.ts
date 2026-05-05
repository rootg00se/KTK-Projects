import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useProjectById, useParticipants } from "@/entities/project";
import { useAddParticipant, useDeleteParticipant, useUpdateContent } from "@/features/project/manage-participants";
import { useUser, useFriends } from "@/entities/user";
import { useFetchMarkdown } from "@/features/editor/markdown-reader/model/useFetchMarkdown";

export const useWorkspaceSettings = () => {
    const { id: projectId } = useParams<{ id: string }>();
    const [markdown, setMarkdown] = useState("");

    const { userData } = useUser();
    const { userFriendsData } = useFriends(userData?.user_id);
    const { projectData } = useProjectById(projectId);
    const { participantsData } = useParticipants(projectId);
    
    const markdownContent = useFetchMarkdown(projectData?.content_url);
    
    const { updateContentFunc } = useUpdateContent();
    const { addParticipantFunc } = useAddParticipant();
    const { deleteParticipantFunc } = useDeleteParticipant();

    useEffect(() => {
        setMarkdown(markdownContent || "");
    }, [markdownContent]);

    const handleSaveContent = (text: string) => {
        if (!projectId) return toast.error("Проект не найден");
        updateContentFunc({ content: text, projectId });
    };

    const handleAddMember = (user: any) => {
        if (!projectId) return;
        addParticipantFunc({ projectId, userId: user.user_id });
    };

    const handleRemoveMember = (userId: string) => {
        if (!projectId) return;
        deleteParticipantFunc({ projectId, userId });
    };

    return {
        projectId,
        userData,
        userFriendsData,
        participantsData,
        markdown,
        setMarkdown,
        handleSaveContent,
        handleAddMember,
        handleRemoveMember,
        isLoading: !projectData || !userData
    };
};