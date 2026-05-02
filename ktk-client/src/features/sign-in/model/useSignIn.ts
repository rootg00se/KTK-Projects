import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/entities/auth";
import type { IErrorResponse } from "@/shared/types/error-response.type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { SignInDto } from "@/entities/auth";
import { queryClient } from "@/app/providers/query-client";

export const useSignIn = () => {
    const navigate = useNavigate();

    const signInMutation = useMutation({
        mutationFn: ({ data, recaptcha }: { data: SignInDto; recaptcha: string }) => authApi.signIn(data, recaptcha),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });

            navigate("/");
        },
        onError: (error: IErrorResponse) => {
            toast.error(error.response.data.message[0] ?? error.response.data.message);
        },
    });

    return {
        signInFunc: signInMutation.mutate,
        isSignInPending: signInMutation.isPending,
    };
};
