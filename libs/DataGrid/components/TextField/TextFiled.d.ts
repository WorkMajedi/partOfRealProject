import { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material';

type CustomTextFieldProps = TextFieldProps &
    OutlinedInputProps & {
        startIcon?: any;
        endIcon?: any;
        inputType: 'text' | 'number' | 'password' | 'email';
        inputProps?: any;
        errorMsg?: string;
        fullWidth?: boolean;
        params?: any;
        updateCell?: any;
        saveGridRows?: any;
        updateRow?: any;
    };
