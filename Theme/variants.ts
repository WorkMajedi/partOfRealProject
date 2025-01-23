import merge from 'deepmerge';
import { THEMES } from 'Theme/constatns';

declare module '@mui/material/styles/createPalette' {
    interface PaletteColor {
        lighter?: PaletteColor;
        darker?: PaletteColor;
    }
    interface Palette {
        gray?: Palette['primary'];
        placeHolder?: Palette['primary'];
    }
    interface PaletteOptions {
        gray?: PaletteOptions['primary'];
        placeHolder?: PaletteOptions['primary'];
    }
}

const customBlue = {
    50: '#e9f0fb',
    100: '#c8daf4',
    200: '#a3c1ed',
    300: '#7ea8e5',
    400: '#6395e0',
    500: '#4782da',
    600: '#407ad6',
    700: '#376fd0',
    800: '#2f65cb',
    900: '#2052c2',
};

const darkColor = ['#001924'];
const gray = ['#b0b0b9', '#424450', '#727276', '#A8ABBD', '#2B2F3D'];

const defaultVariant = {
    name: THEMES.DEFAULT,
    palette: {
        mode: 'light',
        primary: {
            '20': '#E5EDF1',
            '30': '#B3CAD4',
            '40': '#99B9C6',
            '50': '#80A7B8',
            lighter: '#99B9C6',
            light: '#004F70',
            main: '#003B5B',
            dark: '#003F5A',
            contrastText: '#FFF',
        },
        secondary: {
            contrastText: '#FFF',
            main: '#F6F7F9',
        },
        grey: {
            '100': '#F8F8F8',
            '200': '#F6F7FB',
            '300': '#E5E5EA',
            '400': '#D1D1D6',
            '500': '#C7C7CC',
            '600': '#AEAEB2',
            '700': '#8E8E93',
            '800': '#727276',
            main: '#3A3A3C',
            dark: '#212121',
            contrastText: '#FFF',
        },
        inkey: {
            main: '#3A3A3A',
        },
        common: {
            main: '#FFFFFF',
            pageTitle: darkColor[0],
        },
        info: {
            lighter: '#E5EDF1',
            light: '#cce5ff',
            main: '#1976d2',
        },
        success: {
            light: '#92F7DE',
            main: '#019143',
            dark: '#00CC8F',
            contrastText: '#FFF',
        },
        error: {
            '10': '#FFE9E5',
            '40': '#FFA899',
            '50': '#FF9380',
            '60': '#FF7D66',
            light: '#FFA899',
            main: '#FF2600',
            dark: '#CC1E00',
        },
        background: {
            default: '#f4f6f8',
            paper: '#FFF',
        },
        warning: {
            light: '#FFEF9B',
            main: '#D0AF00',
            dark: '#D0AF00',
        },
        placeHolder: {
            main: 'rgba(183,183,183,0.27)',
            contrastText: '#FFF',
            test: '#EEF0F5',
        },
        sideMenu: {
            title: {
                bg: darkColor[0],
            },
            secondMenu: {
                bg: '#FFF',
                text: gray[2],
                icon: 'transparent',
                hover: {
                    text: gray[2],
                    bg: 'rgba(12, 12, 12, 0.05)',
                },
            },
        },
    },
};

const darkVariant = merge(defaultVariant, {
    name: THEMES.DARK,
    palette: {
        mode: 'dark',
        primary: {
            '20': '#003B5B',
            light: gray[4],
            main: gray[3],
            dark: '#AEAEB2',
            contrastText: '#AEAEB2',
        },
        grey: {
            '100': gray[1],
            '200': gray[1],
            '300': gray[4],
            '500': gray[3],
            '800': gray[0],
        },
        common: {
            main: darkColor[0],
            pageTitle: gray[3],
        },
        background: {
            default: darkColor[0],
            paper: darkColor[0],
        },
        sideMenu: {
            title: {
                bg: gray[1],
            },
            secondMenu: {
                bg: gray[1],
                text: gray[0],
                // icon: gray[0],
                icon: 'transparent',
                hover: {
                    bg: gray[0],
                    text: gray[1],
                },
            },
        },
    },
});

const variants: Array<VariantType> = [defaultVariant, darkVariant];

export default variants;

export type VariantType = {
    name: string;
    palette: {
        primary: MainContrastTextType;
        secondary: MainContrastTextType;
        placeHolder: MainContrastTextType;
    };
};

type MainContrastTextType = {
    main: string;
    contrastText: string;
};
