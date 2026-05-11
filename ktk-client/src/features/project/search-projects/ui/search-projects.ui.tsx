import React, { useEffect, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components";
import { Search } from "lucide-react";
import { useDebounce } from "react-use"
import { useProjectsFilterStore } from "@/features/project/projects-filter";

export const SearchProjectsInput: React.FC = () => {
    const query = useProjectsFilterStore(store => store.query);
    const [value, setValue] = useState(query);

    const setQuery = useProjectsFilterStore(store => store.setQuery);

    useEffect(() => {
        setValue(query);
    }, [query]);
        
    useDebounce(() => {
        if (value.trim() !== query) {
            setQuery(value.trim());
        }
    }, 250, [value])

    return (
        <InputGroup className="max-w-150 max-lg:max-w-80 max-md:max-w-none mx-5">
            <InputGroupInput 
                value={value} 
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value)} 
                className="max-xs:text-sm"
                placeholder="Поиск..." 
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    );
};
