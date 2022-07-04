export type FormData = {
    "name": string,
    "phone_number": string,
    "email": string,
    "state": string,
    "city": string,
    "active": boolean,
    "role": string,
    "password": string
}

export interface IProps {
    onClose: () => void;
    isModal: boolean;
}