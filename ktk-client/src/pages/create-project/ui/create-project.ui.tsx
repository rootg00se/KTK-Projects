import { useTags } from "@/entities/tags";
import { useFriends, useUser } from "@/entities/user";
import { ManageProjectTags } from "@/features/project/manage-project-tags";
import { MarkdownEditor } from "@/features/editor/markdown-editor";
import { Button } from "@/shared/components";
import React from "react";
import { ProjectInfoField } from "./project-info-field.ui";
import { ManageParticipants } from "@/features/project/manage-participants";
import { useCreateProjectForm } from "../model/useCreateProjectForm";

export const CreateProjectPage: React.FC = () => {
    const { state, actions } = useCreateProjectForm();

    const { userData } = useUser();
    const { tagsData } = useTags();
    const { userFriendsData } = useFriends(userData?.user_id);

    if (!userData || !userFriendsData || !tagsData) return null;

    return (
        <div className="w-full">
            <div className="mb-8">
                <p className="font-heading mb-5 text-lg">Основная информация:</p>
                <div className="w-full max-w-120">
                    <ProjectInfoField
                        label="Название проекта"
                        className="mb-4"
                        value={state.title}
                        setValue={actions.setTitle}
                        required
                    />
                    <ProjectInfoField
                        label="Ссылка на проект"
                        value={state.projectLink}
                        setValue={actions.setProjectLink}
                    />
                </div>
            </div>
            <div className="mb-8">
                <p className="font-heading mb-5 text-lg">Добавьте участников в проект:</p>
                <ManageParticipants
                    currentUserId={userData.user_id}
                    friends={userFriendsData}
                    members={[...state.members, userData]}
                    onAdd={actions.handleAddMember}
                    onRemove={actions.handleRemoveMember}
                    description="Добавьте пользователей, которые есть у вас в друзья в работу над этим проектом."
                />
            </div>
            <div className="mb-8">
                <p className="font-heading mb-5 text-lg">Теги проекта:</p>
                <ManageProjectTags
                    projectTags={state.projectTags}
                    onAdd={actions.handleAddTag}
                    onRemove={actions.handleRemoveTag}
                />
            </div>
            <div className="mb-8">
                <p className="font-heading mb-5 text-lg">Подробная информация об проекте:</p>
                <div className="max-w-190">
                    <MarkdownEditor value={state.markdown} onChange={actions.setMarkdown} />
                </div>
            </div>
            <Button onClick={actions.submit}>Создать проект</Button>
        </div>
    );
};
