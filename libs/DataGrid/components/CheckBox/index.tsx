import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { Controller, useFormContext } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import StyledCheckBox from 'component/common/CheckBox';

const CheckBox = ({
    label,
    error,
    size,
    params,
    disabled,
    inputProps: { name, defaultValue, ...otherInputProps },
}: any) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormControlLabel
                        label={label}
                        disabled={disabled}
                        classes={{
                            root: error ? 'Mui-error' : '',
                        }}
                        control={
                            <StyledCheckBox
                                {...field}
                                {...otherInputProps}
                                defaultChecked={params.value}
                                icon={<SquareRoundedIcon />}
                                checkedIcon={<SquareRoundedIcon />}
                                classes={{
                                    root: error ? 'Mui-error' : '',
                                }}
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: size || 24,
                                    },
                                }}
                            />
                        }
                    />
                );
            }}
        />
    );
};

export default CheckBox;
