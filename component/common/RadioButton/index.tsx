import React from 'react';
import { FormControlLabel } from '@mui/material';
import { useTheme } from '@emotion/react';
import { CustomRadioProps } from './TextFiled';
import { StyledRadio } from './styles';

const CustomRadio = (props: CustomRadioProps) => {
    const { label, value, error, parentRef } = props;
    const theme: any = useTheme();
    return (
        <FormControlLabel
            ref={parentRef}
            value={value}
            sx={{
                '&.MuiFormControlLabel-label': {
                    color: 'red !important',
                },
            }}
            control={
                <StyledRadio
                    sx={{
                        '&.MuiRadio-root span:nth-of-type(1)': {
                            border: `1px solid ${
                                error
                                    ? theme.palette.error.main
                                    : theme.palette.grey[600]
                            } !important`,
                        },
                    }}
                    color="secondary"
                    {...props}
                />
            }
            label={label}
        />
    );
};

export default CustomRadio;
