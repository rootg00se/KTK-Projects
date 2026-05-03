import { useUser } from "./useUser";

export const isAuthenticated = () => {
    const { userData, userIsPending } = useUser();

    return {
        isUserAuthenticated: !!userData,
        userIsPending
    };
};

export const isActivated = () => {
    const { userData, userIsPending } = useUser();

    return {
        isUserActivated: !!userData?.is_verified,
        userIsPending
    };
};

export const selectUserId = () => {
    const { userData, userIsPending } = useUser();
    if (userIsPending) return undefined;

    return userData?.user_id;
};
