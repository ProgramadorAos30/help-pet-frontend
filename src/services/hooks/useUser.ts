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

export function postUser(token: string, { id, ...dados }: any){
    const resp =  api.post(`/users`, dados, { 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    
    return resp
};

export const putUser = async (token: string, id: string, dados: any) => {
    const resp =  await api.put(`/users/${id}`, dados, { 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    getUsers(token)
    return resp
};

export const deleteUser = async (token: string, id: string) => {
    const data = await api.delete(`/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    getUsers(token)
    return data
};

export const getUserById = async (token: string, id: string) => {
    const data = await api.get(`/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
};