import { 
    ibge,
    queryClient
} from "../index";
import { useQuery } from "react-query";
import { City } from "../../@types/index";

const getCity = async <T>(
    id: number
): Promise<City> => {
    const { data } = await ibge.get<City>(`/estados/${id}/municipios`)
    return data;
}

export const useCity = <T>(id: number) => {
    return useQuery(["city", id], () => getCity<T>(id), {
        staleTime: 30 * 1000
    })
}