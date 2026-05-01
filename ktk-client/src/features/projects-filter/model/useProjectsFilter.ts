import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useProjectsFilterStore } from "./projects-filter.store";

export const useProjectsFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setTags = useProjectsFilterStore((store) => store.setTags);
    const setQuery = useProjectsFilterStore((store) => store.setQuery);

    const tags = useProjectsFilterStore((store) => store.tags);
    const query = useProjectsFilterStore((store) => store.query);

    const isFirstLoad = useRef(true);

    useEffect(() => {
        const tagsFromUrl = searchParams.get("tags");
        const queryFromUrl = searchParams.get("query");

        if (tagsFromUrl) {
            const tagsArray = tagsFromUrl.split(",").filter(Boolean);
            setTags(tagsArray);
        }

        if (queryFromUrl) {
            setQuery(queryFromUrl);
        }

        isFirstLoad.current = false;
    }, []);

    useEffect(() => {
        if (isFirstLoad.current) return;

        const params: Record<string, string> = {};

        if (tags && tags.length > 0) {
            params.tags = tags.join(",");
        }

        if (query && query.trim() !== "") {
            params.query = query;
        }

        setSearchParams(params, { replace: true });
    }, [tags, query, setSearchParams]);

    return {
        tagsFilter: tags.join(","),
        queryFilter: query,
    };
};
