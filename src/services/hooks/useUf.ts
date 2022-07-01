import { ibge } from "../index";
import { useQuery, UseQueryResult } from "react-query";

type List = {
    nome: string,
    id: number,
    sigla: string,
}

interface UF {
    id: number
    nome: string
    sigla: string  
    regiao: List
}

const getState = async (): Promise<UF> => {
    const { data } = await ibge.get<UF>('/estados?orderBy=nome')
    return data;
}

export const useUf = <T>(): UseQueryResult<UF[]> => {
    return useQuery("state", () => getState())
}