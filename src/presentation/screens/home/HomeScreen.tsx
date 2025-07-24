import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { FlatList, StyleSheet, View } from 'react-native'
import { getPokemons } from '../../../actions/pokemons'
import { PokeballBg } from '../../components/ui/PokeballBg'
import { Text } from 'react-native-paper'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../../components/pokemons/PokemonCard'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();

    /**
     * This is the traditional way to fetch data using React Query.
    const { isLoading, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 60, // 1 hour
    });
     */

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        queryFn: async (params) => {
            const pokemons = await getPokemons(params.pageParam);
            pokemons.forEach(pokemon => {
                queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
            });
            return pokemons;
        },
        getNextPageParam: (lastPage, allPages) => allPages.length,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    if (isLoading) {
        return <FullScreenLoader />
    }

    return (
        <View style={globalTheme.globalMargin}>
            <PokeballBg style={styles.imgPosition} />

            <FlatList
                style={{ paddingTop: top + 20 }}
                data={data?.pages.flat() || []}
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                ListHeaderComponent={() => (
                    <Text variant='displayMedium'>
                        Pokedex
                    </Text>
                )}
                onEndReachedThreshold={0.6}
                onEndReached={() => fetchNextPage()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100,
    },
});
