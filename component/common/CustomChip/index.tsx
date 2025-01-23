import React from 'react';
import { ChipProps } from '@mui/material';
import { StyledChip } from './style';

interface MyChipProps extends ChipProps {
    colorClass?:
        | 'primary'
        | 'lightPrimary'
        | 'darkPrimary'
        | 'secondary'
        | 'darkSecondary'
        | 'lightSecondary'
        | 'warning'
        | 'lightWarning'
        | 'darkWarning'
        | 'error'
        | 'lightError'
        | 'darkError'
        | 'success'
        | 'lightSuccess'
        | 'darkSuccess'
        | 'gray'
        | 'grey'
        | 'lightGray'
        | 'darkGray'
        | 'inherit'
        | 'default';
}

const CustomChip: React.FC<MyChipProps> = ({
    colorClass = 'default',
    ...props
}) => {
    return (
        <StyledChip
            {...props}
            className={[props.className, colorClass].join(' ')}
        />
    );
};

export default CustomChip;
