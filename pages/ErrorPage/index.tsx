import { Box, Grid, Typography } from '@mui/material';
import { ErrorPageStyled } from './ErrorPage.styles';
import { Link, Navigate } from 'react-router-dom';

export default function ErrorsPage({
    status = '404',
    message = 'Oops! Page not found',
}: any) {
    return (
        <Grid item xs>
            <ErrorPageStyled id="#notfound">
                <Box className="notfound">
                    <Box className="notfound-404">
                        <Typography variant="h3">{message}</Typography>
                        <Typography variant="h1">{status}</Typography>
                    </Box>
                    <Link
                        to={'/'}
                        replace={true}
                        style={{
                            marginTop: 25,
                            cursor: 'pointer',
                            zIndex: 1000,
                            display: 'inline-block',
                        }}
                    >
                        <Typography variant="h2" color={'red'}>
                            go to home
                        </Typography>
                    </Link>
                </Box>
            </ErrorPageStyled>
        </Grid>
    );
}
