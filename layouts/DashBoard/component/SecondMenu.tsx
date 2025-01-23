import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { Box } from '@mui/system';
import { ButtonBase, Grid, SvgIcon } from '@mui/material';
import { LogOut } from 'assets/svg';
import { useNavigate } from 'react-router-dom';
import { logout } from 'redux/slices/permissions/permissionsSlice';
import { SecondMenuList } from './DashBoard.styles';
import SecondMenuItems from './SecondMenuItems';

export default function SecondMenu({ open, handleDrawerToggle }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state: any) => state?.permissions?.userData);
    const activeMenu = useSelector(
        (state: any) => state?.MenuReducer?.activeMenu,
    );
    const permissionsList = useSelector(
        (state: any) => state?.permissions?.permissionsList,
    );
    const subMenu =
        activeMenu?.children &&
        activeMenu?.children.filter((e: any) => !e.hideInMenu);
    const selectedPermission =
        permissionsList?.[`${activeMenu?.screenPermissionKey}`];

    return (
        <SecondMenuList
            container
            direction="column"
            alignItems="flex-start"
            flexWrap="nowrap"
            height="100%"
            className="label"
            open={open}
        >
            {/* <Grid item width={'100%'}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        className={`menuHeader`}
                    >
                        <p className={`${open ? 'show' : 'hide'}`}>
                            {activeMenu?.label}
                        </p>
                        <Divider className={`${open ? 'show' : 'hide'}`} />
                    </Box>
                </Grid> */}
            {selectedPermission && (
                <>
                    <Grid item xs={11} width="100%">
                        {!!subMenu?.length &&
                            subMenu?.map((item: any) => (
                                <SecondMenuItems
                                    key={item.id}
                                    menuItem={item}
                                    drawerOpen={open}
                                    selectedPermission={selectedPermission}
                                    handleDrawerToggle={handleDrawerToggle}
                                />
                            ))}
                    </Grid>
                    <Grid
                        item
                        xs={1}
                        width="100%"
                        display="flex"
                        alignItems="flex-end"
                    >
                        <Box className={`logOut ${open ? 'show' : 'hide'}`}>
                            <Box>
                                <p className="name">
                                    {userData?.first_name || ''}{' '}
                                    {userData?.last_name || ''}
                                </p>
                                <p className="id">@{userData?.username}</p>
                            </Box>
                            <ButtonBase
                                onClick={() => {
                                    dispatch(logout());
                                    navigate('/login', { replace: true });
                                }}
                            >
                                <SvgIcon component={LogOut} inheritViewBox />
                            </ButtonBase>
                        </Box>
                    </Grid>
                </>
            )}
        </SecondMenuList>
    );
}
