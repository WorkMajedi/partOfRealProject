import { RadioProps } from '@mui/material/Radio';

export interface CustomRadioProps extends RadioProps {
    label: string;
    value?: string | number;
    error?: any;
    parentRef?: any;
}
