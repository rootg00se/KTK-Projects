import { useProjectById, useUpdateContent } from "@/entities/project";
import { ChangeProjectStatus } from "@/features/change-project-status";
import { DeleteProject } from "@/features/delete-project";
import { MarkdownEditor } from "@/features/markdown-editor";
import { useFetchMarkdown } from "@/features/markdown-reader/model/useFetchMarkdown";
import { UpdateParticipants } from "@/features/update-participants";
import { UpdateProject } from "@/features/update-project";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const WorkspaceSettings: React.FC = () => {
    const [markdown, setMarkdown] = useState("");

    const { id: projectId } = useParams();

    const { updateContentFunc } = useUpdateContent();
    const { projectData } = useProjectById(projectId);

    const markdownContent = useFetchMarkdown(projectData?.content_url);

    const handleUpdateContent = (text: string) => {
        if (!projectId) return toast.error("Что-то пошло не так");

        updateContentFunc({
            content: text,
            projectId,
        });
    };

    useEffect(() => {
        if (markdownContent) {
            setMarkdown(markdownContent);
        } else {
            setMarkdown("");
        }
    }, [markdownContent]);

    return (
        <div className="py-10">
            <div className="flex justify-between flex-row-reverse max-w-250">
                <div className="w-full max-w-100 mb-10 flex flex-col">
                    <UpdateProject />
                    <div className="flex gap-3 items-center mt-auto">
                        <p className="text-[16px] font-heading">Статус проекта :</p>
                        <ChangeProjectStatus />
                    </div>
                </div>
                <UpdateParticipants />
            </div>
            <div className="max-w-250 mb-10">
                <MarkdownEditor onSave={handleUpdateContent} value={markdown} onChange={setMarkdown} />
            </div>
            <div>
                <p className="font-heading font-medium mb-3">Внимание, снизу опасная кнопка!</p>
                <DeleteProject />
            </div>
        </div>
    );
};
