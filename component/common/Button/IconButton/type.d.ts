import { ButtonProps } from '@mui/material';

export interface IconButtonProps extends ButtonProps {
    btnType: 'circle' | 'square';
    onEsc?: () => void;
    onEnter?: () => void;
}
