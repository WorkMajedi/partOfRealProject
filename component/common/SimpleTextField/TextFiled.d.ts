import { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material';

type CustomTextFieldProps = TextFieldProps &
    OutlinedInputProps & {
        startIcon?: any;
        endIcon?: any;
        inputProps?: any;
        errorMsg?: string;
        fullWidth?: boolean;
        nameQuery: string;
    };
