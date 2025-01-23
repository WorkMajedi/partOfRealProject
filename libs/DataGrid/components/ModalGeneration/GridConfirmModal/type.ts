import { ModalProps } from '@mui/material/Modal';

export interface CustomModalProps {
    modalText?: string;
    confirmText?: string;
    cancelText?: string;
    onAccept?: () => void;
    onCancel?: () => void;
    children?: any;
    modalProps?: ModalProps;
}
