import { Box, Divider, Grid, Typography } from '@mui/material';
import { StyledGrid } from '../LabelBox/style';

export default function BoxAttachment({
    label,
    value,
}: {
    label?: string;
    value?: [];
}) {
    const BaseUrl =
        process.env.REACT_APP_BASE_URL ||
        `https://asc-api-rc.paradigmdigital.agency`;
    return (
        <StyledGrid>
            <Box className="border detailsWrapper">
                <Grid item>
                    <Typography className="label" variant="body1">
                        {label}
                    </Typography>
                    {!!value?.length ? (
                        <Grid container spacing={2}>
                            {value.map((item: any) => (
                                <Grid item>
                                    <a
                                        href={BaseUrl + item.path}
                                        target="_blank"
                                        rel="noreferrer"
                                        download
                                    >
                                        {item.name}
                                    </a>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        '_'
                    )}
                </Grid>
            </Box>
        </StyledGrid>
    );
}
