import { NavigationContainer } from '@react-navigation/native'
import { PropsWithChildren } from 'react'
import { StackNavigator } from './presentation/navigator/StackNavigator'

export const PokedexApp = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}
