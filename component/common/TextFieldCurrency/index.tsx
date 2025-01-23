import { forwardRef, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import {
    Box,
    FormControl,
    InputAdornment,
    TextField,
    useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';

interface CustomProps {
    onChange: (event: { target: { name: string; value: any } }) => void;
    onChangeCustom: (value: {}) => void;
    name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, onChangeCustom, ...other } = props;

        const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

        const handleChange = (value: any) => {
            // Clear the existing timer
            if (timer) {
                clearTimeout(timer);
            }

            // Set a new timer to update the state after a delay (e.g., 500 milliseconds)
            const newTimer = setTimeout(() => {
                onChangeCustom(value);
            }, 60);

            // Save the timer for clearing it on the next change
            setTimer(newTimer);
        };

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={values => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.floatValue,
                        },
                    });
                    const value: any = {
                        target: {
                            name: props.name,
                            value: values.floatValue,
                        },
                    };
                    handleChange(value);
                }}
                decimalScale={2}
                fixedDecimalScale
                thousandSeparator
                valueIsNumericString
            />
        );
    },
);

export default function TextFieldCurrency({
    label,
    nameQuery,
    fullWidth,
    required,
    inputProps: { onChange, ...restInputProps },
    helperText,
    errorMsg,
    ...otherProps
}: any) {
    const theme = useTheme();
    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );
    const { control, watch, clearErrors } = useFormContext();
    const watchData = watch(nameQuery);

    return (
        <Controller
            control={control}
            name={nameQuery || ''}
            // defaultValue={params?.value}
            // disabled={disabled}
            rules={{ required }}
            render={({ field }) => (
                <FormControl variant="filled" fullWidth={fullWidth}>
                    <TextField
                        label={label}
                        id={otherProps.id}
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
                            inputComponent: NumericFormatCustom as any,
                            inputProps: {
                                onChangeCustom: (value: number) => {
                                    // onChange(value);
                                    clearErrors(`root.${nameQuery}`);
                                    field.onChange(value);
                                },
                                value: field?.value,
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    {defaultOption?.default_monetary_unit ===
                                    'Euro' ? (
                                        <span>&#x20AC;</span>
                                    ) : defaultOption?.default_monetary_unit ===
                                      'Pound' ? (
                                        <span>&#xa3;</span>
                                    ) : (
                                        <span>&#x24;</span>
                                    )}
                                </InputAdornment>
                            ),
                            autoComplete: 'off',
                            ...restInputProps,
                        }}
                        className={required ? 'required' : ''}
                        {...otherProps}
                    />
                </FormControl>
            )}
        />
    );
    return (
        <FormControl variant="filled" fullWidth={fullWidth}>
            <TextField
                label={label}
                id={otherProps.id}
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
                    inputComponent: NumericFormatCustom as any,
                    inputProps: {
                        onChangeCustom: (value: number) => {
                            onChange(value);
                        },
                        value: otherProps?.defaultValue,
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            {defaultOption?.default_monetary_unit === 'Euro' ? (
                                <span>&#x20AC;</span>
                            ) : defaultOption?.default_monetary_unit ===
                              'Pound' ? (
                                <span>&#xa3;</span>
                            ) : (
                                <span>&#x24;</span>
                            )}
                        </InputAdornment>
                    ),
                    autoComplete: 'off',
                    ...restInputProps,
                }}
                className={required ? 'required' : ''}
                {...otherProps}
            />
        </FormControl>
    );
}
