import React, { useRef } from 'react';
import { Typography, Box } from '@mui/material';
import { useKeyPress } from 'ahooks';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CustomButton from '../../Button';
import { CustomModalProps } from './type';
import { StyledConfirmModal } from './styles';

const GridConfirmModal = React.forwardRef(
    (props: CustomModalProps, ref: any) => {
        const {
            children,
            modalText,
            confirmText,
            cancelText,
            onAccept,
            onCancel,
            modalProps,
        } = props;

        const modalRef: any = useRef(null);
        const [open, setOpen] = React.useState<boolean>(false);
        React.useImperativeHandle(
            ref,
            () =>
                ({
                    modalHandler: setOpen,
                } as any),
        );
        const handleCloseModal = () => {
            onCancel && onCancel();
            setOpen(false);
        };

        useKeyPress(
            'enter',
            e => {
                if (onAccept && open) {
                    e.preventDefault();
                    onAccept();
                    handleCloseModal();
                }
            },
            {
                target: modalRef.current,
            },
        );

        useKeyPress(
            'esc',
            () => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                onCancel && onCancel();
            },
            {
                target: modalRef.current,
            },
        );

        return (
            <StyledConfirmModal
                {...modalProps}
                open={open}
                onClose={handleCloseModal}
            >
                <Box ref={modalRef} className="Modal-Content">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        <WarningAmberIcon className="warningIcon" />
                        <Typography variant="h1" gutterBottom>
                            {modalText || 'Are You Sure?'}
                        </Typography>
                        <Typography variant="h3" mb={8}>
                            You will not recover this item.
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <CustomButton
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                onAccept && onAccept();
                                handleCloseModal();
                            }}
                            variant="contained"
                            keyboard="Enter"
                        >
                            {confirmText || 'Confirm'}
                        </CustomButton>
                        <CustomButton
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                handleCloseModal();
                            }}
                            variant="outlined"
                            keyboard="Esc"
                        >
                            {cancelText || 'Cancel'}
                        </CustomButton>
                    </Box>
                    {children}
                </Box>
            </StyledConfirmModal>
        );
    },
);

export default GridConfirmModal;
