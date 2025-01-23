import React, { useEffect } from 'react';
import { SvgIcon, Tooltip, ListItemIcon, Grid, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenu } from 'redux/slices/sidbarMenu/sidebarMenuSlice';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { menuIcons } from 'assets/svg/index';
import {
    FirstMenuList,
    MuiListItemBtnFirst,
    MuiListItemFirst,
} from './DashBoard.styles';
import ThemeSwitch from './ThemeSwitch';

export default function FirstMenu({ open, handleDrawerToggle, routes }: any) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const activeMenu = useSelector(
        (state: any) => state?.MenuReducer?.activeMenu,
    );
    const permissionsList = useSelector(
        (state: any) => state?.permissions?.permissionsList,
    );

    const userData = useSelector((state: any) => state?.permissions?.userData);

    const handelClick = (item: any) => {
        const path =
            !!item?.children?.length && !!item?.children[0].children?.length
                ? `${item.children[0].children[0].parent}/${item.children[0].children[0].path}`
                : !!item?.children?.length &&
                    !item?.children[0].children?.length
                    ? `${item.children[0].parent}/${item.children[0].path}`
                    : '';

        if (!open) {
            handleDrawerToggle();
        }
        dispatch(setActiveMenu(item));
        navigate(`/${path}`);
    };
    const checkPermission = (item: any) => {
        return permissionsList?.[
            `${item?.screenPermissionKey}`
        ]?.permissions?.includes('view');
    };

    useEffect(() => {
        if (activeMenu === null) {
            dispatch(setActiveMenu(routes[0]));
        }
    }, []);
    return (
        <FirstMenuList>
            <Grid
                container
                direction="column"
                alignItems="center"
                height="100%"
                rowGap={4}
            >
                <Grid item>
                    <Box>
                        {!!routes?.length &&
                            routes
                                .filter(
                                    (item: any) =>
                                        item.name.toLowerCase() !== 'setting',
                                )
                                .map((item: any) => {
                                    // @ts-ignore
                                    const icon = menuIcons[item.icon];
                                    return !item.hideInMenu &&
                                        checkPermission(item) ? (
                                        <MuiListItemFirst
                                            key={item.id}
                                            disablePadding
                                        >
                                            <MuiListItemBtnFirst
                                                onClick={() =>
                                                    handelClick(item)
                                                }
                                                className={
                                                    activeMenu?.name ===
                                                        item?.name
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                <Tooltip
                                                    title={item.name}
                                                    placement="right-start"
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            minWidth: 0,
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        <SvgIcon
                                                            component={icon}
                                                            inheritViewBox
                                                            sx={{
                                                                fontSize: 20,
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                </Tooltip>
                                            </MuiListItemBtnFirst>
                                        </MuiListItemFirst>
                                    ) : (
                                        ''
                                    );
                                })}
                    </Box>
                </Grid>
                <Grid item marginTop="auto">
                    <Box className="settingWrapper">
                        <Box mb={2}>
                            <ThemeSwitch />
                        </Box>
                        <Box>
                            {!!routes?.length &&
                                routes
                                    .filter(
                                        (item: any) =>
                                            item.name.toLowerCase() ===
                                            'setting',
                                    )
                                    .map((item: any) => {
                                        // @ts-ignore
                                        const icon = menuIcons[item.icon];
                                        return !item.hideInMenu &&
                                            checkPermission(item) ? (
                                            <MuiListItemFirst
                                                key={item.id}
                                                disablePadding
                                            >
                                                <MuiListItemBtnFirst
                                                    onClick={() =>
                                                        handelClick(item)
                                                    }
                                                    className={
                                                        activeMenu?.name ===
                                                            item?.name
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    <Tooltip
                                                        title={item.name}
                                                        placement="right-start"
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                minWidth: 0,
                                                                justifyContent:
                                                                    'center',
                                                            }}
                                                        >
                                                            <SvgIcon
                                                                component={icon}
                                                                inheritViewBox
                                                                sx={{
                                                                    fontSize: 20,
                                                                }}
                                                            />
                                                        </ListItemIcon>
                                                    </Tooltip>
                                                </MuiListItemBtnFirst>
                                            </MuiListItemFirst>
                                        ) : (
                                            ''
                                        );
                                    })}
                        </Box>
                        <Avatar
                            alt={userData?.first_name || 'image'}
                            src={
                                !!userData?.image?.length
                                    ? process.env.REACT_APP_BASE_URL +
                                    userData.image[0].path
                                    : ''
                            }
                        />
                    </Box>
                </Grid>
            </Grid>
        </FirstMenuList>
    );
}
