import { useDeleteAvatar } from "../model/useDeleteAvatar";
import { useUpdateAvatar } from "../model/useUpdateAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components";
import { File, Trash } from "lucide-react";
import React, { useRef, type ChangeEvent } from "react";

interface IUpdateAvatarProps {
    editable: boolean;
    avatarUrl: string | null;
    displayName: string;
}

export const UpdateAvatar: React.FC<IUpdateAvatarProps> = ({ editable, avatarUrl, displayName }) => {
    const { updateAvatarFunc } = useUpdateAvatar();
    const { deleteAvatarFunc } = useDeleteAvatar();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const selectFile = () => fileInputRef.current?.click();

    const handleUpdateAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            const formData = new FormData();
            formData.append("avatar", file);

            updateAvatarFunc(formData);
        }
    };

    return (
        <div>
            <Avatar className="w-30 h-30 max-sm:w-23 max-sm:h-23 mb-3 relative border-2">
               <AvatarImage src={avatarUrl || ""} />
                <AvatarFallback className="text-4xl bg-[#dadada]">{displayName.slice(0, 2)}</AvatarFallback>
                {editable &&
                    (avatarUrl ? (
                        <div
                            className="absolute z-20 w-full h-full rounded-full bg-[#000000bb] flex items-center justify-center"
                            onClick={() => deleteAvatarFunc()}
                        >
                            <Trash className="text-white" size={40} />
                        </div>
                    ) : (
                        <div
                            className="absolute z-20 w-full h-full rounded-full bg-[#000000bb] flex items-center justify-center"
                            onClick={selectFile}
                        >
                            <File className="text-white" size={40} />
                        </div>
                    ))}
            </Avatar>
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleUpdateAvatar(e)}
                className="hidden"
                name="avatar"
            />
        </div>
    );
};
