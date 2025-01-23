import { styled } from '@mui/material/styles';
import CheckBox, { CheckboxProps } from '@mui/material/Checkbox';

export const StyledCheckBox = styled(CheckBox)<CheckboxProps>(({ theme }) => ({
    color: 'common.black',

    '& .MuiSvgIcon-root ': {
        height: 16,
        width: 16,
    },
    '&.Mui-checked': {
        '& svg path': {
            fill: `${theme.palette.primary.main} !important`,
        },
        '&:hover': {
            '& svg path': {
                fill: `${theme.palette.primary.main} !important`,
            },
        },
    },
    '&.Mui-disabled': {
        '&.MuiCheckbox-root': {
            border: `1px solid ${theme.palette.grey[800]} !important`,
        },
        '& svg path': {
            fill: `${theme.palette.grey[800]} !important`,
        },
        '&.Mui-checked': {
            '& svg path': {
                fill: `${theme.palette.primary.lighter} !important`,
            },
        },
    },

    '&.MuiCheckbox-root': {
        // border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: '2px',
        width: 24,
        height: 24,
        marginInlineEnd: 10,
        '& svg path': {
            fill: theme.palette.grey[300],
        },
        '&:hover': {
            '& svg path': {
                fill: `${theme.palette.grey[400]}`,
            },
        },
    },
}));
