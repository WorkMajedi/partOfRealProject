import styled from '@emotion/styled/macro';
import { Alert, AlertProps } from '@mui/material';

interface Props extends AlertProps {
    customColor?: { [key: string]: unknown };
}

export const StyledAlert = styled(Alert)<Props>(({ theme, customColor }) => ({
    height: 'auto',
    width: '100%',
    minHeight: '3.8375em',
    ...(!!customColor?.background && {
        backgroundColor: `${customColor.background}`,
    }),
    ...(!!customColor?.text && {
        color: `${customColor.text}`,
    }),
    '&.MuiPaper-root.MuiPaper-elevation': {
        boxShadow: 'unset',
        marginTop: 0,
    },
}));
