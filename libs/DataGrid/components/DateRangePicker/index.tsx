import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import {
    DateRangePicker,
    LocalizationProvider,
    // SingleInputDateRangeField
    DateRange,
} from '@mui/x-date-pickers-pro';

import { Controller, useFormContext } from 'react-hook-form';

const BasicDateRangePicker = ({
    inputProps: { defaultValue, name, ...otherInputProps },
}: any) => {
    const { control, setValue } = useFormContext();

    const [date, setDate] = useState<DateRange<Dayjs>>(
        defaultValue?.length
            ? [dayjs(defaultValue[0]), dayjs(defaultValue[1])]
            : [null, null],
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <DateRangePicker
                            {...field}
                            {...otherInputProps}
                            value={date}
                            onChange={newValue => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                setDate(newValue);
                                setValue(name, newValue);
                            }}
                            // slots={{
                            //   field: SingleInputDateRangeField,
                            // }}
                        />
                    );
                }}
            />
        </LocalizationProvider>
    );
};

export default BasicDateRangePicker;
