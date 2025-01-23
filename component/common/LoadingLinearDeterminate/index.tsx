import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress, {
    linearProgressClasses,
    LinearProgressProps,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        // backgroundColor:
        //     theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        //backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));
function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number },
) {
    return (
        <>
            <LinearProgress variant="determinate" {...props} />
        </>
    );
}

const LoadingLinearDeterminate = (props: LinearProgressProps) => {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prevProgress =>
                prevProgress >= 100 ? 10 : prevProgress + 10,
            );
        }, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <BorderLinearProgress value={progress} {...props} />
        </Box>
    );
};
export default LoadingLinearDeterminate;
