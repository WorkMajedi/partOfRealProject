import { styled } from '@mui/material/styles';

export const InputSwitch = styled('input')({
    display: 'none',
});

export const LabelSwitch = styled('label')(({ theme }) => ({
    display: 'block',
    width: '39px',
    height: '22px',
    backgroundColor: '#757784',
    borderRadius: '100px',
    position: 'relative',
    cursor: 'pointer',
    transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
}));

export const CircleSwitch = styled('div')(({ theme }) => ({
    content: "''",
    width: '18px',
    height: '18px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    borderRadius: '70px',
    top: '50%',
    right: 12,
    transform: 'translate(50%, -50%)',
    overflow: 'hidden',
    transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
}));

export const Switch = styled('div')(({ theme }) => ({
    transform: 'rotate(-90deg)',
    '& i': {
        width: 18,
        height: 18,
        position: 'absolute',
        top: '50%',
        right: -4,
        transform: 'translate(0, -50%)',
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    '& svg': {
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    '& .moon': {
        width: 10,
        height: 10,
        transform: 'translateY(+30px)',
        visibility: 'hidden',
        opacity: 0,
    },

    '& input:checked + label .circle': {
        right: '100%',
        transform: 'translate(120%, -50%)',
    },
    '& input:checked + label': {
        backgroundColor: '#003B5B',
    },

    '& input:checked + label i .sun': {
        transform: 'translateY(+30px)',
        visibility: 'hidden',
        opacity: 0,
    },
    '& input:checked + label i .moon': {
        transform: 'translateY(0)',
        visibility: 'visible',
        opacity: '1',
    },
}));
