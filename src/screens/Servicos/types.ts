import { Soucers } from "../../@types"; 
import {
    UseFormRegister,
    UseFormWatch,
    FieldErrors,
    UseFormSetValue,
    Control,
} from "react-hook-form";

export interface IPropsSources {
    onDelete(): void;
    register: UseFormRegister<FormData>;
    errors: FieldErrors<Soucers>;
    watch: UseFormWatch<FormData>;
    setValue: UseFormSetValue<FormData>;
    control: Control<FormData>; 
    idSource: any, 
    onClick(): void
};

export type FormData = {
    image: string,
    name: string,
    background_color: string,
    active: boolean,
    other_option: boolean,
    sources: Soucers[],
    id?: string
};