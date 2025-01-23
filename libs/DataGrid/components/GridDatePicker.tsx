import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Controller, useFormContext } from 'react-hook-form';

const GridDatePicker = ({
    time,
    label,
    newDate,
    name,
    required,
    apiRef,
    params,
    updateCell,
    inputProps,
    ...otherProps
}: any) => {
    const [date, setDate] = useState<Dayjs | null>(null);
    const handle_changeDate = (newValue: any) => {
        updateCell({
            rowId: params.id,
            field: params.field,
            value: time
                ? dayjs(newValue).format('YYYY-MM-DD HH:MM')
                : dayjs(newValue).format('YYYY-MM-DD'),
        });

        setDate(newValue);
    };

    useEffect(() => {
        if (params?.value) setDate(params?.value);
    }, [params?.value]);

    const { control } = useFormContext();
    return (
        <Controller
            name={inputProps.name}
            control={control}
            render={({ field }) => {
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {time ? (
                            <DateTimePicker
                                ampm={false}
                                {...field}
                                value={date}
                                onChange={handle_changeDate}
                                renderInput={params => (
                                    <TextField defaultValue="" {...params} />
                                )}
                            />
                        ) : (
                            <DatePicker
                                {...field}
                                value={date}
                                onChange={handle_changeDate}
                                renderInput={params => (
                                    <TextField defaultValue="" {...params} />
                                )}
                            />
                        )}
                    </LocalizationProvider>
                );
            }}
        />
    );
};

export default GridDatePicker;
