import { CheckboxProps } from '@mui/material/Checkbox';

export interface CustomCheckboxProps extends CheckboxProps {
    label?: string;
    legend?: string;
    error?: any;
    parentRef?: any;
}
