/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prettier/prettier */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useDebounceFn, useKeyPress } from 'ahooks';
import {
    Box,
    ButtonBase,
    CircularProgress,
    TextField,
    useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openPopup } from 'redux/slices/managePopup/managePopupSlice';
import { Controller, useFormContext } from 'react-hook-form';
import { Api } from 'api';
import {
    FindNameFromRelated_modal,
    FindStepFristPath,
    focusNextInput,
} from 'utils/utils';
import { LoadingButton } from '@mui/lab';
import { isTabKey } from '@mui/x-data-grid/utils/keyboardUtils';
import { StyledAutocomplete } from './AC.styles';

const AutoComplete = ({
    endPoint,
    redirectToAdd,
    nameQuery,
    resetValue,
    onBlur,
    control,
    nameModals,
    width,
    required,
    error,
    errorMsg,
    helperText,
    displayKeys,
    defaultValue,
    skip_in_navigation,
    args,
    ...otherProps
}: any) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();

    const {
        watch,
        setValue,
        setError,
        clearErrors,
        getValues,
        formState: { errors },
    } = useFormContext();
    const watchAllData = watch();
    const dropDownRef1 = useRef<HTMLSelectElement>(null);
    const ref: any = useRef();
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<any>([]);
    const [searchedValue, setSearchedValue] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<any | null>(null);
    const [selected, setSelected] = useState<any>('');
    const [IsTyping, setIsTyping] = useState<boolean>(false);

    const fetchAutoComplete = async (url: string) => {
        if (!!endPoint && (searchedValue || url)) {
            setLoading(true);
            await Api.autoComplete
                .autoComplete(endPoint + url)
                .then((res: any) => {
                    if (
                        res.status === 200 ||
                        ('success' && Array.isArray(res.data.results))
                    ) {
                        const normalizedData = res.data.results.map(
                            (i: any) => {
                                let label: string = '';
                                const code = i[displayKeys[0]] || i?.code;
                                const description =
                                    i[displayKeys[1]] || i?.description;

                                if (code && description) {
                                    label = `${code} / ${description}`;
                                } else if (code) {
                                    label = code;
                                }
                                return {
                                    id: i.id || i.code,
                                    value:
                                        i?.[nameQuery] ||
                                        i.id ||
                                        i.code ||
                                        i.name,
                                    ...i,
                                    label,
                                    code,
                                    description,
                                };
                            },
                        );
                        setOptions([...normalizedData]);
                    }
                })
                .catch(() => {
                    setLoading(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const { run: getAutoComplete } = useDebounceFn(
        cb => {
            if (cb && typeof cb === 'string') {
                fetchAutoComplete(cb || searchedValue);
            } else {
                setLoading(false);
            }
        },
        { wait: 300 },
    );

    useEffect(() => {
        getAutoComplete(searchedValue);
        if (searchedValue && typeof searchedValue === 'string')
            setLoading(true);
    }, [searchedValue]);

    useEffect(() => {
        const nextElement =
            dropDownRef1.current
                // @ts-ignore
                ?.closest('.MuiGrid-root')?.nextElementSibling ??
            dropDownRef1.current;

        nextElement?.querySelector('input')?.focus();
        const path = FindStepFristPath(pathname);
        if (selected && selectedItems && redirectToAdd) {
            navigate(`${path}/${selected?.id}`);
        }
    }, [selected, selectedItems]);

    useKeyPress(
        'space',
        e => {
            e.stopPropagation();
        },
        {
            target: ref,
        },
    );

    useEffect(() => {
        if (resetValue && searchedValue) {
            setSelected(null);
            setSearchedValue('');
            setSelectedItems(null);
        }
    }, [resetValue]);

    const onF2 = () => {
        const selectedNameModal = FindNameFromRelated_modal(nameModals);
        if (selectedNameModal && !otherProps.readOnly) {
            dispatch(
                openPopup({
                    name: selectedNameModal,
                    isOpen: true,
                    inModal: true,
                    state: {
                        ref: dropDownRef1?.current,
                        setSearchedValue,
                        endPoint,
                        setValue,
                        name: nameQuery,
                        setSelectedItems,
                        clearErrors,
                    },
                }),
            );
        }
    };

    useKeyPress('f2', onF2, {
        target: dropDownRef1,
    });

    return (
        <Controller
            defaultValue={
                defaultValue && defaultValue?.code
                    ? {
                          ...defaultValue,
                          label: defaultValue.code,
                          value: defaultValue.id,
                      }
                    : null
            }
            rules={{ required: !!required }}
            render={({ field }) => {
                // @ts-ignore
                return (
                    <StyledAutocomplete
                        {...field}
                        ref={dropDownRef1}
                        getOptionLabel={(option: any) => {
                            if (
                                typeof option === 'string' ||
                                typeof option === 'number'
                            ) {
                                return option.toString();
                            }

                            const code = option[displayKeys[0]] || option?.code;
                            const desc =
                                option[displayKeys[1]] || option?.description;

                            if (code && desc) {
                                return `${code} / ${desc}`;
                            }
                            if (code) {
                                return code;
                            }

                            return option?.label;
                        }}
                        options={options}
                        loading={loading}
                        autoComplete
                        includeInputInList
                        noOptionsText="No items"
                        freeSolo
                        onBlur={() => {
                            if (onBlur) {
                                onBlur(
                                    searchedValue,
                                    selectedItems || field.value,
                                    watchAllData,
                                );
                            }
                            setIsTyping(false);
                        }}
                        onChange={(event: any, newValue: any) => {
                            if (newValue?.label) {
                                const nextInput =
                                    event.target
                                        ?.closest('.MuiGrid-item')
                                        ?.nextElementSibling?.querySelector(
                                            'input',
                                        ) ??
                                    (dropDownRef1.current as any)
                                        ?.closest('.MuiGrid-item')
                                        ?.nextElementSibling?.querySelector(
                                            'input',
                                        );
                                focusNextInput(event.target as HTMLElement);
                                setSelectedItems(newValue);
                                field.onChange(newValue);
                            }
                            setSelectedItems(newValue);
                            field.onChange(newValue);
                        }}
                        onKeyDown={(
                            event: React.KeyboardEvent<HTMLInputElement>,
                        ) => {
                            clearErrors(`root.${nameQuery}`);
                            if (event.key === 'Enter') {
                                if (
                                    loading &&
                                    IsTyping &&
                                    !args?.ignore_enter_validate
                                ) {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    event.defaultPrevented = true;
                                    return (
                                        event.target as HTMLInputElement
                                    ).focus();
                                }
                                if (
                                    defaultValue?.code ||
                                    otherProps.readOnly ||
                                    (event.target as HTMLInputElement).disabled
                                )
                                    return;

                                if (
                                    options.length === 1 &&
                                    !!options[0]?.label &&
                                    (event.target as HTMLInputElement)?.value
                                        ?.toString()
                                        ?.toUpperCase() ===
                                        options[0]?.['code']
                                            ?.toString()
                                            ?.toUpperCase()
                                ) {
                                    setSelectedItems(options[0]);
                                    field.onChange(options[0]);
                                    setValue(field.name, options[0]);
                                    setSearchedValue(options[0]);
                                    setIsTyping(false);
                                    focusNextInput(event.target as HTMLElement);
                                    return;
                                }
                                if (
                                    !!args?.ignore_enter_validate &&
                                    (event.target as HTMLInputElement)?.value
                                ) {
                                    return focusNextInput(
                                        event.target as HTMLElement,
                                    );
                                }
                                if (
                                    options?.length <= 0 &&
                                    selectedItems?.label !==
                                        (event.target as HTMLInputElement)
                                            ?.value
                                ) {
                                    setError(`root.${field.name}`, {
                                        message: 'invalid value!',
                                        type: 'custom',
                                    });
                                    (event.target as HTMLInputElement)?.focus();
                                }
                            } else {
                                setIsTyping(true);
                            }
                        }}
                        value={field.value || selectedItems}
                        onInputChange={(event, newInputValue: string) => {
                            setSearchedValue(newInputValue);
                        }}
                        renderInput={(params: any) => (
                            <TextField
                                name={nameQuery}
                                label={otherProps?.label}
                                placeholder={otherProps?.placeholder}
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    disabled: otherProps.readOnly,
                                    type: 'search',
                                    'data-skip-in-navigation':
                                        skip_in_navigation,
                                    ...(otherProps.readOnly
                                        ? {}
                                        : {
                                              endAdornment: (
                                                  <ButtonBase
                                                      disabled={loading}
                                                      onClick={onF2}
                                                      className="searchBtn"
                                                  >
                                                      {loading ? (
                                                          <CircularProgress size="1em" />
                                                      ) : (
                                                          <SearchIcon />
                                                      )}
                                                  </ButtonBase>
                                              ),
                                          }),
                                }}
                                color="secondary"
                                required={required}
                                className={required ? 'required' : ''}
                                error={error}
                                helperText={
                                    <Box
                                        component="span"
                                        color={
                                            error
                                                ? theme.palette.error.main
                                                : theme.palette.grey[800]
                                        }
                                    >
                                        {/* @ts-ignore */}
                                        {error && helperText}
                                    </Box>
                                }
                                sx={{
                                    '& .MuiOutlinedInput-input': {
                                        textTransform: 'uppercase',
                                    },
                                    '& .MuiOutlinedInput-input::placeholder': {
                                        textTransform: 'capitalize',
                                    },
                                }}
                            />
                        )}
                        {...otherProps}
                        sx={{ width: `${width}` || 300 }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props}>
                                    {option?.code && (
                                        <span className="code">
                                            {option.code}
                                        </span>
                                    )}
                                    {option.description && (
                                        <span className="description">
                                            {option.description}
                                        </span>
                                    )}
                                </li>
                            );
                        }}
                    />
                );
            }}
            name={nameQuery}
            control={control}
        />
    );
};
export default AutoComplete;
