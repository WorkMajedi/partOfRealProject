import * as React from 'react';
import { DialogProps } from '@mui/material/Dialog';

export interface IProps {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
    maxWidth: DialogProps['maxWidth'];
    fullWidth?: boolean;
    openModal?: () => void;
    open: boolean;
    closeModal?: () => void;
    onSave?: () => void;
    onReset?: () => void;
    childButton?: React.ReactNode;
    onSaveClose?: boolean;
    search?: boolean;
    loading?: boolean;
    disabled?: boolean;
}
