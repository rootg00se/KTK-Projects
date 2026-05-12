import { ChangeProjectStatus } from "@/features/project/change-project-status";
import { DeleteProject } from "@/features/project/delete-project";
import { ManageParticipants } from "@/features/project/manage-participants";
import { MarkdownEditor } from "@/features/editor/markdown-editor";
import { UpdateProject } from "@/features/project/update-project";
import React from "react";
import { useWorkspaceSettings } from "../model/useWorkspaceSettings";
import type { IUserResponse } from "@/entities/user";

export const WorkspaceSettings: React.FC = () => {
    const {
        userData,
        userFriendsData,
        participantsData,
        markdown,
        setMarkdown,
        handleSaveContent,
        handleAddMember,
        handleRemoveMember,
    } = useWorkspaceSettings();

    if (!userData) return null;
    if (!userFriendsData) return null;
    if (!participantsData) return null;

    return (
        <div className="_container">
            <div className="py-10">
                <div className="flex justify-between gap-4 max-md:flex-col flex-row-reverse max-w-250">
                    <div className="w-full max-w-100 mb-10 flex flex-col">
                        <UpdateProject />
                        <div className="flex gap-3 items-center mt-auto">
                            <p className="text-[16px] font-heading">Статус проекта :</p>
                            <ChangeProjectStatus />
                        </div>
                    </div>
                    <ManageParticipants
                        members={participantsData as IUserResponse[]}
                        currentUserId={userData.user_id}
                        friends={userFriendsData}
                        onAdd={handleAddMember}
                        onRemove={handleRemoveMember}
                    />
                </div>
                <div className="max-w-250 mb-10">
                    <MarkdownEditor onSave={handleSaveContent} value={markdown} onChange={setMarkdown} />
                </div>
                <div>
                    <p className="font-heading font-medium mb-3">Внимание, снизу опасная кнопка!</p>
                    <DeleteProject />
                </div>
            </div>
        </div>
    );
};
