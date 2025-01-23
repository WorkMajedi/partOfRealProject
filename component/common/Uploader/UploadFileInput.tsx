import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React from 'react';
import { useKeyPress } from 'ahooks';
import { StyledCustomButton } from '../Button/styles';

export default function UploadFileInput({
    getRootProps,
    getInputProps,
    open,
    disabled,
}: any) {
    useKeyPress(['alt.b'], (e: any) => {
        e.preventDefault();
        open();
    });

    return (
        <StyledCustomButton
            {...getRootProps({
                className: 'dropContainerBtn',
            })}
            onClick={open}
            variant="contained"
            size="medium"
            startIcon={<ArrowUpwardIcon />}
            endIcon={<span className="keyboard">Alt + B</span>}
            disabled={disabled}
        >
            <input
                {...getInputProps()}
                style={{ display: 'block', opacity: 0, width: 0 }}
            />
            Browse
        </StyledCustomButton>
    );
}
