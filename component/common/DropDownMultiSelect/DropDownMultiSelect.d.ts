import { SelectProps } from '@mui/material/Select';

// export interface CustomSelectProps extends SelectProps<any> {
//     keyboardAction?: boolean;
//     isReset?: boolean;
//     enterPressHandler?: any;
//     getVal?: any;
//     control?: any;
//     onBlur?: any;
//     name: string;
//     label: string;
//     required: boolean;
//     options: any[];
//     optionsUrl?: string;
//     helperText?: string;
//     error?: boolean;
//     disabled: boolean;
// }
//

export type CustomSelectProps = {
    keyboardAction?: boolean;
    isReset?: boolean;
    enterPressHandler?: any;
    getVal?: any;
    control?: any;
    onBlur?: any;
    name: string;
    label: string;
    required: boolean;
    options: any[];
    optionsUrl?: string;
    helperText?: string;
    error?: boolean;
    disabled: boolean;
} & SelectProps<any>;
