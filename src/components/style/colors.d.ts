import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string,
        colors: {
            //main colors
            primary: string,
            secconday: string,
            tertiary: string,
            brownPrimary: string,
            brownSeccondary: string,
            browTertiary: string,
            blue: string,
            darkBlue: string,

            //neutral colors
            white: string,
            whiteSecconday: string,
            lightGray: string,
            gray: string,
            dark: string,

            //complementary collors
            orange: string,
            lightGreen: string,
            purple: string,
            green: string,
            pink: string,

            //alert
            warning: string,
            success: string,
            infoOrange: string,

            //gradiente
            gradient: string
        }
    }
}