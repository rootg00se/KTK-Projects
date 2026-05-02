import { useDeleteBanner } from "../model/useDeleteBanner";
import { useUpdateBanner } from "../model/useUpdateBanner";
import { File, Trash } from "lucide-react";
import React, { useRef, type ChangeEvent } from "react";
import defaultBanner from "/auth-background.jpg";

interface IUpdateBannerProps {
    editable: boolean;
    bannerUrl: string | null;
}

export const UpdateBanner: React.FC<IUpdateBannerProps> = ({ editable, bannerUrl }) => {
    const { updateBannerFunc } = useUpdateBanner();
    const { deleteBannerFunc } = useDeleteBanner();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const selectFile = () => fileInputRef.current?.click();

    const handleUpdateBanner = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            const formData = new FormData();
            formData.append("banner", file);

            updateBannerFunc(formData);
        }
    };

    return (
        <div>
            <div className="w-full max-h-40 rounded-md overflow-hidden relative flex items-center">
                <img src={bannerUrl || defaultBanner} className="rounded-md w-full" alt="" />
                {editable &&
                    (bannerUrl ? (
                        <div
                            className="absolute top-0 left-0 z-20 w-full h-full bg-[#000000bb] flex items-center justify-center"
                            onClick={() => deleteBannerFunc()}
                        >
                            <Trash className="text-white" size={40} />
                        </div>
                    ) : (
                        <div
                            className="absolute z-20 top-0 left-0 w-full h-full bg-[#000000bb] flex items-center justify-center"
                            onClick={selectFile}
                        >
                            <File className="text-white" size={40} />
                        </div>
                    ))}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleUpdateBanner(e)}
                className="hidden"
                name="banner"
                accept=".png, .jpg, .jpeg, .svg, .webp, .gif"
            />
        </div>
    );
};
