import { 
    ibge
} from "../index";
import { useQuery } from "react-query";
import { UF } from "../../@types/index";

const getState = async (): Promise<UF> => {
    const { data } = await ibge.get<UF>('/estados?orderBy=nome')
    return data;
}

export const useUf = () => {
    return useQuery("state", () => getState())
}