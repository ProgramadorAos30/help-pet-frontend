import { ibge } from '../index';

export const getCity = async (
    id: number,
) => {
    try {
        const resp = await ibge.get(`/estados/${id}/municipios`)
        return resp
    } catch(resp){
        console.log(resp, 'city');
    }
}