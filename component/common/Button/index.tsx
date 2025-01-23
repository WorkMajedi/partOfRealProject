import React, { useEffect, useRef, useState } from 'react';
import { useKeyPress } from 'ahooks';
import CircleIcon from '@mui/icons-material/Circle';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InboxIcon from '@mui/icons-material/Inbox';
import { useSelector } from 'react-redux';
import { SvgIcon } from '@mui/material';
import { StyledCustomButton } from './styles';
import { CustomButtonProps } from './type';
import { menuIcons } from '../../../assets/svg';

const CustomButton = ({
    onEsc,
    onEnter,
    keyboard,
    children,
    icon = '',
    onClick,
    is_show,
    name,
    isLoadingButton,
    ...otherProps
}: CustomButtonProps) => {
    const ref: any = useRef(null);
    useKeyPress(
        'Esc',
        () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onEsc && onEsc();
        },
        {
            target: ref,
        },
    );

    useKeyPress(
        'Enter',
        () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onEnter && onEnter();
        },
        {
            target: ref,
        },
    );

    const handleIconRender = () => {
        switch (icon) {
            case 'save':
                return <SaveOutlinedIcon />;
            case 'reset':
                return <RestartAltOutlinedIcon />;
            case 'close':
                return <CancelOutlinedIcon />;
            case 'export':
                return <FileDownloadOutlinedIcon />;
            case 'import':
                return <PublishOutlinedIcon />;
            case 'print':
                return <LocalPrintshopOutlinedIcon />;
            case 'new':
                return <AddOutlinedIcon />;
            case 'edit':
                return <BorderColorOutlinedIcon />;
            case 'delete':
                return <DeleteOutlineOutlinedIcon />;
            case 'clone':
                return <FileCopyOutlinedIcon />;
            case 'search':
                return <SearchIcon />;
            case 'generate':
                return <SellOutlinedIcon />;
            case 'back':
                return <UndoIcon />;
            case 'raw':
                return <AllInboxIcon />;
            case 'layers':
                return <ListAltIcon />;
            case 'inbox':
                return <InboxIcon />;
            default:
                if (icon && Object.hasOwn(menuIcons, icon)) {
                    // @ts-ignore
                    const icons = menuIcons[icon];
                    return (
                        <SvgIcon
                            component={icons}
                            inheritViewBox
                            sx={{
                                fontSize: 20,
                            }}
                        />
                    );
                }
                return <CircleIcon />;
        }
    };
    const [loading, setLoading] = React.useState(false);

    const handleOnClick = async (action: Function) => {
        setLoading(true);
        try {
            await action();
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    //= show btn in action bar in some page👇
    const showBtn = useSelector((state: any) => state?.ActionBar?.showBtn);
    const [show, setShow] = useState<boolean | undefined>(
        is_show === undefined ? true : is_show,
    );
    useEffect(() => {
        if (!!name && name === showBtn.name) return setShow(showBtn.isShow);
        setShow(is_show === undefined ? true : is_show);
    }, [is_show, name, show, showBtn]);

    if (!show) return null;
    //= ===================end=============👆

    return (
        <StyledCustomButton
            ref={ref}
            onClick={() => {
                if (!!onClick) {
                    handleOnClick(onClick);
                }
            }}
            {...(!!icon
                ? {
                      startIcon: handleIconRender(),
                  }
                : {})}
            {...(!!keyboard
                ? {
                      endIcon: <span className="keyboard">{keyboard}</span>,
                  }
                : {})}
            loading={isLoadingButton || loading}
            loadingPosition="end"
            disabled={otherProps?.disabled}
            {...otherProps}
        >
            <>{children}</>
        </StyledCustomButton>
    );
};

export default CustomButton;
