import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)(() => ({
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    borderRadius: '4px',
    border: '1px solid #e5e5ea',
    width: '148px',
    height: '148px',
    padding: '2px',
    boxSizing: 'border-box',
    '.image': {
        width: '100%',
        height: '100%',
        borderRadius: '4px',
        objectFit: 'cover',
    },
}));
