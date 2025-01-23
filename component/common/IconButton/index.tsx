import React, { useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import useKeyPress from 'hooks/useKeyPress';
import { useKeyPress } from 'ahooks';

const StyledIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    borderRadius: '50%',
    border: '1px solid',
    height: 36,
    width: 36,
    padding: '10px',
    '& svg': {
        width: 19,
    },
    '&.MuiIconButton-sizeLarge': {
        height: 48,
        width: 48,
        padding: '14px',
        '& svg': {
            width: 21,
        },
    },
    '&.MuiIconButton-sizeSmall': {
        padding: '8',
        height: 28,
        width: 28,
        '& svg': {
            width: 15,
        },
    },
}));

interface CustomIconButtonProps extends IconButtonProps {
    variant: 'contained' | 'outlined' | 'text' | 'tertiary';
    squre?: boolean;
}
const CustomIconButton = (props: CustomIconButtonProps) => {
    const ref = useRef<any>(null);
    const theme: any = useTheme();
    useKeyPress(
        'Enter',
        () => {
            alert('entered');
        },
        {
            target: ref,
        },
    );
    const { variant, squre } = props;
    switch (variant) {
        case 'contained':
            return (
                <StyledIconButton
                    ref={ref}
                    sx={{
                        borderRadius: !squre ? '' : '4px',
                        backgroundColor: 'primary.light',
                        color: 'common.white',
                        '&:hover': { backgroundColor: 'primary.dark' },
                        '&:focus': { boxShadow: theme.shadows[1] },
                        '&.Mui-disabled': {
                            backgroundColor: `${theme.palette.primary[40]} !important`,
                            borderColor: 'transparent',
                            color: 'common.white',
                        },
                    }}
                    {...props}
                />
            );
        case 'outlined':
            return (
                <StyledIconButton
                    ref={ref}
                    sx={{
                        borderRadius: !squre ? '' : '4px',
                        borderColor: 'primary.light',
                        color: 'primary.light',
                        '&:hover': {
                            borderColor: 'primary.dark',
                            backgroundColor: 'transparent',
                        },
                        '&:focus': { boxShadow: theme.shadows[1] },
                        '&.Mui-disabled': {
                            color: theme.palette.primary[40],
                            borderColor: theme.palette.primary[40],
                        },
                    }}
                    {...props}
                />
            );
        case 'tertiary':
            return (
                <StyledIconButton
                    ref={ref}
                    sx={{
                        borderRadius: !squre ? '' : '4px',
                        backgroundColor: theme.palette.grey[100],
                        border: 'transparent',
                        color: theme.palette.grey.main,
                        '&:hover': {
                            backgroundColor: theme.palette.grey[60],
                        },
                        '&:focus': { boxShadow: theme.shadows[1] },
                        '&.Mui-disabled': {
                            backgroundColor: theme.palette.grey[100],
                            color: theme.palette.grey[500],
                        },
                    }}
                    {...props}
                />
            );
        case 'text':
            return (
                <StyledIconButton
                    ref={ref}
                    sx={{
                        borderRadius: !squre ? '' : '4px',
                        borderColor: 'transparent',
                        backgroundColor: 'common.white',
                        color: 'secondary.main',
                    }}
                    {...props}
                />
            );
        default:
            return (
                <StyledIconButton
                    ref={ref}
                    sx={{
                        backgroundColor: 'secondary.main',
                        color: 'common.white',
                    }}
                    {...props}
                />
            );
    }
};

export default CustomIconButton;
