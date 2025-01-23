/* eslint-disable no-nested-ternary */
import { Box } from '@mui/material';
import React, {  } from 'react';


const StatusLabel = ({ value, colDef }: any) => {
    const args: {
        [key: string]: {};
    } = {
        false: {
            label: 'Failed',
            color: '#FF513399',
        },
        true: {
            label: 'Approved',
            color: '#34A76999',
        },
        nature: {
            color: 'transparent',
        },
        ...colDef?.args,
    };

    const status: {
        color?: string;
        label?: string;
    } = args[value];

    return (
        <span
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: status.color || '#fff',
            }}
        >
            {status.label}
        </span>
    );
};

export default function GridLabelStatus({
    inputProps,
    value,
    row,
    updateRow,
    saveGridRows,
    type,
    ...restProps
}: any) {



    return (
        <Box width="100%" height="100%" display="flex" alignItems="center">
            <StatusLabel value={value} {...restProps} />
        </Box>
    );
}
