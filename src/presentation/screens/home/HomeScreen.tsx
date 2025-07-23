import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { getPokemons } from '../../../actions/pokemons'

export const HomeScreen = () => {

    const { isLoading, data } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    return (
        <View>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    {data?.map(pokemon => (
                        <View key={pokemon.id}>
                            <Text>{pokemon.name}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    )
}
