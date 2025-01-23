import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    List,
    ListItemButton,
    SvgIcon,
    Collapse,
    ListItemIcon,
    Tooltip,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { menuIcons } from 'assets/svg/index';

export default function SecondMenuItems({
    menuItem,
    drawerOpen,
    selectedPermission,
    handleDrawerToggle,
}: any) {
    const isExpandable = menuItem.children?.length > 0;
    const [subMenuToggle, setSubMenuToggle] = useState(false);
    const handleClick = () => {
        if (!drawerOpen) {
            handleDrawerToggle();
        }
        setSubMenuToggle(!subMenuToggle);
    };

    useEffect(() => {
        if (!drawerOpen) {
            setSubMenuToggle(false);
        }
    }, [drawerOpen]);
    const childPer =
        selectedPermission?.child?.[`${menuItem?.screenPermissionKey}`]
            ?.permissions || [];

    const MenuItemRoot = () => {
        // @ts-ignore
        const icon = menuIcons[menuItem.icon];
        return !menuItem.children?.length ? (
            <NavLink to={`/${menuItem.parent}/${menuItem.path}`}>
                <ListItemButton>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            alignItems: 'center',
                        }}
                    >
                        <Tooltip
                            title={menuItem.name}
                            placement="right-start"
                            disableHoverListener={drawerOpen}
                        >
                            <SvgIcon
                                component={icon}
                                inheritViewBox
                                sx={{
                                    fontSize: 25,
                                }}
                            />
                        </Tooltip>
                        <p className={drawerOpen ? 'show' : 'hide'}>
                            {menuItem.name}
                        </p>
                    </ListItemIcon>
                </ListItemButton>
            </NavLink>
        ) : (
            <>
                {childPer.includes('view') ? (
                    <ListItemButton
                        onClick={handleClick}
                    // className={!drawerOpen && 'somtething' ? 'active' : ''}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                alignItems: 'center',
                            }}
                        >
                            {drawerOpen ? (
                                <SvgIcon
                                    component={icon}
                                    inheritViewBox
                                    className="iconWrapper"
                                    sx={{
                                        fontSize: 25,
                                    }}
                                />
                            ) : (
                                <Tooltip
                                    title={menuItem.name}
                                    placement="right-start"
                                    disableHoverListener={drawerOpen}
                                >
                                    <SvgIcon
                                        component={icon}
                                        inheritViewBox
                                        sx={{
                                            fontSize: 25,
                                            color: 'transparent',
                                        }}
                                    />
                                </Tooltip>
                            )}
                        </ListItemIcon>
                        <p className={drawerOpen ? 'show' : 'hide'}>
                            <span>{menuItem.name}</span>
                            <ListItemIcon
                                className="arrowIconWrapper"
                                sx={{ justifyContent: 'flex-end' }}
                            >
                                {isExpandable && !subMenuToggle && (
                                    <KeyboardArrowDownIcon fontSize="small" />
                                )}
                                {isExpandable && subMenuToggle && (
                                    <KeyboardArrowUpIcon />
                                )}
                            </ListItemIcon>
                        </p>
                    </ListItemButton>
                ) : null}
            </>
        );
    };

    const MenuItemChildren = isExpandable ? (
        <Collapse in={subMenuToggle} timeout="auto" unmountOnExit>
            <List component="ul" disablePadding>
                {menuItem.children.map((child: any) => {
                    const isShowMenu =
                        childPer.length > 0 &&
                        childPer.includes(child?.tagPermissions?.[0]);
                    return !child.hideInMenu && isShowMenu ? (
                        <SecondMenuItems
                            menuItem={child}
                            key={child.id}
                            drawerOpen={drawerOpen}
                            handleDrawerToggle={handleDrawerToggle}
                        />
                    ) : (
                        ''
                    );
                })}
            </List>
        </Collapse>
    ) : null;

    return (
        <>
            {MenuItemRoot()}
            {MenuItemChildren}
        </>
    );
}
