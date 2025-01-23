import { ButtonProps } from '@mui/material/Button';
import { CustomButtonProps } from '../type';

export interface IconButtonProps extends CustomButtonProps {
    btnType: 'circle' | 'square';
}
