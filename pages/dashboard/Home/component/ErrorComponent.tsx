/** @jsxImportSource @emotion/react */
import React, { FunctionComponent } from 'react';
import { Refresh } from 'assets/svg';

import { Grid, Typography } from '@mui/material';

interface OwnProps {
    fetchData: () => void;
}

type Props = OwnProps;

const functionComponent: FunctionComponent<Props> = ({ fetchData }) => {
    return (
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'absolute',
            }}
        >
            <Typography variant="h4" className="text-danger">
                This sections can't get data
            </Typography>
            <Grid
                item
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    mt: '1rem',
                }}
                onClick={fetchData}
            >
                <span
                // style={{paddingX: '0.25rem'}}
                >
                    Reloaded again
                </span>
                <Refresh />
            </Grid>
        </Grid>
    );
};

export default functionComponent;
