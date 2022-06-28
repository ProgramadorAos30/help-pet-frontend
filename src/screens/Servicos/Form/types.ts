import { 
    Control, 
    FieldErrors, 
    UseFormRegister, 
    UseFormSetValue, 
    UseFormWatch 
} from "react-hook-form";

export type ISources = {
    service?: string,
    name: string,
    id?: string
    _id?: string
}

export interface IProps {
    isModal: boolean;
    onHide: () => void;
    itemEdit?: any;
}

export interface IPropsSources {
    onDelete?(): void;
    idVictim: number;
    register: UseFormRegister<FormData>;
    errors?: FieldErrors<ISources>;
    watch: UseFormWatch<FormData>;
    setValue: UseFormSetValue<FormData>;
    control: Control<FormData>; 
}

export type FormData = {
    image?: string,
    name: string,
    background_color: string,
    active: boolean,
    other_option?: boolean,
    sources?: ISources[],
    id?: string
}

export interface IServices {
    image?: string,
    name: string,
    background_color: string,
    active: boolean,
    other_option: boolean,
    sources: ISources[],
    id?: string
}