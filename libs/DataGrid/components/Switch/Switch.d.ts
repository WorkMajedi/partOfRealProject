import { SwitchProps } from '@mui/material/Switch';

export interface CustomSwitchProps extends SwitchProps {
    variant?: 'primary' | 'secondary';
    label?: any;
    parentRef?: any;
    error?: boolean;
    helperText?: string;
    params?: any;
    updateRow?: any;
    apiRef?: any;
    saveGridRows?: any;
}
