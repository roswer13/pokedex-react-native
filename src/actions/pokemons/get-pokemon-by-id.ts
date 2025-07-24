import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokeAPIPokemon } from "../../insfrastructure/interfaces/pokepi.interfaces";
import { PokemonMapper } from "../../insfrastructure/mappers/pokemon.mapper";

export const getPokemonById = async (pokemonId: number): Promise<Pokemon> => {
    try {
        const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${pokemonId}`);
        return PokemonMapper.pokeApiPokemonToEntity(data);
    } catch (error) {
        console.error('Error fetching pokemon by ID:', error);
        throw error;
    }
}