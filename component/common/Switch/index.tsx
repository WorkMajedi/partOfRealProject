import React from 'react';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { useTheme } from '@emotion/react';
import themeReducer from '../../../redux/slices/theme/themeReducer';

const StyledSwitch = styled(Switch)<SwitchProps>(({ theme }) => ({
    '& .MuiSwitch-thumb': {
        height: 17.5,
        width: 17.5,
        position: 'relative',
        top: 3,
        boxShadow: 'none',
        backgroundColor: theme.palette.grey[500],
    },
    '& .Mui-checked .MuiSwitch-thumb': {
        boxShadow: 'none',
        backgroundColor: theme.palette.primary.main,
    },

    '& .MuiSwitch-switchBase': {
        '&:hover': {
            background: 'transparent',
        },
    },
    '& .Mui-disabled': {
        // '& .MuiSwitch-switchBase + .MuiSwitch-track': {
        //     backgroundColor: theme.palette.grey[300],
        // },
        '& .MuiSwitch-thumb': {
            backgroundColor: `${theme.palette.grey[300]} `,
        },
    },
    '& .MuiSwitch-track': {
        backgroundColor: `${theme.palette.grey[100]}!important`,
        height: 18,
        width: 34,
        borderRadius: 100,
        border: ` 0.9px solid ${theme.palette.grey[400]}`,
    },
}));

interface CustomSwitchProps extends SwitchProps {
    variant?: 'primary' | 'secondary';
    label?: any;
    parentRef?: any;
}

const CustomSwitch = (props: CustomSwitchProps) => {
    const { color, disabled, label, parentRef } = props;
    const theme: any = useTheme();

    return (
        <FormControlLabel
            sx={{
                color: theme.palette.grey.main,
            }}
            label={label || ''}
            control={
                <StyledSwitch
                    ref={parentRef}
                    className={disabled ? 'disabled' : ''}
                    sx={{
                        '& .Mui-checked .MuiSwitch-thumb': {
                            backgroundColor:
                                // eslint-disable-next-line no-nested-ternary
                                color === 'secondary'
                                    ? 'secondary.main'
                                    : color === 'success'
                                        ? 'success.main'
                                        : 'primary.main',
                        },
                    }}
                    {...props}
                />
            }
        />
    );
};

export default CustomSwitch;
