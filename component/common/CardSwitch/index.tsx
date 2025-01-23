import { IProps } from 'ahooks/lib/useWhyDidYouUpdate';
import { FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { useTheme } from '@emotion/react';
import { StyledSwitch } from './styles';
import { useState } from 'react';

const CardSwitch = ({
    color,
    disabled,
    label,
    defaultValue,
    inputProps,
    helperText,
    error,
    required,
    ...otherProps
}: IProps) => {
    const theme: any = useTheme();
    const [focused, setFocused] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setFocused(true);
    };

    const handleMouseLeave = () => {
        setFocused(false);
    };
    return (
        <FormControl variant="standard" fullWidth error={error}>
            <FormControlLabel
                sx={{
                    minHeight: '54px',
                    display: 'flex',
                    paddingRight: '0',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row-reverse',
                    borderRadius: '4px!important',
                    border: t =>
                        !focused
                            ? `1px solid ${t.palette.grey[300]}`
                            : `2px solid ${theme.palette.primary.main}!important`,
                    boxShadow: focused
                        ? `-1px 1px 4px 4px ${theme.palette.primary[20]}`
                        : 'none',
                    mr: 0,
                    ml: 0,
                    color: theme.palette.grey.main,
                    padding: '12px',
                    '&.Mui-disabled': {
                        background: theme.palette.grey[200],
                    },
                    '&.Mui-required': {
                        '& .MuiFormControlLabel-asterisk': {
                            color: theme.palette.error.main,
                        },
                    },
                    '&.Mui-error': {
                        border: `1px solid ${theme.palette.error.main}`,
                        '& .MuiFormControlLabel-label': {
                            color: theme.palette.error.main,
                        },
                        '& .MuiSwitch-thumb': {
                            backgroundColor: theme.palette.error.main,
                        },
                        '& .MuiSwitch-track': {
                            backgroundColor: theme.palette.error.light,
                        },
                    },
                    '& .MuiFormControlLabel-label.Mui-disabled': {
                        color: theme.palette.grey[500],
                    },
                    '&:focus-within': {
                        border: `1px solid ${theme.palette.primary[900]}!important`,
                    },
                    '& .MuiFormControl-root': {
                        color: `${theme.palette.grey.main}!important`,
                        '&:hover': {
                            // border: `1px solid ${theme.palette.grey[600]} !important`,
                        },
                    },

                    '&:hover': {
                        border: `1px solid ${theme.palette.primary.light}`,
                    },
                }}
                // @ts-ignore
                required={required}
                control={
                    <StyledSwitch
                        disableRipple
                        inputProps={inputProps}
                        checked={defaultValue}
                        className={disabled ? 'disabled' : ''}
                        onFocus={handleMouseEnter}
                        onBlur={handleMouseLeave}
                        sx={{
                            '& .Mui-checked .MuiSwitch-thumb': {
                                backgroundColor:
                                    color === 'secondary'
                                        ? 'secondary.main'
                                        : color === 'success'
                                        ? 'success.main'
                                        : 'primary.main',
                            },
                        }}
                        disabled={disabled}
                        {...otherProps}
                    />
                }
                labelPlacement="start"
                label={label}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
export default CardSwitch;
