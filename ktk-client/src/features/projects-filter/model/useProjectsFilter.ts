import { useEffect } from "react";
import * as qs from "qs";
import { useSearchParams } from "react-router-dom";
import { useProjectsFilterStore } from "./projects-filter.store";

export const useProjectsFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setTags = useProjectsFilterStore((store) => store.setTags);
    const setQuery = useProjectsFilterStore((store) => store.setQuery);

    const tags = useProjectsFilterStore((store) => store.tags);
    const query = useProjectsFilterStore((store) => store.query);

    const queryFilterObject = {
        tags,
        query: query || undefined,
    };

    useEffect(() => {
        setSearchParams(qs.stringify(queryFilterObject, { arrayFormat: "comma" }), { replace: true });
    }, [tags, query]);

    useEffect(() => {
        setTags(searchParams.get("tags")?.split(",") || []);
        setQuery(searchParams.get("query") || "");
    }, []);

    return {
        tagsFilter: tags.join(","),
        queryFilter: query,
    };
};
