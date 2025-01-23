import {
    Box,
    LinearProgress,
    LinearProgressProps,
    // Typography,
} from '@mui/material';

export default function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number },
) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            {/* <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box> */}
        </Box>
    );
}
