import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/entities/auth";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";

export const useResetPassword = () => {
    const resetPasswordMutation = useMutation({
        mutationFn: authApi.resetPassword,
        onSuccess() {
            toast.info("Ссылка для сброса пароля была отправлена на вашу почту!");
        },
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
    });

    return {
        resetPasswordFunc: resetPasswordMutation.mutate,
        isResetPasswordPenging: resetPasswordMutation.isPending,
    };
};
