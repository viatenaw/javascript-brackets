import { ThemeProvider } from "styled-components"

import { getTheme, Themes } from "../../styles/theme"
import { GlobalStyle } from "../../styles/globalStyle"
import "./App.css"
import { Home } from "../home"

export const App = () => {

    const currentTheme = { ...getTheme(Themes.BASIC), selected: Themes.BASIC }

    return (
            <ThemeProvider theme={currentTheme}>
                <GlobalStyle />
                <Home />
            </ThemeProvider>
    )
}