import { api, queryClient} from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Occurrences } from "../../@types";

const getOccurrences = async <T>(
    token: string,
    order?: string,
    page?: number,
    take?: number,
    finished_status?: string,
    services?: string,
    city?: string,
    final_date?: string,
    initial_date?: string

):Promise<Occurrences[]> => {

    let params = new URLSearchParams();

    if(order != undefined){
        params.append("order", order)
    } else {
        params.append("order", "DESC");
    }
    if(page != undefined){
        params.append("page", page.toString())
    }
    if(take != undefined){
        params.append("take", take.toString())
    }
    if(finished_status != undefined){
        params.append("finished_status", finished_status)
    }
    if(services != undefined){
        params.append("services", services)
    }
    if(city != undefined){
        params.append("city", city)
    }
    if(final_date != undefined){
        params.append("final_date", final_date)
    }
    if(initial_date != undefined){
        params.append("initial_date", initial_date)
    }

    const { data } = await api.get<Occurrences[]>('/occurrences', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: params
    })
    return data;
}

export const useOccurrences = <T>(
    token: string,
    order?: string,
    page?: number,
    take?: number,
    finished_status?: string,
    services?: string,
    city?: string,
    final_date?: string,
    initial_date?: string
):UseQueryResult<Occurrences[]> => {
    return useQuery('ocurrence', () => 
    getOccurrences(
        token,
        order,
        page,
        take,
        finished_status,
        services,
        city,
        final_date,
        initial_date
    )
)}