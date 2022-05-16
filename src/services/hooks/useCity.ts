import { 
    ibge,
    queryClient
} from "../index";
import { useQuery } from "react-query";
import { City } from "../../@types/index";

const getCity = async <T>(
    id: string
): Promise<City> => {
    const { data } = await ibge.get<City>(`/estados/${id}/municipios`)
    return data;
}

export const useCity = <T>(id: string) => {
    return useQuery(["city", id], () => getCity<T>(id), {
        staleTime: 30 * 1000
    })
}