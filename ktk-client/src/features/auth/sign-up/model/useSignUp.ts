import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/entities/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { SignUpDto } from "@/entities/auth";
import { queryClient } from "@/app/providers/query-client";
import type { IErrorResponse } from "@/shared/types/error-response.type";

export const useSignUp = () => {
    const navigate = useNavigate();

    const signUpMutation = useMutation({
        mutationFn: ({ data, recaptcha }: { data: SignUpDto; recaptcha: string }) => authApi.signUp(data, recaptcha),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["posts"] });

            navigate("/verify");
        },
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
    });

    return {
        singUpFunc: signUpMutation.mutate,
        isSignUpPending: signUpMutation.isPending,
    };
};
