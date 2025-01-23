import React, { FC, useEffect, useState } from 'react';
import { Alert, Box } from '@mui/material';

interface IProps {
    onClose?: () => void;
    onOpen?: () => void;
    open?: boolean;
    isShow?: boolean;
    message?: string;
    isAShowAlways?: boolean;
    children?: React.ReactElement | any;
    severity: 'error' | 'warning' | 'info' | 'success';
}

const CuAlert: FC<IProps> = ({
    onClose,
    isShow,
    message,
    isAShowAlways,
    children,
    severity,
    ...props
}) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        if (onClose) {
            onClose?.();
        }
        if (!isAShowAlways) {
            setOpen(false);
        }
    };
    useEffect(() => {
        if (isShow) {
            setOpen(isShow);
        } else {
            setOpen(false);
        }
    }, [isShow]);
    if (!open) {
        return null;
    }
    return (
        <Box p={2}>
            <Alert severity={severity} onClose={handleClose} {...props}>
                {message || children}
            </Alert>
        </Box>
    );
};

export default CuAlert;
