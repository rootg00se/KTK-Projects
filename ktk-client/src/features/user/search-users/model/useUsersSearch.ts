import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useUsersSearchStore } from "./users-search-store";

export const useUsersSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setNicknameQuery = useUsersSearchStore((store) => store.setNicknameQuery);
    const nicknameQuery = useUsersSearchStore((store) => store.nicknameQuery);

    useEffect(() => {
        const queryFromUrl = searchParams.get("query");

        if (queryFromUrl) {
            setNicknameQuery(queryFromUrl);
        }
    }, []);

    useEffect(() => {
        if (nicknameQuery) {
            setSearchParams({ query: nicknameQuery });
        } else {
            const newParams = new URLSearchParams(searchParams);

            newParams.delete("query");
            setSearchParams(newParams);
        }
    }, [nicknameQuery]);

    return {
        queryFilter: nicknameQuery,
    };
};
