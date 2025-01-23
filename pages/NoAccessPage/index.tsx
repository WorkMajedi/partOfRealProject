import { Box, Grid, Typography } from '@mui/material';
import { ErrorPageStyled } from './ErrorPage.styles';
import { Link } from 'react-router-dom';

export default function NoAccessPage({
    status = '403',
    message = 'ACCESS NOT GRANTED',
}: any) {
    return (
        <Grid
            container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
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
