import { ButtonProps } from '@mui/material/Button';

export interface CustomButtonProps extends ButtonProps {
    onEsc?: () => void;
    onEnter?: () => void;
    keyboard?: string;
    icon?: string;
    name?: string;
    is_show?: boolean;
    isLoadingButton?: boolean;
}
