import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Services } from "../../@types";

const getServices = async <T>(token: string):Promise<Services[]> => {
    const { data } = await api.get<Services[]>('/services', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data;
}

export const useService = <T>(token: string):UseQueryResult<Services[]> => {
    return useQuery('services', () => getServices(token))
}