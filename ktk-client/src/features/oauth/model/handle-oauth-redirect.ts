import { API_URL } from "@/shared/config/constants";

export const handleOAuthRedirect = (provider: "google" | "github") => {
    window.location.href = `${API_URL}/auth/oauth2/${provider}`;
};
