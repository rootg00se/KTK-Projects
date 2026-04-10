import React, { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui";
import { selectUserId, useProfile } from "@/entities/user";
import { useParams } from "react-router-dom";
import { LogoutButton } from "@/features/logout-button";
import { UpdateAvatar } from "@/features/update-avatar";
import { UpdateBanner } from "@/features/update-banner";
import { MarkdownReader } from "@/features/markdown-reader";
import { SkillList } from "@/features/skill-list";
import { UpdateUser } from "@/features/update-user";
import { MarkdownEditor } from "@/features/markdown-editor";
import { useFetchMarkdown } from "@/features/markdown-reader/model/useFetchMarkdown";

export const ProfileInfo: React.FC = () => {
    const [editMode, setEditMode] = useState(false);
    const [markdown, setMarkdown] = useState("");

    const { id } = useParams();
    const { userProfileData } = useProfile(id || "");

    const authUserId = selectUserId();
    const markdownContent = useFetchMarkdown(userProfileData?.profile_data);

    useEffect(() => {
        if (markdownContent) {
            setMarkdown(markdownContent);
        }
    }, [markdownContent]);

    const toggleEditMode = () => {
        setEditMode(() => !editMode);
    };

    if (!userProfileData) return null;

    return (
        <div className="bg-white rounded-md">
            <UpdateBanner editable={editMode} bannerUrl={userProfileData.banner_url} />
            <div className="flex items-start justify-between px-5 pt-5">
                <div className="w-full -mt-20 z-30">
                    <UpdateAvatar
                        editable={editMode}
                        avatarUrl={userProfileData.avatar_url}
                        displayName={userProfileData.display_name || userProfileData.nickname}
                    />
                    <div className="flex items-start">
                        {editMode ? (
                            <UpdateUser
                                nickname={userProfileData.nickname}
                                displayName={userProfileData.display_name}
                            />
                        ) : (
                            <div className="mb-5">
                                <p className="text-3xl font-medium mr-2">
                                    {userProfileData.display_name || userProfileData.nickname}
                                </p>
                                <p className="text-sm font-medium">#{userProfileData.nickname}</p>
                                <p className="text-sm opacity-50">{userProfileData.email}</p>
                            </div>
                        )}
                        <div className="">{authUserId && authUserId === id && <LogoutButton />}</div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-end">
                    {(authUserId && authUserId) === id && (
                        <Button
                            onClick={toggleEditMode}
                            className="mb-4 w-full max-w-40"
                            variant={editMode ? "secondary" : "default"}
                        >
                            {editMode ? "Отмена" : "Редактировать"}
                        </Button>
                    )}
                    <SkillList editable={editMode} skills={userProfileData.skills} />
                </div>
            </div>
            <div className="p-5">
                {editMode ? (
                    <MarkdownEditor value={markdown} onChange={setMarkdown} />
                ) : (
                    <MarkdownReader content={markdown} />
                )}
            </div>
        </div>
    );
};
