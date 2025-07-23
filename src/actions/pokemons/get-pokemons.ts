import { pokeApi } from "../../config/api/pokeApi";
import type { Pokemon } from "../../domain/entities/pokemon";
import type { PokeAPIPaginatedResponse } from "../../insfrastructure/interfaces/pokepi.interfaces";
import type { PokeAPIPokemon } from '../../insfrastructure/interfaces/pokepi.interfaces';
import { PokemonMapper } from "../../insfrastructure/mappers/pokemon.mapper";

export const sleep = async () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
}


export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {
    try {
        const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(`/pokemon?offset=${page * limit}&limit=${limit}`);

        const pokemonPromises = data.results.map((result) => {
            return pokeApi.get<PokeAPIPokemon>(result.url);
        });

        const pokemonsResponses = await Promise.all(pokemonPromises);
        const pokemonsPromises = pokemonsResponses.map(item => PokemonMapper.pokeApiPokemonToEntity(item.data));

        return await Promise.all(pokemonsPromises);
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw error;
    }
}