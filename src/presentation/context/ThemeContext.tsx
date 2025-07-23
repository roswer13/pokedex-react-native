import React, { PropsWithChildren } from "react";

import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from "react-native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = React.createContext({
    isDark: false,
    theme: LightTheme
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const themeContainer = isDark ? DarkTheme : LightTheme;
    const themePaper = isDark ? MD3DarkTheme : MD3LightTheme;

    return (
        <PaperProvider theme={themePaper}>
            <NavigationContainer theme={themeContainer}>
                <ThemeContext.Provider value={{ isDark, theme: themeContainer }}>
                    {children}
                </ThemeContext.Provider>
            </NavigationContainer>
        </PaperProvider>
    );
};