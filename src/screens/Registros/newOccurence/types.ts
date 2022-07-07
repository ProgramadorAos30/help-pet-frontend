export interface FormData {
    id?: string,
    service?: string,
    source?: string,
    source_name?: string,
    date?: string,
    restoration_date?: string,
    address?: string,
    neighborhood?: string,
    city?: string,
    state?: string,
    country?: string,
    special_place?: string,
    have_energy_meter?: string,
    have_hydrometer?: string,
    have_reservoir?: string,
    number_residents?: number,
    type_place?: string,
    area?: string,
    description?: string,
    restoration_description?: string,
    agree_share?: any,
    latitude?: string,
    longitude?: string,
    status?: string,
    finished_status?: string
}

export interface IProps {
    isModal: boolean;
    onHide: () => void;
    itemEdit?: any;
}