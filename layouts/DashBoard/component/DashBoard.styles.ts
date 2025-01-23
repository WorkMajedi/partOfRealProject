import { CSSObject, styled, Theme } from '@mui/material/styles';
import { AppBarProps } from '@mui/material/AppBar/AppBar';
import {
    Box,
    ListItemButton,
    IconButton,
    AppBar,
    Drawer,
    ListItem,
    GridProps,
    Grid,
} from '@mui/material';

export const drawerWidth: number = 320;
export const drawerWidthClose: number = 132;
const paddingDrawerAndMain: number = 3;
const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: drawerWidthClose,
    },
});

export const DrawerIconBtn = styled(IconButton)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 5,
    position: 'absolute',
    left: -18,
    top: 50,
    display: 'flex',
    borderRadius: '7.183px',
    // @ts-ignore
    background: theme.palette.sideMenu.secondMenu.bg,
    // @ts-ignore
    ...(theme.name === 'DARK'
        ? {
            // @ts-ignore
            border: `0.898px solid ${theme.palette.sideMenu.secondMenu.text}`,
        }
        : {
            // @ts-ignore
            border: `0.898px solid ${theme.palette.grey[300]}`,
        }),
    padding: 6,
    '&:hover': {
        // @ts-ignore
        background: theme.palette.sideMenu.secondMenu.bg,
    },
}));

