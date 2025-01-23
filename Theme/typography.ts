import { TypographyOptions } from '@mui/material/styles/createTypography';

const LANGUAGE = process.env.REACT_APP_LANGUAGE;

const typography: TypographyOptions = {
    fontFamily: [
        LANGUAGE === 'fa-IR' ? 'Pelak' : 'Inter',
        'yekan',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
        fontSize: '22px',
        fontWeight: 700,
        lineHeight: '27px',
    },
    h2: {
        fontSize: '18px',
        fontWeight: 700,
        lineHeight: '22px',
    },
    h3: {
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '20px',
    },
    h4: {
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: '19px',
    },
    h5: {
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
    },
    h6: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.25,
    },
    body1: {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '17px',
    },
    body2: {
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '17px',
    },
    button: {
        textTransform: 'none',
    },

    subtitle2: {
        fontSize: '13px',
        fontWeight: 500,
        lineHeight: '16px',
    },
    overline: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '25px',
    },
};

export default typography;
