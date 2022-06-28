import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { SourceFormData, Soucers } from "../../@types";

const getSource = async <T>(token: string):Promise<Soucers[]> => {
    const { data } = await api.get<Soucers[]>('/sources', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data;
}

export const useSources = <T>(token: string):UseQueryResult<Soucers[]> => {
    return useQuery('sources', () => getSource(token))
}

export function postSource(token: string, { id, ...dados }: any){
    const resp = api.post(`/sources`, dados, {
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    });
    return resp
};

export function putSource(token: string, id: string, dados: SourceFormData){
    const resp = api.put(`/sources/${id}`, dados, {
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    });
    return resp
};

export const deleteSource = async (token: string, id: any) => {
    const resp = await api.delete(`/sources/${id}`, {
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    })

    return resp
};

export const getSourceById = async (token: string, id: any) => {
    const resp = await api.get(`/sources/${id}`, {
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    })

    return resp
};