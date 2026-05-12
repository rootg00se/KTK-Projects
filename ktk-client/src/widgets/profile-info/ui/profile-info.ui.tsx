import React, { useEffect, useState } from "react";
import { Button } from "@/shared/components";
import { selectUserId, useFriends, useProfile } from "@/entities/user";
import { useUpdateProfile } from "@/features/user/update-profile";
import { useParams } from "react-router-dom";
import { LogoutButton } from "@/features/auth/logout-button";
import { UpdateAvatar } from "@/features/user/update-avatar";
import { UpdateBanner } from "@/features/user/update-banner";
import { MarkdownReader } from "@/features/editor/markdown-reader";
import { SkillList } from "@/features/user/skill-list";
import { UpdateUser } from "@/features/user/update-user";
import { MarkdownEditor } from "@/features/editor/markdown-editor";
import { useFetchMarkdown } from "@/features/editor/markdown-reader/model/useFetchMarkdown";
import { ToggleFriendship } from "@/features/user/toggle-friendship";
import { CreatePrivateChat } from "@/features/chat/create-private-chat";
import { UserBadge } from "./user-badge.ui";
import { ProfileLinks } from "./profile-links.ui";

export const ProfileInfo: React.FC = () => {
    const [editMode, setEditMode] = useState(false);
    const [markdown, setMarkdown] = useState("");

    const userId = selectUserId();

    const { id } = useParams();
    const { userProfileData } = useProfile(id || "");
    const { updateProfileFunc } = useUpdateProfile();
    const { userFriendsData } = useFriends(userId);

    const authUserId = selectUserId();
    const markdownContent = useFetchMarkdown(userProfileData?.profile_data);

    useEffect(() => {
        if (markdownContent) {
            setMarkdown(markdownContent);
        } else {
            setMarkdown("");
        }
    }, [markdownContent]);

    const toggleEditMode = () => {
        setEditMode(() => !editMode);
    };

    const handleUpadteProfile = (text: string) => {
        updateProfileFunc({
            content: text,
        });
    };

    const isFriend = !!userFriendsData?.some((friend) => friend.user_id === id);

    if (!userProfileData) return null;

    return (
        <div className="bg-white rounded-md">
            <UpdateBanner editable={editMode} bannerUrl={userProfileData.banner_url} />
            <div className="flex items-start justify-between px-5 pt-5 max-xs:px-3 max-sm:flex-col">
                <div className="w-full -mt-20 z-30 max-sm:-mt-15">
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
                            <UserBadge
                                displayName={userProfileData.display_name}
                                nickname={userProfileData.nickname}
                                email={userProfileData.email}
                            />
                        )}
                        <div className="">{authUserId && authUserId === id && <LogoutButton />}</div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-end max-sm:items-start max-sm:mt-4">
                    {authUserId === id ? (
                        <Button
                            onClick={toggleEditMode}
                            className="mb-4 w-full max-w-40"
                            variant={editMode ? "secondary" : "default"}
                        >
                            {editMode ? "Отмена" : "Редактировать"}
                        </Button>
                    ) : (
                        <>
                            <ToggleFriendship
                                className="mb-2 text-[13px] w-full max-w-40"
                                targetUserId={id!}
                                isFriend={isFriend}
                            />
                            <CreatePrivateChat userId={id!} />
                        </>
                    )}
                    <SkillList editable={editMode} skills={userProfileData.skills} />
                </div>
            </div>
            <ProfileLinks projectsCount={userProfileData.projectsCount} friendsCount={userProfileData.friendCount} />
            <div className="p-5 max-xs:p-2">
                {editMode ? (
                    <MarkdownEditor onSave={handleUpadteProfile} value={markdown} onChange={setMarkdown} />
                ) : markdown ? (
                    <MarkdownReader content={markdown} />
                ) : (
                    <p className="text-center font-bold text-xl opacity-40 pb-3 mt-2 max-md:text-lg">Ничего не написано</p>
                )}
            </div>
        </div>
    );
};
