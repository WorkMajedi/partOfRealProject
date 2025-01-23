import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

export const LabelWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    height: 'inherit',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '& button': {
        color: '#004F70',
        height: '100%',
        width: '100%',
        padding: 8,
        justifyContent: 'flex-start',
        position: 'relative',
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '2px',
            borderRadius: '4px',
            backgroundColor: '#004F70',
            bottom: '0',
            left: '0',
            transformOrigin: 'right',
            transform: 'scaleX(0)',
            transition: 'transform .3s ease-in-out',
        },
        '&:hover::before': {
            transformOrigin: 'left',
            transform: 'scaleX(1)',
        },
        '&:focus::before': {
            transformOrigin: 'left',
            transform: 'scaleX(1)',
        },
        // '& .code': {
        //     position: 'relative',
        //     '&::before': {
        //         content: "''",
        //         position: 'absolute',
        //         width: '100%',
        //         height: '2px',
        //         borderRadius: '4px',
        //         backgroundColor: '#004F70',
        //         bottom: '0',
        //         left: '0',
        //         transformOrigin: 'right',
        //         transform: 'scaleX(0)',
        //         transition: 'transform .3s ease-in-out',
        //     },
        //     '&:hover::before': {
        //         transformOrigin: 'left',
        //         transform: 'scaleX(1)',
        //     },
        // },
    },
    '& .code': {
        padding: '4px 6px',
        background: theme.palette.grey[300],
        borderRadius: 4,
        marginRight: 4,
    },
    '& .label': {
        fontWeight: 400,
        fontSize: '14px',
        color: '#3A3A3A',
    },
}));
