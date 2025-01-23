import { ButtonProps } from '@mui/material/Button';

export interface CustomButtonProps extends ButtonProps {
    onEsc?: () => void;
    onEnter?: () => void;
    keyboard?: string;
    name?:
        | 'ButtonIconLeft'
        | 'ButtonIconRight'
        | 'ButtonShortKey'
        | 'ButtonIconLeftShortKeyRight';
}
