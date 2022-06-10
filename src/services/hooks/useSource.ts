import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Soucers } from "../../@types";

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