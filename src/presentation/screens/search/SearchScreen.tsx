import { FlatList, View } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const [term, setTerm] = useState('');

    const { isLoading, data: pokemonNameList = [] } = useQuery({
        queryKey: ['pokemons', 'all'],
        queryFn: async () => getPokemonNamesWithId()
    });

    const pokemonNameIdList = useMemo(() => {
        // Is the term a valid number?
        if (!isNaN(Number(term))) {
            const pokemon = pokemonNameList.find(pokemon => pokemon.id === Number(term));
            return pokemon ? [pokemon] : [];
        }

        if (term.length === 0) {
            return [];
        }

        if (term.length < 3) {
            return [];
        }

        // Filter the pokemon names based on the search term
        return pokemonNameList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(term.toLowerCase())
        );

    }, [term]);


    if (isLoading) {
        return (
            <View style={[globalTheme.globalMargin, { marginTop: top }]}>
                <ActivityIndicator style={{ marginTop: 20 }} />
            </View>
        );
    }

    return (
        <View style={[globalTheme.globalMargin, { marginTop: top }]}>
            <TextInput
                label="Search Pokémon"
                mode="flat"
                autoFocus
                autoCorrect={false}
                onChangeText={setTerm}
                value={term}
            />

            <Text>{JSON.stringify(pokemonNameIdList, null, 2)}</Text>

            <FlatList
                style={{ paddingTop: top + 20 }}
                data={[] as Pokemon[]}
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
