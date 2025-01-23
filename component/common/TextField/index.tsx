import { useEffect, useState } from 'react';
import {
    FormControl,
    ButtonBase,
    Box,
    useTheme,
    TextField,
} from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// @ts-ignore
import { useFormContext } from 'react-hook-form';
import { CustomTextFieldProps } from './TextFiled';

// @ts-ignore
const CustomTextField = ({
    required,
    startIcon,
    endIcon,
    inputProps,
    helperText,
    type,
    fullWidth,
    errorMsg,
    nameQuery,
    ...otherProps
}: CustomTextFieldProps) => {
    const theme = useTheme();
    const [customType, setCustomType] = useState(type);

    const { clearErrors, watch } = useFormContext();

    const watchValueField = watch(nameQuery);
    useEffect(() => {
        setCustomType(type);
    }, [type]);
    useEffect(() => {
        if (!!watchValueField && clearErrors) {
            setTimeout(() => {
                clearErrors(`root.${nameQuery}`);
            }, 0);
        }
    }, [watchValueField]);
    return (
        <FormControl variant="filled" fullWidth={fullWidth}>
            <TextField
                id={otherProps.id}
                type={customType}
                required={required}
                color="secondary"
                helperText={
                    <Box
                        component="span"
                        color={
                            otherProps.error
                                ? theme.palette.error.main
                                : theme.palette.grey[800]
                        }
                    >
                        {otherProps.error && Boolean(errorMsg)
                            ? errorMsg
                            : helperText}
                    </Box>
                }
                InputProps={{
                    startAdornment: startIcon,
                    endAdornment:
                        type === 'password' ? (
                            <ButtonBase
                                onClick={() => {
                                    if (customType === 'text') {
                                        setCustomType('password');
                                    } else {
                                        setCustomType('text');
                                    }
                                }}
                            >
                                {customType === 'text' ? (
                                    <RemoveRedEyeOutlinedIcon />
                                ) : (
                                    <VisibilityOffOutlinedIcon />
                                )}
                            </ButtonBase>
                        ) : (
                            endIcon
                        ),
                    autoComplete: 'off',
                    ...inputProps,
                }}
                className={required ? 'required' : ''}
                sx={{
                    '& input': {
                        paddingLeft: startIcon ? '9px' : '16px',
                    },
                }}
                {...otherProps}
            />
        </FormControl>
    );
};

// @ts-ignore
export default CustomTextField;
