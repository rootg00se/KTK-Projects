import { Input, Label } from "@/shared/components";
import React from "react";

interface IProjectInfoFieldProps {
    value: string;
    setValue: (value: string) => void;
    className?: string;
    label: string;
    required?: boolean;
}

export const ProjectInfoField: React.FC<IProjectInfoFieldProps> = ({
    value,
    setValue,
    className,
    label,
    required = false,
}) => {
    return (
        <div className={className}>
            <Label className="font-heading mb-3">
                {label} {required && <span className="text-primary">*</span>}
            </Label>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Введите название..." />
        </div>
    );
};
