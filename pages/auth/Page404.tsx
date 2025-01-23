import React from 'react';
import { Typography } from '@mui/material';

const Page404 = () => {
    return (
        <>
            <Typography component="h1" variant="h1" align="center" gutterBottom>
                404
            </Typography>
            <Typography component="h2" variant="h5" align="center" gutterBottom>
                Page not found.
            </Typography>
            <Typography
                component="h2"
                variant="body1"
                align="center"
                gutterBottom
            >
                The page you are looking for might have been removed.
            </Typography>
        </>
    );
};

export default Page404;
