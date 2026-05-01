import { useEffect } from "react";
import * as qs from "qs";
import { useSearchParams } from "react-router-dom";
import { useUsersSearchStore } from "./users-search-store";

export const useUsersSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setNicknameQuery = useUsersSearchStore((store) => store.setNicknameQuery);
    const nicknameQuery = useUsersSearchStore((store) => store.nicknameQuery);

    useEffect(() => {
        setSearchParams(qs.stringify({ query: nicknameQuery}), { replace: true });
    }, [nicknameQuery]);

    useEffect(() => {
        setNicknameQuery(searchParams.get("query") || "");
    }, []);

    return {
        queryFilter: nicknameQuery,
    };
};
