import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const BasicDateRangePicker = (props: any) => {
    const [value, setValue] = useState<DateRange<Dayjs> | null>([null, null]);

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{ start: 'Check-in', end: 'Check-out' }}
        >
            <DateRangePicker
                value={value}
                {...props}
                onChange={(newValue: any) => {
                    setValue(newValue);
                }}
            />
        </LocalizationProvider>
    );
};

export default BasicDateRangePicker;
