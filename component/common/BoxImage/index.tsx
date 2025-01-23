import { Box } from '@mui/material';
import React from 'react';
import { StyledBox } from './style';

export default function BoxImage({ file }: any) {
    return (
        <StyledBox>
            <img
                src={
                    !!file?.path
                        ? `https://asc-api-rc.paradigmdigital.agency${file.path}`
                        : 'https://mui.com/static/images/avatar/1.jpg'
                }
                className="image"
                alt="uploaded"
            />
        </StyledBox>
    );
}
