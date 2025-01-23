import { SelectProps } from '@mui/material/Select';

export type CustomSelectProps = {
    id?: any;
    keyboardAction?: boolean;
    helperText?: string;
    isReset?: boolean;
    options?: any;
    enterPressHandler?: any;
    getVal?: any;
    name?: any;
    control?: any;
    onBlur?: any;
    url?: string;
    size?: any | number;
    label?: any | string;
    disabled?: boolean;
    defaultValue?: any;
    required?: boolean;
    error?: boolean;
} & SelectProps<any>;
