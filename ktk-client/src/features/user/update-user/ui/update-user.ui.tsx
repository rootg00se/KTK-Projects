import { useUpdateUser } from "../model/useUpdateUser";
import { Button, Input } from "@/shared/components";
import React, { useState } from "react";

interface IUpdateUserProps {
    displayName?: string;
    nickname: string;
}

export const UpdateUser: React.FC<IUpdateUserProps> = ({ displayName, nickname }) => {
    const [displayNameValue, setDisplayNameValue] = useState(displayName || "");
    const [nicknameValue, setNicknameValue] = useState(nickname);

    const { updateFunc } = useUpdateUser();

    const handleUpdateUser = () => {
        updateFunc({
            nickname: nicknameValue,
            displayName: displayNameValue,
        });
    };

    return (
        <div className="mr-2 flex flex-col gap-2 w-full max-w-60">
            <Input
                value={displayNameValue}
                onChange={(e) => setDisplayNameValue(e.target.value)}
                placeholder="Ваше имя"
                className="max-sm:text-sm"
            />
            <Input 
                value={nicknameValue}
                onChange={(e) => setNicknameValue(e.target.value)} 
                placeholder="Ваш никнейм" 
                className="max-sm:text-sm"
             />
            <Button className="max-w-30 max-sm:text-[13px]" onClick={handleUpdateUser}>Сохранить</Button>
        </div>
    );
};
