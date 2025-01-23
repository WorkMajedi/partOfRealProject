import { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers';
import {
    Box,
    FilledTextFieldProps,
    OutlinedTextFieldProps,
    StandardTextFieldProps,
    TextField,
    useTheme,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const MaterialUIPickers = ({
    time,
    label,
    newDate,
    name,
    required,
    disabled,
    errorMsg,
    helperText,
    error,
    inputProps,
    defaultValue,
}: any) => {
    const theme = useTheme();
    const { control, setValue } = useFormContext();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [date, setDate] = useState<Dayjs | null | string>(() =>
        defaultValue && time
            ? dayjs(defaultValue).format('MM-DD-YYYY HH:mm')
            : defaultValue && !time
                ? dayjs(defaultValue).format('MM-DD-YYYY')
                : newDate && time
                    ? dayjs(new Date()).format('MM-DD-YYYY HH:mm')
                    : newDate && !time
                        ? dayjs(new Date()).format('MM-DD-YYYY')
                        : null,
    );

    useEffect(() => {
        setValue(name, date || null);
    }, [date, name, setValue]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, [date, name]);

    const handleOnchange = (
        value: Dayjs | null | string,
        onChange: any,
        displayFormat: string,
    ) => {
        if (value === null || value === '') {
            setDate(null);
            onChange(null);
        } else if (value) {
            const backendFormat = time
                ? dayjs(value).format('YYYY-MM-DD HH:mm')
                : dayjs(value).format('YYYY-MM-DD');
            setDate(dayjs(value).format(displayFormat)); // Set display format
            onChange(backendFormat || null); // Send backend format
        }
    };
    useEffect(() => {
        if (defaultValue) {
            const backendFormat = time
                ? dayjs(defaultValue).format('YYYY-MM-DD HH:mm')
                : dayjs(defaultValue).format('YYYY-MM-DD');
            setValue(name, backendFormat || null);
        }
    }, [defaultValue]);

    const renderInput = (
        params:
            | FilledTextFieldProps
            | OutlinedTextFieldProps
            | StandardTextFieldProps,
        onChange: any,
    ) => {
        return (
            <TextField
                {...params}
                {...inputProps}
                disabled={disabled}
                style={{ width: '100%' }}
                required={required}
                defaultValue=""
                error={error}
                helperText={
                    <Box
                        component="span"
                        color={
                            error
                                ? theme.palette.error.main
                                : theme.palette.grey[800]
                        }
                    >
                        {error && Boolean(errorMsg) ? errorMsg : helperText}
                    </Box>
                }
                // inputRef={inputRef}
                onKeyDown={event => {
                    if (!(event.target as HTMLInputElement).value)
                        onChange(null);
                    if (event?.key === 'Enter') {
                        if (!(event.target as HTMLInputElement).value)
                            return onChange(null);
                        onChange((event.target as HTMLInputElement).value);
                    }
                }}
                onFocus={event => {
                    if (!(event.target as HTMLInputElement).value)
                        onChange(null);
                }}
                onBlur={event => {
                    if (!(event.target as HTMLInputElement).value)
                        onChange(null);
                }}
            />
        );
    };

    return (
        <div ref={inputRef}>
            <Controller
                control={control}
                name={name}
                rules={{ required }}
                defaultValue={date}
                render={({ field }) => {
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {!time ? (
                                <DatePicker
                                    label={label}
                                    disableOpenPicker={disabled}
                                    inputFormat="MM-DD-YYYY" // Display format
                                    value={field.value}
                                    onChange={newValue =>
                                        handleOnchange(
                                            newValue,
                                            field.onChange,
                                            'MM-DD-YYYY',
                                        )
                                    }
                                    renderInput={params => {
                                        return renderInput(
                                            params,
                                            field.onChange,
                                        );
                                    }}
                                />
                            ) : (
                                <DateTimePicker
                                    ampm={false}
                                    label={label}
                                    disableOpenPicker={disabled}
                                    inputFormat="MM-DD-YYYY HH:mm" // Display format
                                    value={field.value}
                                    onChange={newValue =>
                                        handleOnchange(
                                            newValue,
                                            field.onChange,
                                            'MM-DD-YYYY HH:mm',
                                        )
                                    }
                                    renderInput={params =>
                                        renderInput(params, field.onChange)
                                    }
                                />
                            )}
                        </LocalizationProvider>
                    );
                }}
            />
        </div>
    );
};

export default MaterialUIPickers;
