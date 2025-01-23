import * as React from 'react';
import Button from '@mui/material/Button';
import Modal, { ModalProps } from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

const StyledModal = styled(Modal)<ModalProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .Modal-Content': {
        background: 'red',
        height: '50%',
        width: '50%',
        padding: 25,
        borderRadius: 10,
        backgroundColor: theme.palette.background.default,
    },
}));

interface CustomModalProps extends ModalProps {}

const CustomModal = React.forwardRef((props: any, ref: any) => {
    const { children } = props;

    const [open, setOpen] = React.useState<boolean>(false);
    React.useImperativeHandle(
        ref,
        () =>
            ({
                modalHandler: setOpen,
            } as any),
    );
    const handleCloseModal = () => setOpen(false);

    return (
        <StyledModal open={open} onClose={handleCloseModal}>
            <div className="Modal-Content">
                <Button onClick={handleCloseModal}>X</Button>
                {children}
            </div>
        </StyledModal>
    );
});

export default CustomModal;
