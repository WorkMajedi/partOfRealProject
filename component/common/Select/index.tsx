import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import { FormHelperText, InputLabel, MenuItem } from '@mui/material';
import { useKeyPress } from 'ahooks';
import { instance } from 'api/config';
import { useFormContext } from 'react-hook-form';

export const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,

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
        backgroundColor: theme.palette.background.paper,
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

export const generateDynamicOptions = async (url: string) => {
    const res = await instance.get(url);
    return res.data.results;
};

const CustomSelected = (props: any) => {
    const {
        id,
        size,
        options,
        label,
        disabled,
        getVal,
        isReset,
        onBlur,
        helperText,
        required,
        name = '',
    } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [selectOptions, setSelectOptions] = useState<any>([]);
    const [selected, setSelected] = useState(null);
    const { setValue } = useFormContext();

    useEffect(() => {
        if (Array.isArray(options)) {
            setSelectOptions(options);
        } else {
            generateDynamicOptions(options).then(res => {
                setSelectOptions(
                    res.map((i: any) => ({
                        value: i.id,
                        label: `${i.code} / ${i.description}`,
                        code: i.code,
                    })),
                );
            });
        }
    }, [options]);

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
    useEffect(() => {
        if (getVal && selected) {
            const select = selectOptions.find((i: any) => i.value === selected);
            getVal(select);
        }
    }, [selected]);

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
    useEffect(() => {
        if (isReset) {
            setValue(name, '');
            setSelected(null);
        }
    }, [isReset]);
    // useEffect(() => {
    //     if (typeof defaultValue === 'string' && selectOptions) {
    //         const selected = selectOptions.find(
    //             (e: any) =>
    //                 e?.code === defaultValue || e?.value === defaultValue,
    //         );
    //         setSelected(selected);
    //         setValue(name, 'Gal');
    //     } else {
    //         const selected = selectOptions.find(
    //             (e: any) =>
    //                 e?.code === defaultValue.code ||
    //                 e?.value === defaultValue.id,
    //         );
    //         setSelected(selected);
    //         setValue(name, selected?.value);
    //     }
    // }, [defaultValue]);

    return (
        <FormControl
            onClick={() => !disabled && setOpen(prev => !prev)}
            ref={ref}
            data-fieldType="SELECT"
            fullWidth
            disabled={disabled}
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
                required={required}
                labelId={id}
                id={`${name}-select`}
                // value={isReset ? '' : selected}
                onBlur={e =>
                    onBlur?.(
                        selectOptions.find(
                            (i: any) => i.value === e.target.value,
                        ),
                    )
                }
                inputProps={{
                    readOnly: true,
                    ...props.inputProps,
                    onChange: (e: any) => {
                        setSelected(e.target.value);
                    },
                    value: selected,
                }}
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
                {selectOptions?.length
                    ? selectOptions?.map(({ value, label }: any) => (
                          <MenuItem key={value} value={value}>
                              {label}
                          </MenuItem>
                      ))
                    : null}
            </StyledSelect>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};

export default CustomSelected;
