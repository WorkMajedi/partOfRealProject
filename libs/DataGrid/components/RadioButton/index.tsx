import { RadioProps } from '@mui/material/Radio';
import { FormControlLabel } from '@mui/material';
import { StyledRadio } from 'component/common/RadioButton/styles';

interface CustomRadioProps extends RadioProps {
    label: string;
    value?: string | number;
    error?: any;
    parentRef?: any;
}

const CustomRadio = ({
    label,
    value,
    error,
    parentRef,
    ...otherProps
}: CustomRadioProps) => {
    return (
        <FormControlLabel
            ref={parentRef}
            value={value}
            control={<StyledRadio {...otherProps} />}
            label={label}
        />
    );
};

export default CustomRadio;
