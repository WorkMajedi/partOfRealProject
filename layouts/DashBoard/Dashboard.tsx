import { Box, Grid, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleMenu } from 'redux/slices/sidbarMenu/sidebarMenuSlice';
import * as React from 'react';
import DrawerHeader from './component/DrawerHeader';
import FirstMenu from './component/FirstMenu';
import SecondMenu from './component/SecondMenu';
import { Main, MuiDrawer, SideMenu } from './component/DashBoard.styles';
import AppBar from './component/AppBar';

export default function Dashboard({ routes, children }: any) {
    const theme = useTheme();
    const dispatch = useDispatch();

    const open = useSelector((state: any) => state?.MenuReducer?.toggleBtn);

    const handleDrawerToggle = () => {
        dispatch(setToggleMenu(!open));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                // @ts-ignore
                background: theme.palette.background.default,
            }}
        >
            <AppBar open={open} handleDrawerToggle={handleDrawerToggle} />
            <MuiDrawer
                variant="permanent"
                open={open}
                style={{
                    display: 'flex',
                }}
            >
                <DrawerHeader open={open} />
                <SideMenu>
                    <Box className="firstMenu">
                        <FirstMenu
                            handleDrawerToggle={handleDrawerToggle}
                            open={open}
                            routes={routes}
                        />
                    </Box>
                    <Box className="secondMenu">
                        <SecondMenu
                            open={open}
                            handleDrawerToggle={handleDrawerToggle}
                        />
                    </Box>
                </SideMenu>
            </MuiDrawer>
            <Main open={open}>
                <Grid
                    container
                    marginTop={18}
                    justifyContent={'space-between'}
                    height={'100%'}
                >
                    {children}
                </Grid>
            </Main>
        </Box>
    );
}
