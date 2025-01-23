import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';

interface BTNProps extends ButtonProps {
    hasMaterial?: boolean;
}
export const GridBtnBaseStyled = styled(Button)<BTNProps>(
    ({ theme, hasMaterial }) => ({
        '& ': {
            background: theme.palette.secondary.main,
            borderRadius: 4,
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '14px',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
            minWidth: 'auto',
            ...(hasMaterial && {
                background: theme.palette.primary.light,
                color: '#FFF',
                borderColor: '#FFF',
            }),
            '&:hover': {
                background: '#FFF',
                color: theme.palette.primary.light,
                borderColor: theme.palette.primary.light,
            },
        },
    }),
);
export const GridActionsWrapper = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 6,
    padding: '0 10px',
}));
