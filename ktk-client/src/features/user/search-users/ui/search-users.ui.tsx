import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { useUsersSearchStore } from "../model/users-search-store";

export const SearchUsersInput: React.FC = () => {
    const nicknameQuery = useUsersSearchStore(store => store.nicknameQuery);
    const [value, setValue] = useState(nicknameQuery);

    const setQuery = useUsersSearchStore(store => store.setNicknameQuery);

    useEffect(() => {
        setValue(nicknameQuery);
    }, [nicknameQuery]);
    
    useDebounce(() => {
        if (value.trim() !== nicknameQuery) {
            setQuery(value.trim());
        }
    }, 250, [value])
        
    return (
        <InputGroup className="max-w-150 max-lg:max-w-80 max-md:max-w-none mx-5">
            <InputGroupInput 
                className="max-xs:text-sm"
                value={value} 
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value)} 
                placeholder="Искать пользователей..." 
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    );
};
