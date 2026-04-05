import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
    return (
        <div className="flex w-screen h-screen items-center justify-center flex-col">
            <h1 className="text-9xl font-bold mb-5">404</h1>
            <p className="mb-3 text-2xl max-w-150 italic max-sm:text-xl">ой... Здесь ничего нету!</p>
            <p className="max-w-100 text-center mb-5">Возможно страницы, которую вы искали не существует</p>
            <Link to="/" className="cursor-pointer text-md text-primary hover:underline">
                Вернуться на главную
            </Link>
        </div>
    );
};
