import React from 'react';

import { CircularProgress } from '@mui/material';
import LoadingLinearDeterminate from '../LoadingLinearDeterminate';
import { drawerWidth } from '../../../layouts/DashBoard/component/DashBoard.styles';

const Loader = () => {
    return (
        <div
            style={{
                width: '100vw',
                position: 'fixed',
                top: 70,
                left: `${drawerWidth}px + 2px`,
                zIndex: 8000,
            }}
        >
            <LoadingLinearDeterminate key="loading" color="primary" />{' '}
        </div>
    );
};

export default Loader;
