import { Soucers } from "../../@types"; 
import {
    UseFormRegister,
    UseFormWatch,
    FieldErrors,
    UseFormSetValue,
    Control,
} from "react-hook-form";

export interface IPropsSources {
    onDelete?(): void;
    register?: UseFormRegister<FormData>;
    errors?: FieldErrors<Soucers>;
    watch?: UseFormWatch<FormData>;
    setValue?: UseFormSetValue<FormData>;
    control?: Control<FormData>; 
    idService?: any
};

export type FormData = {
    service: string,
    name: string,
    id?: string
};