import styled from '@emotion/styled/macro';
import { Box } from '@mui/material';

export const LoadingWrapper = styled(Box)`
    position: relative;
    //top: 0;
    //left: 0;
    //width: 100%;
    //height: 100%;
    margin-bottom: 20px;
    z-index: 9999;
    .loading-body {
        filter: blur(2px);
        pointer-events: none;
    }
    .loading-Icon {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 999988;
    }
    .loading-Icon-error {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 30%;
        left: 24%;
        z-index: 999988;
    }
`;
