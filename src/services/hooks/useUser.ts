import { api, queryClient} from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { User } from "../../@types";

const getUsers = async <T>(token: string):Promise<User[]> => {
    const { data } = await api.get<User[]>('/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data;
}

export const useUsers = <T>(token: string):UseQueryResult<User[]> => {
    return useQuery('users', () => getUsers(token))
}