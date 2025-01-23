import { SelectProps } from '@mui/material/Select';

// export interface CustomSelectProps extends SelectProps<any> {
//     keyboardAction?: boolean;
//     options?: any;
//     enterPressHandler?: any;
//     inputProps: {
//         defaultValue?: string | number;
//         name?: string;
//     };
//     params: any;
//     updateCell?: any;
//     saveGridRows?: any;
//     updateRow?: any;
//     gridName?: any;
//     default_value?: any;
// }

export type CustomSelectProps = {
    keyboardAction?: boolean;
    options?: any;
    enterPressHandler?: any;
    inputProps: {
        defaultValue?: string | number;
        name?: string;
    };
    params: any;
    updateCell?: any;
    saveGridRows?: any;
    updateRow?: any;
    gridName?: any;
    default_value?: any;
} & SelectProps<any>;
