import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';

export const StyledRadio = styled(Radio)<RadioProps>(({ theme }) => ({
    '& .MuiSvgIcon-root:nth-of-type(1)': {
        backgroundColor: theme.palette.grey[300],
        borderRadius: '50%',
    },
    '& .MuiSvgIcon-root:nth-of-type(1) path': {
        display: 'none',
    },
    '& .MuiSvgIcon-root:nth-of-type(2)': {
        fontSize: 28,
        transform: 'translate(-2.5px, -2.5px)',
        fill: theme.palette.grey[400],
    },
    '&.MuiRadio-root ': {
        '& span:nth-of-type(1)': {
            // border: `1px solid ${theme.palette.grey[600]}`,
            borderRadius: '50%',
        },
        '&:hover': {
            '& .MuiSvgIcon-root:nth-of-type(2)': {
                fill: `${theme.palette.grey[600]}`,
            },
        },
    },

    '&.Mui-checked': {
        '& .MuiSvgIcon-root:nth-of-type(2)': {
            fill: theme.palette.primary.main,
        },
        '&:hover': {
            '& .MuiSvgIcon-root:nth-of-type(2)': {
                fill: theme.palette.primary.main,
            },
        },
    },
    '&.Mui-disabled': {
        '&.Mui-checked': {
            '& .MuiSvgIcon-root:nth-of-type(2)': {
                fill: theme.palette.primary.lighter,
            },
        },
    },
}));
