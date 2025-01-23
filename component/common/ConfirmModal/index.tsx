import React, { useEffect, useRef } from 'react';
import Modal, { ModalProps } from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import { useKeyPress } from 'ahooks';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
    useLocation,
    useMatch,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { CustomButton } from '..';

const StyledModal = styled(Modal)<ModalProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    '& .Modal-Content': {
        borderTop: `5px solid ${theme.palette.info.dark}`,
        width: 350,
        padding: 25,
        borderRadius: 10,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    },
    '& .infoIcon': {
        fontSize: '4rem',
        color: theme.palette.info.dark,
    },
}));

interface CustomModalProps {
    modalText?: string;
    confirmText?: string;
    cancelText?: string;
    onAccept?: () => void;
    onCancel?: () => void;
    children?: any;
    modalProps?: ModalProps;
}

const ConfirmModal = React.forwardRef((props: CustomModalProps, ref: any) => {
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
    //----------------------------------------------------------------
    const { id } = useParams();
    const { pathname } = useLocation();
    const matchPath = useMatch(pathname);
    useEffect(() => {
        const isAddPage = pathname.includes('add');
        if (!id && isAddPage) {
            // onAccept && onAccept();
        }
    }, [id, pathname]);
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
        <StyledModal {...modalProps} open={open} onClose={handleCloseModal}>
            <Box ref={modalRef} className="Modal-Content">
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <RestartAltIcon className="infoIcon" />
                    <Typography variant="h1" gutterBottom>
                        {modalText || 'Are You Sure?'}
                    </Typography>
                    <Typography variant="h3" mb={8}>
                        Reset all inputs to default values.
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
        </StyledModal>
    );
});

export default ConfirmModal;
