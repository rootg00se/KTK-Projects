import React, { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui";
import { Search } from "lucide-react";
import { useDebounce } from "react-use"
import { useProjectsFilterStore } from "@/features/projects-filter";

export const SearchProjectsInput: React.FC = () => {
    const [value, setValue] = useState("");
    const setQuery = useProjectsFilterStore(store => store.setQuery);

    useDebounce(() => {
        setQuery(value);
    }, 250, [value])

    return (
        <InputGroup className="max-w-150">
            <InputGroupInput 
                value={value} 
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value)} 
                placeholder="Поиск..." 
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 результатов</InputGroupAddon>
        </InputGroup>
    );
};
