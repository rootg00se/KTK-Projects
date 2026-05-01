import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "react-use";
import { useUsersSearchStore } from "../model/users-search-store";

export const SearchUsersInput: React.FC = () => {
    const [value, setValue] = useState("");
    const setQuery = useUsersSearchStore(store => store.setNicknameQuery);
    
    useDebounce(() => {
        setQuery(value);
    }, 250, [value])
        
    return (
        <InputGroup className="max-w-150">
            <InputGroupInput 
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
