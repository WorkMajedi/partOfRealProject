import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export const StyledCustomButton = styled(Button)<ButtonProps>(
    ({ theme }: any) => ({
        textAlign: 'center',
        textTransform: 'capitalize',
        fontWeight: 400,
        borderRadius: '4px',

        '& .keyboard': {
            fontSize: '14px !important',
            marginInlineStart: '8px',
            '&::before': {
                content: `'|'`,
                opacity: 0.5,
                paddingRight: '16px',
                position: 'relative',
                top: '-1px',
            },
        },

        '&.MuiButton-containedPrimary': {
            backgroundColor: `${theme.palette.primary.light} `,
            boxShadow: 'none ',
            '& .keyboard': {
                color: theme.palette.primary['50'],
            },
            '&:hover': {
                backgroundColor: `${theme.palette.primary.dark}`,
            },
            '&:focus': {
                boxShadow: `${theme.shadows[1]}`,
            },
            '&:disabled': {
                backgroundColor: `${theme.palette.primary.lighter}`,
                color: theme.palette.common.white,
                '& .keyboard': {
                    color: theme.palette.primary['30'],
                },
            },
        },
        '&.MuiButton-outlined': {
            background: 'transparent',
            color: theme.palette.primary.dark,
            '& .keyboard': {
                color: '#6695A9',
            },
            '&:hover': {
                border: `1px solid ${theme.palette.primary.dark}`,
            },
            '&:focus': {
                boxShadow: theme.shadows[1],
            },
            '&:disabled': {
                color: theme.palette.primary.lighter,
                border: `1px solid ${theme.palette.primary.lighter}`,
                '& .keyboard': {
                    color: '#CCDCE2',
                },
            },
        },

        '&.MuiButton-containedError': {
            backgroundColor: theme.palette.error.main,
            '& .keyboard': {
                color: theme.palette.error['50'],
            },
            '&:hover': {
                backgroundColor: `${theme.palette.error.dark}`,
            },
            '&:focus': {
                boxShadow: theme.shadows[2],
            },
            '&:disabled': {
                backgroundColor: theme.palette.error.light,
                color: '#FFF',
                '& .keyboard': {
                    color: '#FFBEB3',
                },
            },
        },
        '&.MuiButton-outlinedError': {
            border: `1px solid ${theme.palette.error.main}`,
            color: theme.palette.error.main,
            '& .keyboard': {
                color: theme.palette.error['60'],
            },
            '&:hover': {
                border: `1px solid ${theme.palette.error.dark}`,
                color: theme.palette.error.dark,
            },
            '&:focus': {
                boxShadow: theme.shadows[2],
            },
            '&:disabled': {
                border: `1px solid ${theme.palette.error['40']}`,
                color: theme.palette.error[40],
                '& .keyboard': {
                    color: `${theme.palette.error['50']}`,
                },
            },
        },
        '&.MuiButton-sizeLarge': {
            padding: '15px 16px',
            fontSize: 14,
            lineHeight: '17px',
            maxHeight: '48px',
            minWidth: '120px',
        },
        '&.MuiButton-sizeMedium': {
            padding: '10px 12px',
            fontSize: 13,
            lineHeight: '16px',
            maxHeight: '36px',
            minWidth: '80px',
        },
        '&.MuiButton-sizeSmall': {
            padding: '7px 14px',
            fontSize: 12,
            lineHeight: '14.5px',
            maxHeight: '28px',
            minWidth: '60px',
        },
        '&.MuiButton-text': {
            borderColor: theme.palette.grey[100],
            backgroundColor: theme.palette.grey[100],
            '&:hover': {
                borderColor: theme.palette.grey[100],
                backgroundColor: theme.palette.grey[100],
            },
            '&:disabled': {
                borderColor: theme.palette.grey[100],
                backgroundColor: theme.palette.grey[100],
            },
        },
        '&.tertiary.MuiButton-contained': {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.grey.main,
            boxShadow: 'none',
            '& .keyboard': {
                color: theme.palette.grey[600],
            },
            '&:hover': {
                backgroundColor: theme.palette.grey[200],
            },
            '&:focus': {
                boxShadow: `0px 0px 0px 2px ${theme.palette.grey[200]}`,
            },
            '&:disabled': {
                color: theme.palette.grey[500],
                '& .keyboard': {
                    color: theme.palette.grey[300],
                },
            },
        },
    }),
);