interface CustomAppBarProps extends AppBarProps {
    open?: boolean;
}
export const MuiAppBar = styled(AppBar, {
    shouldForwardProp: prop => prop !== 'open',
})<CustomAppBarProps>(({ theme, open }) => ({
    background: theme.palette.background.paper,
    marginTop: 0,
    zIndex: 1300,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${drawerWidthClose}px + 2px)`,
    // right: theme.spacing(paddingDrawerAndMain),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px + 2px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    '&.MuiPaper-elevation': {
        marginTop: 0,
        borderRadius: 0,
    },

    '& .MuiToolbar-root': {
        paddingLeft: 35,
    },
}));

export const MuiDrawer = styled(Drawer, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),

    '& .MuiPaper-root.MuiPaper-elevation': {
        padding: 0,
        margin: 0,
        borderRadius: 0,
        // direction: 'rtl',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '64px 1fr',
        gridColumnGap: '0px',
        gridRowGap: '0px',
        // '&  *': {
        //     direction: 'ltr',
        // },
    },
}));

export const SideMenu = styled(Box)(({ theme }) => {
    return {
        display: 'flex',
        gap: 1,
        // @ts-ignore
        background: theme.palette.sideMenu.secondMenu.bg,
        '& .firstMenu': {
            background: '#001924',
        },
        '& .secondMenu': {
            width: '100%',
            '& .MuiListItemIcon-root': {
                '& .iconWrapper': {
                    // @ts-ignore
                    color: theme.palette.sideMenu.secondMenu.icon,
                },
            },
        },
        '@media screen and (max-height: 500px)': {
            height: 'auto',
        },
    };
});

export const DrawerHeaderStyle = styled('div')(({ theme }) => ({
    // @ts-ignore
    backgroundColor: theme.palette.sideMenu.title.bg,
    // @ts-ignore
    ...(theme.name === 'DARK'
        ? { borderBottom: '0.898px  solid #757784' }
        : {}),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 14,
    padding: theme.spacing(3, 4),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    '& p': {
        // fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        textTransform: 'capitalize',
        margin: 0,
    },
    '& .title': {
        color: '#FFF',
        fontSize: '12.57px',
        fontWeight: 600,
        letterSpacing: '0.251px',
    },
    '& .subTitle': {
        color: '#8E8E93',
        textAlign: 'justify',
        fontSize: '8.978px',
        fontWeight: 400,
        letterSpacing: '-0.09px',
    },
    '& .show': {
        visibility: 'visible',
        opacity: 1,
        width: '100%',
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    '& .hide': {
        visibility: 'hidden',
        opacity: 0,
        width: 0,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

export const FirstMenuList = styled(Box)(() => ({
    padding: '25px 12px',

    height: '100%',
    '& .MuiListItem-root': {
        marginBottom: 6,
    },
    '& .settingWrapper': {
        marginRight: 0,
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 26,
    },
}));

interface CustomListProps extends GridProps {
    open?: boolean;
}
export const SecondMenuList = styled(Grid, {
    shouldForwardProp: prop => prop !== 'open',
})<CustomListProps>(({ theme, open }) => ({
    padding: '25px 12px',
    width: 'inherit',
    height: '100%',
    '& .menuHeader': {
        width: '100%',
        '& p': {
            color: '#0C0C0C',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.28px',
            textTransform: 'capitalize',
        },
        '& .MuiDivider-root': {
            margin: '15px 0',
        },
    },

    '& .MuiListItemButton-root': {
        width: `${open ? '100%' : '45px'}`,
        padding: 10,
        borderRadius: 6,
        marginBottom: 6,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '&:hover': {
            // @ts-ignore
            background: theme.palette.sideMenu.secondMenu.hover.bg,
            '& p': {
                // @ts-ignore
                color: theme.palette.sideMenu.secondMenu.hover.text,
                '& .arrowIconWrapper ': {
                    // @ts-ignore
                    color: theme.palette.sideMenu.secondMenu.hover.text,
                },
            },
        },
        '&.active': {
            // @ts-ignore
            background: theme.palette.sideMenu.secondMenu.hover.bg,
            '& svg path': {
                fill: '#0C0C0C',
            },
        },
    },
    '& .active': {
        '& .MuiListItemButton-root': {
            background: 'rgba(12, 12, 12, 0.05)',
            '& p': {
                color: '#0C0C0C',
            },
            '& svg path': {
                fill: '#0C0C0C',
            },
        },
    },

    '& .MuiListItem-root': {
        marginBottom: 6,
    },

    '& a': {
        textDecoration: 'none',
    },

    '& p': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: `0 0 0 ${open ? '6px' : '0'}`,
        // @ts-ignore
        color: theme.palette.sideMenu.secondMenu.text,
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '-0.06px',
        textTransform: 'capitalize',
        '& .arrowIconWrapper ': {
            // @ts-ignore
            color: theme.palette.sideMenu.secondMenu.text,
        },
        '&.show': {
            visibility: 'visible',
            opacity: 1,
            width: '100%',
            transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        '&.hide': {
            visibility: 'hidden',
            opacity: 0,
            width: 0,
            transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    },

    '& .MuiCollapse-root': {
        '& svg': {
            opacity: 0,
            visibility: 'hidden',
        },
    },

    '& .logOut': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .name': {
            color: '#0C0C0C',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.28px',
            textTransform: 'capitalize',
            marginBottom: 4,
        },
        '& .id': {
            color: '#AEAEB2',
            textAlign: 'justify',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.1px',
            textTransform: 'capitalize',
        },
        '& .MuiButtonBase-root': {
            padding: 6,
            borderRadius: 6,
            transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            '&:hover': {
                background: 'rgba(12, 12, 12, 0.05)',
            },
        },
    },

    '& .show': {
        visibility: 'visible',
        opacity: 1,
        width: '100%',
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    '& .hide': {
        visibility: 'hidden',
        opacity: 0,
        width: 0,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

export const MuiListItemFirst = styled(ListItem)(() => ({
    minHeight: 40,
}));

export const MuiListItemBtnFirst = styled(ListItemButton)(({ theme }) => ({
    '&.MuiButtonBase-root': {
        borderRadius: 5,
        justifyContent: 'flex-start',
        padding: 8,
    },
    transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    '& svg path': {
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.10)',
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '& svg path': {
            fill: '#FFFFFF',
            transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    },
    '&.active': {
        background: 'rgba(255, 255, 255, 0.20)',
        '& svg path': {
            fill: '#FFFFFF',
        },
    },
}));

export const Main = styled('main', {
    shouldForwardProp: prop => prop !== 'open',
})<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    position: 'relative',
    padding: theme.spacing(paddingDrawerAndMain),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        width: `calc(100% - ${drawerWidth}px)`,
    }),
}));
