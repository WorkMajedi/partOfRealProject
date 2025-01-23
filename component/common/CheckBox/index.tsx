import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import SquareIcon from '@mui/icons-material/Square';
import { useTheme } from '@emotion/react';
import { StyledCheckBox } from './styles';
import { CustomCheckboxProps } from './type';

const CustomCheckBox = (props: CustomCheckboxProps) => {
    const { label, legend, error, parentRef } = props;
    const theme: any = useTheme();

    return (
        <FormGroup ref={parentRef}>
            <FormLabel sx={{ color: 'common.black' }} component="legend">
                {legend}
            </FormLabel>
            <FormControlLabel
                label={label}
                sx={{
                    '&.MuiFormControlLabel-root': {
                        marginInlineStart: '0px !important',
                    },
                    '&.MuiFormControlLabel-label': {
                        marginInlineStart: '20px !important',
                    },
                }}
                control={
                    <StyledCheckBox
                        icon={<SquareIcon />}
                        checkedIcon={<SquareIcon />}
                        {...props}
                        sx={{
                            '&.MuiCheckbox-root': {
                                border: `1px solid ${
                                    error
                                        ? theme.palette.error.main
                                        : theme.palette.grey[400]
                                } !important`,
                            },
                        }}
                    />
                }
            />
        </FormGroup>
    );
};

export default CustomCheckBox;
