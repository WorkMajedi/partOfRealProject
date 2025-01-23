/* eslint-disable react/destructuring-assignment */
import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from 'react';
import { useKeyPress } from 'ahooks';
import {
    Box,
    ButtonBase,
    CircularProgress,
    TextField,
    useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openPopup } from 'redux/slices/managePopup/managePopupSlice';
import { Controller, useFormContext } from 'react-hook-form';
import { Api } from 'api';
import {
    FindNameFromRelated_modal,
    FindStepFristPath,
    focusNextInput,
} from 'utils/utils';
import { debounce } from '@mui/material/utils';
import axios from 'axios';
import { StyledAutocomplete } from './AC.styles';

const AutoCompleteInitializer = ({
    endPoint,
    getValue,
    getSelected,
    inputProps,
    redirectToAdd,
    initialValue,
    nameQuery,
    args,
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
    skip_in_navigation,
    isAutoCompleteInitializer = false,
    navigateToEdit,
    ...otherProps
}: any) => {
    const { watch, setError, setValue, clearErrors } = useFormContext();
    const watchAllData = watch();

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<any>([]);
    const [searchedValue, setSearchedValue] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<any | null>(null);
    const [IsTyping, setIsTyping] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>('');
    const [searchParams]: any = useSearchParams();
    const theme = useTheme();
    const dropDownRef1 = useRef(null);

    const ref: any = useRef();
    let source = axios.CancelToken.source();

    const fetchAutoComplete = useCallback(
        async (input: string, callback: any) => {
            source.cancel('Operation canceled by the user.');
            source = axios.CancelToken.source();

            setLoading(true);
            if (!!endPoint) {
                await Api.autoComplete
                    .autoComplete(endPoint + input, {
                        cancelToken: source.token,
                    })
                    .then((res: any) => {
                        setLoading(false);
                        const normalizedData =
                            !!res?.data?.results?.length &&
                            res.data.results.map((i: any) => {
                                const {
                                    product_template_critical_path,
                                    ...rest
                                } = i;
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
                                    ...rest,
                                    rowId: rest?.id,
                                    id: rest?.id || rest?.code,
                                    value:
                                        rest?.id ||
                                        rest?.code ||
                                        rest?.[nameQuery] ||
                                        rest?.name,

                                    label,
                                    code,
                                    description,

                                    product_template_critical_path:
                                        !!product_template_critical_path?.length &&
                                        product_template_critical_path.map(
                                            (item: any) => {
                                                return {
                                                    ...item,
                                                    ...item.phase,
                                                    id: item.id,
                                                    rowId: item.id,
                                                    product_template_raw_material:
                                                        item?.product_template_raw_material?.map(
                                                            (i: any) => {
                                                                return {
                                                                    ...i,
                                                                    ...(i.raw_material
                                                                        ? {
                                                                            ...i?.raw_material,
                                                                            rowId: i
                                                                                ?.raw_material
                                                                                ?.id,
                                                                        }
                                                                        : []),
                                                                };
                                                            },
                                                        ),
                                                };
                                            },
                                        ),
                                };
                            });
                        callback(normalizedData);
                    })
                    .catch(() => {
                        setLoading(false);
                        callback([]);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        },
        [endPoint],
    );

    const fetch = useMemo(
        () =>
            debounce((input: string, callback: (results?: any) => void) => {
                fetchAutoComplete(input, callback);
            }, 400),
        [fetchAutoComplete],
    );

    useEffect(() => {
        // if we have an id generate that create by next_generate api
        // we don't need to call api for search that id
        if (!!initialValue && typeof initialValue === 'number') return;
        //=

        let active = true;

        if (searchedValue === '') {
            setOptions(selectedItems ? [selectedItems] : []);
            return undefined;
        }
        if (
            searchedValue?.toString().toLowerCase() ===
            selectedItems?.toString()?.toLowerCase() ||
            searchedValue?.toString().toLowerCase() ===
            selectedItems?.code?.toString()?.toLowerCase()
        )
            return;
        fetch(searchedValue, results => {
            if (active) {
                let newOptions: any[] | ((prevState: object[]) => object[]) =
                    [];

                if (selectedItems) {
                    newOptions = [selectedItems];
                }

                if (results) {
                    newOptions = [...results];
                }

                setOptions(newOptions);
            }
        });
        if (searchedValue) setLoading(true);

        return () => {
            active = false;
        };
    }, [initialValue, selectedItems, searchedValue, fetch]);

    useEffect(() => {
        if (initialValue && typeof initialValue !== 'object') {
            setSearchedValue(initialValue);
        }
        if (initialValue && typeof initialValue === 'object') {
            setSearchedValue(
                initialValue.code ||
                initialValue.name ||
                initialValue?.[args?.search_on ?? ''] ||
                initialValue.id,
            );
        }
    }, [initialValue]);

    useEffect(() => {
        const path = FindStepFristPath(pathname);
        if (selectedItems && selectedItems?.id && redirectToAdd) {
            // alert('Do you go to edit page?');
            navigate(`${path}/${selectedItems?.id}`);
        }
        if (selectedItems && selectedItems?.id && isAutoCompleteInitializer) {
            const query = Object.fromEntries([...searchParams]);
            navigate({
                pathname,
                search: createSearchParams({
                    ...query,
                    [nameQuery]: selectedItems.id,
                }).toString(),
            });
            const inputs = document?.querySelectorAll('form input:required');
            // @ts-ignore
            const currentInput = [...inputs].findIndex(
                i =>
                    i ===
                    (dropDownRef1?.current as any)?.querySelector('input'),
            );
            setTimeout(() => {
                if (inputs[currentInput + 1]) {
                    (inputs[currentInput + 1] as HTMLInputElement)?.focus();
                }
            }, 50);
            setTimeout(() => {
                if (inputs[currentInput + 1]) {
                    (inputs[currentInput + 1] as HTMLInputElement)?.focus();
                }
            }, 1000);
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
        if (selectedNameModal) {
            dispatch(
                openPopup({
                    name: selectedNameModal,
                    isOpen: true,
                    inModal: true,
                    state: {
                        ref: dropDownRef1?.current,
                        endPoint,
                        setValue,
                        name: nameQuery,
                        clearErrors,
                        setSelectedItems,
                        setSearchedValue,
                    },
                }),
            );
        }
    };

    useKeyPress('f2', onF2, {
        target: dropDownRef1,
    });

    // when select from modal search
    useEffect(() => {
        if (!!selectedItems?.id && !!navigateToEdit) {
            navigateToEdit(Number(selectedItems?.id));
        }
    }, [otherProps, selectedItems]);
    //=

    const handelEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
        field: any,
    ) => {
        event.preventDefault();
        event.stopPropagation();
        if (loading && IsTyping && !args?.ignore_enter_validate) {
            event.stopPropagation();
            event.preventDefault();
            event.defaultPrevented = true;
            return (event.target as HTMLInputElement).focus();
        }
        if (
            otherProps.readOnly ||
            (event.target as HTMLInputElement).disabled
        ) {
            return focusNextInput(event.target as HTMLElement);
        }
        if (!(event.target as HTMLInputElement)?.value) {
            setError(`root.${field.name}`, {
                message: 'invalid value!',
            });
            (event.target as HTMLInputElement)?.focus();
            return;
        }
        if (!!args?.ignore_enter_validate) {
            return focusNextInput(event.target as HTMLElement);
        }

        if (
            options?.length === 1 &&
            ((event.target as HTMLInputElement)?.value
                ?.toString()
                ?.toUpperCase() ===
                `${options[0]?.code
                    ?.toString()
                    ?.toUpperCase()} / ${options[0]?.description
                        ?.toString()
                        ?.toUpperCase()}` ||
                (options?.length === 1 &&
                    (event.target as HTMLInputElement)?.value
                        ?.toString()
                        ?.toUpperCase() ===
                    options[0]?.code?.toString()?.toUpperCase()))
        ) {
            if (!!options[0]?.label) {
                setSearchedValue(options[0]?.label);
                field.onChange(options[0]);
            }
            setSelectedItems(options[0]);
            if (!!navigateToEdit) {
                navigateToEdit(Number(options[0]?.id));
            }

            field.onChange(
                typeof options[0] === 'string' && field.name === 'code'
                    ? options[0]?.toString().toUpperCase()
                    : options[0],
            );
            if (!!options[0]?.id && !!navigateToEdit) {
                navigateToEdit(Number(options[0]?.id));
            }
            // const nextElement = (
            //     event.target as HTMLElement
            // )?.closest(
            //     '.MuiGrid-root',
            // )?.nextElementSibling;
            // nextElement
            //     ?.querySelector('input')
            //     ?.focus();
            focusNextInput(event.target as HTMLElement);
            return setIsTyping(false);
        }
        if (
            IsTyping &&
            options?.length <= 0 &&
            selectedItems?.label !== (event.target as HTMLInputElement)?.value
        ) {
            setError(`root.${field.name}`, {
                message: 'invalid value!',
                type: 'custom',
            });

            (event.target as HTMLInputElement)?.focus();
            return;
        }

        // const nextElement = (event.target as HTMLElement)?.closest(
        //     '.MuiGrid-root',
        // )?.nextElementSibling;
        // nextElement?.querySelector('input')?.focus();

        focusNextInput(event.target as HTMLElement);

        // Disable Error Temporary
        // if (
        //     required &&
        //     !(event.target as HTMLInputElement).value
        // ) {
        //     setError(field.name, {
        //         message: 'invalid value!',
        //     });
        //     (event.target as HTMLInputElement)?.focus();
        //     return;
        // }
        // const nextElement = (
        //     event.target as HTMLElement
        // )?.closest('.MuiGrid-root')?.nextElementSibling;
        // nextElement?.querySelector('input')?.focus();

        // }, 50);
        // Disable Error Temporary
        // ||
        //     (required &&
        //         options[0]?.code
        //             ?.toString()
        //             ?.toUpperCase() !==
        //         (event.target as HTMLInputElement)
        //             ?.value)

        // if (
        //     !(event.target as HTMLInputElement)
        //         ?.value ||
        //     selectedItems?.label !==
        //     (event.target as HTMLInputElement)
        //         ?.value
        // ) {
        //     setError(field.name, {
        //         message: 'invalid value!',
        //     });
        //     return (
        //         event.target as HTMLInputElement
        //     )?.focus();
        // }
    };

    return (
        <Controller
            // @ts-ignore
            defaultValue={
                initialValue && initialValue?.code
                    ? {
                        ...initialValue,
                        label: initialValue.code,
                        value: initialValue.id,
                    }
                    : null
            }
            rules={{ required: selectedItems || !!required }}
            render={({ field }) => {
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

                            const code = (
                                option[displayKeys[0]] || option?.code
                            )?.toString();

                            const desc =
                                option[displayKeys[1]] || option?.description;

                            if (code && desc) {
                                return `${code} / ${desc}`;
                            }
                            if (code) {
                                return code;
                            }
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
                                    selectedItems,
                                    watchAllData,
                                );
                            }
                        }}
                        onChange={(event: any, newValue: any) => {
                            if (newValue?.label) {
                                focusNextInput(event.target as HTMLElement);
                                setSelectedItems(newValue);
                                field.onChange(newValue);
                            }
                            setSelectedItems(newValue);
                            field.onChange(
                                typeof newValue === 'string' &&
                                    field.name === 'code'
                                    ? newValue.toUpperCase()
                                    : newValue,
                            );
                            if (!!newValue?.id && !!navigateToEdit) {
                                navigateToEdit(Number(newValue?.id));
                            }
                        }}
                        onKeyDown={(
                            event: React.KeyboardEvent<HTMLInputElement>,
                        ) => {
                            clearErrors(`root.${nameQuery}`);
                            if (event.key === 'Enter') {
                                handelEnter(event, field);
                            } else {
                                setIsTyping(true);
                            }
                        }}
                        // value={searchedValue}
                        onInputChange={(event, newInputValue) => {
                            setSearchedValue(newInputValue);
                        }}
                        renderInput={(params: any) => (
                            <TextField
                                name={nameQuery}
                                label={otherProps?.label}
                                placeholder={otherProps?.placeholder}
                                {...params}
                                required={selectedItems || required}
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
                        renderOption={(props: any, option: any) => {
                            return (
                                <li {...props}>
                                    {option.code && (
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
                        {...otherProps}
                        sx={{ width: `${width}` || 300 }}
                    />
                );
            }}
            name={nameQuery}
            control={control}
        />
    );
};
export default AutoCompleteInitializer;
