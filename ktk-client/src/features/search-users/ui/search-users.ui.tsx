import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui";
import { Search } from "lucide-react";

export const SearchUsersInput: React.FC = () => {
    return (
        <InputGroup className="max-w-150">
            <InputGroupInput 
                placeholder="Искать пользователей..." 
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    );
};
