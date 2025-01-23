import React, { useEffect, useRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useKeyPress } from 'ahooks';
import { instance } from 'api/config';
import { Controller, useFormContext } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';

export const generateDynamicOptions = async (
    url: string,
    params?: string | null,
    sort_by?: any,
) => {
    const ordering = `${sort_by?.order === 'asc' ? '' : '-'}${
        sort_by?.field ?? 'update_on'
    }`;
    const res = await instance.get(
        params ? url + params : url + `?ordering=${ordering}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            params: { page_size: 250 },
        },
    );
    return res.data.results;
};

const DropDown = ({
    size,
    options = [],
    label,
    disabled,
    getVal,
    isReset,
    onBlur,
    defaultValue,
    name = '',
    control,
    required,
    helperText,
    error,
    args,
    typeDropDown = 'static',
    ...otherProps
}: any) => {
    const { setValue, getValues, clearErrors, watch } = useFormContext();
    const [open, setOpen] = useState<boolean>(false);
    const { id } = useParams();
    const [selectOptions, setSelectOptions] = useState<any>([]);
    const [selected, setSelected] = useState<string | any>(
        getValues(name) || defaultValue,
    );
    const [searchParams] = useSearchParams();
    const paramsDropdown = searchParams.get('AutoDropdown');
    const valueSelected = watch(name);
    useEffect(() => {
        if (Array.isArray(options)) {
            setSelectOptions(options);
        } else {
            generateDynamicOptions(options, paramsDropdown, args?.sort_by).then(
                (res: any[]) => {
                    setSelectOptions(
                        res.map((i: any) => ({
                            ...i,
                            value: i.id,
                            label: i.description,
                            code: i.code,
                        })),
                    );
                },
            );
        }
    }, [options, paramsDropdown]);

    const ref: any = useRef();
    useKeyPress(
        'space',
        e => {
            e.stopPropagation();
            e.preventDefault();
            setOpen(!open);
        },
        {
            target: ref,
        },
    );
    useEffect(() => {
        if (getVal && selected) {
            const select = selectOptions.find((i: any) => {
                return i.value === selected;
            });
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
            setSelected('');
        }
    }, [isReset, setValue, name, setSelected]);
    useEffect(() => {
        if (typeDropDown === 'static') {
            console.log(selected, valueSelected, name, '-- static  --');
            if (valueSelected && selected && valueSelected !== selected) {
                setSelected(valueSelected);
            }
        } else {
            console.log(selected, valueSelected, name, '-- dynamic  --');
            if (
                valueSelected && typeof selected === 'string'
                    ? valueSelected?.id !== selected
                    : valueSelected?.id !== selected?.id
            ) {
                setSelected(valueSelected);
            }
        }
    }, [valueSelected, selected]);
    useEffect(() => {
        if (typeDropDown === 'static') {
            console.log('static', selected, defaultValue, name);
            if (defaultValue) {
                setSelected(defaultValue);
                setValue(name, defaultValue);
            }
        } else {
            if (defaultValue) {
                if (!id) {
                    console.log('dynamic', selected, defaultValue, name);
                    setSelected(defaultValue);
                    setValue(name, defaultValue);
                } else if (valueSelected) {
                    console.log(
                        'dynamic 88',
                        valueSelected,
                        selected,
                        defaultValue,
                        name,
                    );
                    setSelected(
                        valueSelected?.id ||
                            valueSelected?.value ||
                            valueSelected,
                    );
                    setValue(
                        name,
                        valueSelected?.id ||
                            valueSelected?.value ||
                            valueSelected,
                    );
                }
            }
        }
    }, []);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (selected) clearErrors(`root.${name}`);
    }, [selected]);
    return (
        <Controller
            render={({ field }) => {
                return (
                    <FormControl
                        fullWidth
                        data-fieldType="SELECT"
                        disabled={disabled}
                        ref={ref}
                        size={size}
                        required={required}
                        error={error}
                    >
                        {label && (
                            <InputLabel id={otherProps?.id}>{label}</InputLabel>
                        )}
                        <Select
                            {...otherProps}
                            {...field}
                            id={`${name}-select`}
                            labelId={otherProps?.id}
                            sx={{
                                ...(!!args?.colors?.borderColor
                                    ? {
                                          '& .MuiOutlinedInput-notchedOutline':
                                              {
                                                  borderColor:
                                                      args.colors.borderColor,
                                              },
                                      }
                                    : {}),
                                '&:focus-within': {
                                    boxShadow: theme =>
                                        `0 0 0 2px ${theme.palette.primary.main}`,
                                    borderColor: theme =>
                                        `${theme.palette.primary.main}!important`,
                                    borderWidth: `1px!important`,
                                },
                                '&.Mui-focused': {
                                    boxShadow: theme =>
                                        `0 0 0 2px ${theme.palette.primary.main}`,
                                    borderColor: theme =>
                                        `${theme.palette.primary.main}!important`,
                                    borderWidth: `1px!important`,
                                },
                            }}
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            onBlur={e =>
                                onBlur?.(
                                    selectOptions.find(
                                        (i: any) => i.value === e.target.value,
                                    ),
                                )
                            }
                            inputProps={{
                                readOnly: !!disabled,
                                ...otherProps.inputProps,
                                onChange: (e: any) => {
                                    setSelected(e.target.value);
                                    // if (e.target.value || selected) {
                                    //     focusOnNextInput(e);
                                    // }
                                },
                            }}
                            value={selected || field?.value || ''}
                            label={label}
                            required={required}
                        >
                            {selectOptions?.length
                                ? selectOptions?.map((item: any) => (
                                      <MenuItem
                                          key={item.value}
                                          value={item.value}
                                      >
                                          {item.code && (
                                              <span className="code">
                                                  {item.code}
                                              </span>
                                          )}
                                          <span className="label">
                                              {item.label}
                                          </span>
                                      </MenuItem>
                                  ))
                                : null}
                        </Select>
                        {helperText && (
                            <FormHelperText>{helperText}</FormHelperText>
                        )}
                    </FormControl>
                );
            }}
            name={name}
            control={control}
        />
    );
};

export default DropDown;
