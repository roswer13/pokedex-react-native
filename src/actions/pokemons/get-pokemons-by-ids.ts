import { Pokemon } from "../../domain/entities/pokemon";
import { getPokemonById } from "./get-pokemon-by-id";

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
    try {
        const pokemonPromises: Promise<Pokemon>[] = ids.map(id => {
            return getPokemonById(id);
        });

        return await Promise.all(pokemonPromises);
    } catch (error) {
        console.error('Error fetching pokemons by IDs:', error);
        throw error;
    }
};
