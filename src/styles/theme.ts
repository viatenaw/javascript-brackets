
export const headerHeight = '56px'

export interface Sizes {
    XXS: number | string,
    XS: number | string,
    S: number | string,
    M: number | string,
    L: number | string,
    XL: number | string,
    XXL: number | string,
}

export const gapSizes: Partial<Sizes> = {
    S: '10px',
    M: '20px',
    L: '30px',
    XL: '40px',
    XXL: '50px',
}

export const screenSizes: Partial<Sizes> = {
    XXS: 420,
    XS: 480,
    S: 640,
    M: 768,
    L: 1024,
    XL: 1280,
    XXL: 1440,
}

export const fontSizes: Sizes = {
    XXS: '14px',
    XS: '16px',
    S: '18px',
    M: '24px',
    L: '32px',
    XL: '36px',
    XXL: '48px',
}

export const lineHeights: Sizes = {
    XXS: '14px',
    XS: '24px',
    S: '18px',
    M: '24px',
    L: '32px',
    XL: '36px',
    XXL: '48px',
}

export const textAreaSizes = {
    S: '92px',
    M: '108px',
    L: '128px',
}

interface ThemeWithStates {
    [propName: string]: string
}

export interface Colors {
    darkNavy: string,
    white: string,
    gray: string,
    error: string,
    black: string,
    green: string,
    blue: string,
    warning: string,
    lightGrey: string,
    yellowish: string,
    skyBlue: string,
    cyan: string,
    pink: string,
    navyHigh: string,
    darkGray: string,
    darkestGray: string,
    darkOrange: string,
    darkGreen: string,
    offGrey: string,
    lightBlack: string,

}

export const colors: Colors = {
    darkNavy: '#000025',
    white: '#ffffff',
    gray: '#C5CFD4',
    black: '#000000',
    error: '#EB5757',
    green: '#27AE60',
    blue: '#24ADCB',
    warning: '#FCB630',
    lightGrey: '#536167',
    yellowish: "#FCB630",
    skyBlue: '#53F0F7',
    cyan: '#36C2BE',
    pink: '#C729DA',
    navyHigh: "#52536D",
    darkGray: "#BDBDBD",
    darkestGray: "#828282",
    darkOrange: '#f2994acc',
    darkGreen: "#219653",
    offGrey: "#E0E0E0",
    lightBlack: "#3C434E"
}

export interface Theme {
    [propName: string]: string | ThemeWithStates | { [propName: string]: ThemeWithStates } | undefined,
    primary: string,
    primaryText: string,
    secondary: string,
    secondaryText: string,
    success: string,
    gray: string,
    error: string,
    grad1: string,
    grad2: string,
    white: string,
    black: string,
    warning: string,
    submittedSnackbar: string,
    navyHigh: string,
    disabled: string,
    disabledText: string,
    darkOrange: string,
    darkGreen: string,
    offGrey: string,
    lightBlack: string
}

export const basicTheme: Theme = {
    primary: colors.blue,
    primaryText: colors.yellowish,
    secondary: colors.darkNavy,
    secondaryText: colors.skyBlue,
    success: colors.green,
    navyHigh: colors.navyHigh,
    error: colors.error,
    grad1: colors.cyan,
    grad2: colors.pink,
    gray: colors.gray,
    white: colors.white,
    black: colors.black,
    warning: colors.warning,
    submittedSnackbar: colors.lightGrey,
    disabled: colors.darkGray,
    disabledText: colors.darkestGray,
    darkOrange: colors.darkOrange,
    darkGreen: colors.darkGreen,
    offGrey: colors.offGrey,
    lightBlack: colors.lightBlack
}

export const lightTheme: Theme = {
    primaryText: colors.yellowish,
    secondaryText: colors.skyBlue,
    success: colors.green,
    primary: '#f2f2f2',
    secondary: '#f2f2f2',
    action: '#394E5B',
    error: colors.error,
    navyHigh: colors.navyHigh,
    grad1: colors.cyan,
    grad2: colors.pink,
    gray: '#FFF',
    white: '#262626',
    black: colors.black,
    warning: colors.warning,
    submittedSnackbar: colors.lightGrey,
    disabled: colors.darkGray,
    disabledText: colors.darkestGray,
    darkOrange: colors.darkOrange,
    darkGreen: colors.darkGreen,
    offGrey: colors.offGrey,
    lightBlack: colors.lightBlack

}

export enum Themes {
    BASIC,
    LIGHT,
}

export const getTheme = (theme: Themes) => {
    switch (theme) {
        case Themes.BASIC:
            return basicTheme
        case Themes.LIGHT:
            return lightTheme
        default:
            return basicTheme
    }
}
