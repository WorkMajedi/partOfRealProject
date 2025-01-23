import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import { InputLabel, MenuItem } from '@mui/material';
import { useKeyPress } from 'ahooks';

export const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
    borderRadius: 4,
    backgroundColor: theme.palette.background.default,

    '&:focus-within': {
        boxShadow: `0 0 0 2px ${theme.palette.info.lighter}`,
        borderColor: `${theme.palette.primary.main}!important`,
        borderWidth: `1px!important`,
    },
    '&.Mui-focused': {
        boxShadow: `0 0 0 2px ${theme.palette.info.lighter}`,
        borderColor: `${theme.palette.primary.main}!important`,
        borderWidth: `1px!important`,
    },

    '&.MuiInputBase-root:hover': {
        border: `1px solid ${theme.palette.grey[500]}`,
    },
    '& input': {
        backgroundColor: theme.palette.background.default,
        padding: '14px 16px',
        color: theme.palette.grey[900],
        '&::placeholder': {
            color: theme.palette.grey[500],
        },
    },
    '& .MuiSelect-select': {
        padding: '11px',
    },
    '&.MuiInputBase-root': {
        border: `1px solid ${theme.palette.grey[300]}`,
    },
    '&.MuiInputBase-root.Mui-focused': {
        border: `1px solid ${theme.palette.secondary.main}`,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent!important',
    },
    '& .MuiFormHelperText-root': {
        margin: '4px 0',
    },
    '& .Mui-error': {
        '& input': {
            color: theme.palette.error.main,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.error.main}!important`,
            borderWidth: `1px!important`,
        },
    },
}));

const CustomDynamicSelected = (props: any) => {
    const { id, size, options, label } = props;
    const [open, setOpen] = useState<boolean>(false);

    const ref: any = useRef();
    useKeyPress(
        'space',
        () => {
            setOpen(!open);
        },
        {
            target: ref,
        },
    );

    useKeyPress(
        'Enter',
        (e: any) => {
            const dropDownRef: any = document.querySelector('.MuiMenu-list');
            if (
                // e.path?.includes(ref.current) ||
                e.path?.includes(dropDownRef) ||
                (dropDownRef && [...dropDownRef?.children]?.includes(e.target))
            ) {
                setOpen(false);
            }
        },
        {
            // target: ref?.current?.parentElement,
        },
    );
    return (
        <FormControl
            onClick={() => setOpen(prev => !prev)}
            ref={ref}
            data-fieldType="SELECT"
            fullWidth
        >
            {label && (
                <InputLabel
                    sx={{
                        top: size ? '-6px' : '-5px',
                        background: t => t.palette.background.default,
                        '&.MuiFormLabel-filled': {
                            top: '0!important',
                        },
                        '&.Mui-focused': {
                            top: 0,
                            color: t => t.palette.grey[800],
                        },
                    }}
                    id={id}
                >
                    {label}
                </InputLabel>
            )}
            <StyledSelect
                {...props}
                open={open}
                // @TODO
                // MenuProps={{
                //     PaperProps: {
                //         sx: {
                //             boxShadow: '0px 7px 20px rgba(0, 0, 0, 0.15)',
                //             borderRadius: '4px',
                //             top: '204px !important',
                //             '& .MuiMenuItem-root': {
                //                 padding: 2,
                //             },
                //         },
                //     },
                // }}
            >
                {options?.map(({ value, label }: any) => (
                    <MenuItem key={value} value={value}>
                        {label}
                    </MenuItem>
                ))}
            </StyledSelect>
        </FormControl>
    );
};

export default CustomDynamicSelected;
