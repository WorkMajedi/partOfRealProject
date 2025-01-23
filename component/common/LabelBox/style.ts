import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledGrid = styled(Box)<any>(({ theme, colors }) => {
    return {
        height: '100%',
        '& .MuiBox-root': {
            minHeight: 68,
            padding: '5px 16px',
        },
        '& .border': {
            border: `1px solid ${theme.palette.grey[300]}`,
            height: 'inherit',
        },
        '& .detailsWrapper': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            ...(colors?.background ? { background: colors?.background } : {}),
            '& p:not(.label)': {
                ...(colors?.content ? { color: colors?.content } : {}),
            },
        },
        '& .label': {
            marginBottom: '6px',
            ...(colors?.title
                ? { color: colors?.title }
                : { color: theme.palette.grey[800] }),
        },
        '& .badge': {
            background: theme.palette.grey[300],
            borderRadius: 4,
            marginRight: 4,
            padding: '4px 6px',
            textTransform: 'capitalize',
        },

        '& .badgeLink': {
            color: '#003F5A',
            position: 'relative',
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '2px',
                borderRadius: '4px',
                backgroundColor: '#003F5A',
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
        },

        '& .textArea': {
            width: '100%',
            '& .MuiInputBase-root.MuiInput-root::before': {
                border: 'none',
            },
            '& .MuiInputBase-root.MuiInput-root::after': {
                border: 'none',
            },
        },
    };
});
