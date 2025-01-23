import { Toolbar } from '@mui/material';
import DrawerToggleBtn from 'assets/DrawerToggleBtn';
import { DrawerIconBtn, MuiAppBar } from './DashBoard.styles';

export default function AppBar({
    open,
    handleDrawerToggle,
}: {
    open: boolean;
    handleDrawerToggle: Function;
}) {

    return (
        <MuiAppBar position="fixed" open={open}>
          
            <DrawerIconBtn onClick={() => handleDrawerToggle()}>
                <DrawerToggleBtn open={open} />
            </DrawerIconBtn>
            <Toolbar />
        </MuiAppBar>
    );
}
