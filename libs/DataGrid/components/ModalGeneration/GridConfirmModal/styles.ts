import { styled } from '@mui/material/styles';
import Modal, { ModalProps } from '@mui/material/Modal';

export const StyledConfirmModal = styled(Modal)<ModalProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    '& .Modal-Content': {
        borderTop: `5px solid ${theme.palette.warning.dark}`,
        width: '350px',
        //height: '300px',
        padding: 25,
        borderRadius: 10,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
    },
    '& .warningIcon': {
        fontSize: '4rem',
        color: theme.palette.warning.dark,
        marginBottom: 20,
    },
}));
