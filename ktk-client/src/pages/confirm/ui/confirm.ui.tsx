import { CheckCircle2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const ConfirmPage: React.FC = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="max-w-120 text-center rounded-sm border p-7 pb-8 border-[#989A99] mx-3 max-sm:p-4 max-sm:pb-6">
                <CheckCircle2 className="m-auto mb-5" size={70} />
                <div className="mb-5 text-2xl font-heading font-medium max-sm:text-xl">Электронная почта успешно активирована!</div>
                <p className="mb-7 max-sm:text-[16px]">
                    Ваш адрес электронной почты подтвержден, и ваша учетная запись теперь полностью активна. Добро
                    пожаловать! Теперь вы можете пользоваться всеми функциями нашего сервиса. Приятных открытий!
                </p>
                <Link className="bg-primary text-white rounded-md px-3 py-3 max-sm:text-[14px]" to="/">
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
};
