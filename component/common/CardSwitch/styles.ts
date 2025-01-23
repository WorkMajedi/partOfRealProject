import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

export const StyledSwitch = styled(Switch)<SwitchProps>(({ theme }) => ({
    // MuiSwitch-root
    width: 38,
    height: 22,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',

        '&.Mui-checked': {
            transform: 'translateX(16px)',
            '&+.MuiSwitch-track': {
                backgroundColor: theme.palette.grey[100],
                border: ` 0.9px solid ${theme.palette.grey[300]}`,
            },
        },

        '&.Mui-disabled': {
            '&.Mui-checked .MuiSwitch-thumb': {
                opacity: 0.3,
            },
            '&+.MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.grey[300],
            },
            '&.Mui-checked+.MuiSwitch-track': {
                backgroundColor: theme.palette.grey[300],
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        backgroundColor: theme.palette.grey[500],
        boxSizing: 'border-box',
        width: 18,
        height: 18,
    },
    '&:focus-within  .MuiSwitch-track': {
        border: `1px solid ${theme.palette.primary.main}`,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.grey[100],
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));
