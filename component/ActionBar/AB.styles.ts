import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
import {
    drawerWidth,
    drawerWidthClose,
} from 'layouts/DashBoard/component/DashBoard.styles';

interface ABStylesProps extends BoxProps {
    open?: boolean;
}
export const ABStyles = styled(Box)<ABStylesProps>(({ theme, open }: any) => ({
    // @ts-ignore
    background: 'transparent',
    position: 'fixed',
    width: `calc(100% - ${drawerWidth}px + 2px)`,
    height: '68px',
    top: '0px',
    zIndex: 1300,
    right: '0px',
    padding: '2px 23px 2px 37px',
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['all'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(!open && {
        width: `calc(100% - ${drawerWidthClose}px)`,
        transition: theme.transitions.create(['all'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
