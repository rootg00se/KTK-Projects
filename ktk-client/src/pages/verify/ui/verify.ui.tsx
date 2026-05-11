import { Mail } from "lucide-react";
import React from "react";

export const VerifyPage: React.FC = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="max-w-120 text-center rounded-sm border p-7 border-[#989A99] mx-3 max-sm:p-4">
                <Mail className="m-auto mb-5" size={80} />
                <div className="mb-5 text-2xl font-heading font-medium max-sm:text-xl">
                    Мы отправили ссылку для активации на вашу электронную почту.
                </div>
                <p className="mb-7 max-sm:text-[15px]">
                    Мы отправили вам подтверждающее письмо на электронную почту. Перейдите по ссылке внутри, чтобы
                    подтвердить свой адрес и завершить регистрацию. Не можете найти письмо? Проверьте папку «Спам».
                </p>
            </div>
        </div>
    );
};
