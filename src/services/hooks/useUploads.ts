import { api, queryClient} from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Uploads } from "../../@types";

const getUploads = async <T>(token: string):Promise<Uploads[]> => {
    const { data } = await api.get<Uploads[]>('/uploads', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data;
}

export const useUploads = <T>(token: string):UseQueryResult<Uploads[]> => {
    return useQuery('uploads', () => getUploads(token))
}