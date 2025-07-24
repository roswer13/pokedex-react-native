import { pokeApi } from "../../config/api/pokeApi"
import { PokeAPIPaginatedResponse } from "../../insfrastructure/interfaces/pokepi.interfaces"

export const getPokemonNamesWithId = async () => {

    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>('/pokemon?limit=1000');

    return data.results.map((info) => ({
        id: Number(info.url.split('/')[6]),
        name: info.name
    }));
};