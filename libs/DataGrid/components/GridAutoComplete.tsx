/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Box,
    ButtonBase,
    CircularProgress,
    TextField,
    Tooltip,
} from '@mui/material';
// import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { openPopup } from 'redux/slices/managePopup/managePopupSlice';
import { styled } from '@mui/material/styles';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from '@mui/material/utils';
import { Controller, useFormContext } from 'react-hook-form';
import { Api } from 'api';
import { toast } from 'react-toastify';
import { array } from 'yup';
import { useSearchParams } from 'react-router-dom';

const StyledAutocomplete = styled(Autocomplete)<
    AutocompleteProps<any, any, any, any, any>
>(({ theme }) => ({
    display: 'inline-block',
    border: 'none!important',
    height: '100%',
    '&>div': {
        height: '100%',
    },
    borderRadius: '4px',
    '& .MuiOutlinedInput-input': {
        textTransform: 'uppercase',
    },
    '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
        right: '9px',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    },
    '& .Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.secondary.main}!important`,
            borderWidth: `1px!important`,
        },
        '& legend': {
            color: `${theme.palette.grey[900]}!important`,
        },

        '& svg': {
            color: theme.palette.secondary.main,
        },
    },
    '& .searchBtn': {
        position: 'absolute',
        right: 0,
        height: '98%',
        width: '2.5rem',
        background: theme.palette.grey[100],
        borderLeft: `1px solid ${theme.palette.grey[300]}`,
        svg: {
            path: {
                fill: theme.palette.grey[500],
            },
        },
    },
    '& .Mui-disabled': {
        background: theme.palette.grey[100],
    },
    '&:has(input.Mui-disabled)': {
        background: theme.palette.grey[100],
    },
    '& .Mui-disabled .searchBtn': {
        background: theme.palette.grey[100],
        svg: {
            path: {
                // @ts-ignore
                fill: theme.palette.primary[50],
            },
        },
    },
}));

interface Option {
    readonly id?: string | number;
    readonly label: string;
    readonly value: string;
}

const GridAutoComplete = ({
    inputProps: { defaultValue, name, ...restInputProps },
    endPoint,
    params,
    apiRef,
    item,
    saveGridRows,
    rowIndex,
    ...restProps
}: any) => {
    const dispatch = useDispatch();

    const { control, getValues } = useFormContext();

    const [, setSearchParams] = useSearchParams();

    const [value, setValue] = useState<any>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedFromModal, setSelectedFromModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>({});
    const [apiUrl, setApiUrl] = useState<string | []>('');
    const [conditionalURLDynamicParam, setCnditionalURLDynamicParam] =
        useState<any>(null);
    const autoCompleteRef: any = useRef(null);
    const ref: any = useRef(null);

    const handleValue = (data: any) => {
        const code = data[restProps.displayKeys[0]] || data?.code;
        const description = data[restProps.displayKeys[1]] || data?.description;

        return {
            value: code || '',
            label: code || '',
            code: code || '',
            description: description || '',
        };
    };

    useEffect(() => {
        if (!!params.value) {
            const usefulValue = handleValue(params?.row);
            setValue(usefulValue.label);
        }
    }, [params]);

    // in Purchase Order and Adjustment page GridAutoComplete
    // depend on another cell => choose "Type" at first
    useEffect(() => {
        if (!!endPoint?.length && !!params.row[params.colDef.args?.dependOn]) {
            const url = endPoint.filter(
                (item: any) =>
                    item.label === params.row[params.colDef.args?.dependOn],
            );
            if (url[0]?.dynamicQueryParams)
                setCnditionalURLDynamicParam(url[0]?.dynamicQueryParams);
            return setApiUrl(url[0]?.value || '');
        }
        setApiUrl(endPoint);
    }, [params.row]);
    //= =

    const dynamicQueryParamsHandler = (url: string) => {
        let copyUrl = url;
        const dynamicQueryParams =
            params.colDef?.args?.dynamicQueryParams ??
            conditionalURLDynamicParam ??
            {};
        if (dynamicQueryParams) {
            Object.keys(dynamicQueryParams)?.forEach(item => {
                const splitedValue = dynamicQueryParams[item]?.split('.');
                if (splitedValue?.length === 2) {
                    const getValue = getValues(splitedValue[0])?.[
                        splitedValue[1]
                    ];
                    if (getValue && item) {
                        copyUrl += `&${item}=${getValue}`;
                        setSearchParams({
                            'dynamic-query': `${item}-${getValue}`,
                        });
                    }
                } else {
                    const getValue = getValues(item);
                    if (getValue && item) {
                        copyUrl += `&${item}=${getValue}`;
                        setSearchParams({
                            'dynamic-query': `${item}-${getValue}`,
                        });
                    }
                }
            });
        }
        return copyUrl;
    };

    const onF2 = (e: any) => {
        e.preventDefault();
        const endpointUrl = dynamicQueryParamsHandler(apiUrl as string);
        // let endpointUrl = apiUrl;
        // const dynamicQueryParams =
        //     params.colDef?.args?.dynamicQueryParams ??
        //     conditionalURLDynamicParam ??
        //     {};

        // if (dynamicQueryParams) {
        //     Object.keys(dynamicQueryParams)?.forEach(item => {
        //         const splitedValue = dynamicQueryParams[item]?.split('.');
        //         if (splitedValue?.length === 2) {
        //             const getValue = getValues(item)?.[splitedValue[1]];
        //             if (getValue && item) {
        //                 endpointUrl += `&${item}=${getValue}`;
        //                 setSearchParams({
        //                     'dynamic-query': `${item}-${getValue}`,
        //                 });
        //             }
        //         } else {
        //             const getValue = getValues(item);
        //             if (getValue && item) {
        //                 endpointUrl += `&${item}=${getValue}`;
        //                 setSearchParams({
        //                     'dynamic-query': `${item}-${getValue}`,
        //                 });
        //             }
        //         }
        //     });
        // }
        if (
            !!params.colDef.args?.dependOn &&
            !params.row[params.colDef.args?.dependOn]
        )
            return toast.error('You must choose "Type" at first');

        if (params.colDef.args?.modal) {
            dispatch(
                openPopup({
                    name: params.colDef.args?.modal,
                    isOpen: true,
                    state: {
                        apiUrl: endpointUrl,
                        isDependOnUrl: !!params.colDef.args?.dependOn,
                        displayKeys: restProps?.displayKeys,
                        label: params.colDef.args.label,
                        grid: true,
                        inModal: true,
                        row: params.row,
                        ref: autoCompleteRef?.current,
                        setSelectedFromModal,
                        setValue: (newRow: any) => {
                            const index =
                                apiRef?.current?.getRowIndexRelativeToVisibleRows(
                                    params.id,
                                );
                            setSelected({});
                            // this block use for adjustment_add_from in adjustment page
                            // because we have 2 GridUtoComplete in grid,
                            // and we want to prevent them to overwrite each other
                            if (
                                restProps?.gridName === 'adjustment_add_from' &&
                                params.field === 'lot_number'
                            ) {
                                const { code } = handleValue(newRow);
                                setValue({
                                    backend_lot_id: newRow.id || '',
                                    lot_number: code,
                                });
                                restProps.updateRow({
                                    index: rowIndex,
                                    newRow: {
                                        backend_lot_id: newRow.id || '',
                                        lot_number: code,
                                    },
                                });
                                saveGridRows({});
                                //= =
                            } else if (
                                restProps?.gridName === 'ship_to_addresses' &&
                                params.field === 'zip_code'
                            ) {
                                const { ...code } = handleValue(newRow);
                                setValue({
                                    backend_zip_code: newRow.id || '',
                                    zip_code: code,
                                });
                                restProps.updateRow({
                                    index: rowIndex,
                                    newRow: {
                                        backend_zip_code: newRow.id || '',
                                        zip_code: code,
                                    },
                                });
                                saveGridRows({});
                            } else {
                                setValue({
                                    ...newRow,
                                    ...handleValue(newRow),
                                    // items list grid in order screen👇
                                    order_qty: newRow?.order_qty || 0,
                                    onhand_qty: newRow?.onhand_qty || 0,
                                    invoiced_qty: newRow?.invoiced_qty || 0,
                                    order_qty_uom: newRow?.inventory_uom || '',
                                    available_qty: newRow?.available_qty || 0,
                                    inproduction_qty:
                                        newRow?.inproduction_qty || 0,
                                    // in Purchase screen
                                    price:
                                        newRow?.price || newRow?.current_cost,
                                });
                                restProps.updateRow({
                                    index,
                                    newRow: {
                                        rowId: params.id,
                                        index: rowIndex,
                                        ...newRow,
                                        // items list grid in order screen👇
                                        order_qty: newRow?.order_qty || 0,
                                        onhand_qty: newRow?.onhand_qty || 0,
                                        invoiced_qty: newRow?.invoiced_qty || 0,
                                        order_qty_uom:
                                            newRow?.inventory_uom || '',
                                        available_qty:
                                            newRow?.available_qty || 0,
                                        inproduction_qty:
                                            newRow?.inproduction_qty || 0,
                                        // in Purchase screen
                                        price:
                                            newRow?.price ||
                                            newRow?.current_cost,
                                    },
                                });
                                saveGridRows({});
                            }
                            const nextElement = autoCompleteRef.current;
                            nextElement?.querySelector('input')?.focus();
                        },
                    },
                }),
            );
        }
    };

    useEffect(() => {
        if (Object.keys(selected)?.length > 0) {
            const { id, ...restSelected } = selected;
            if (params.row.backendId !== selected.id) {
                // this block use for adjustment_add_from in adjustment page
                // because we have 2 GridUtoComplete in grid,
                // and we want to prevent them to overwrite each other
                if (
                    restProps?.gridName === 'ship_to_addresses' &&
                    params.field === 'zip_code'
                ) {
                    const { code } = handleValue(selected);
                    console.log(code, name, '-- code  --');
                    restProps.updateRow({
                        index: rowIndex,
                        newRow: {
                            backend_zip_code: selected.id || '',
                            zip_code: code,
                        },
                    });
                    saveGridRows({});
                    return;
                }
                //= =
                // this block use for adjustment_add_from in adjustment page
                // because we have 2 GridUtoComplete in grid,
                // and we want to prevent them to overwrite each other
                if (
                    restProps?.gridName === 'adjustment_add_from' &&
                    params.field === 'lot_number'
                ) {
                    const { code } = handleValue(selected);
                    restProps.updateRow({
                        index: rowIndex,
                        newRow: {
                            backend_lot_id: selected.id || '',
                            lot_number: code,
                        },
                    });
                    saveGridRows({});
                    return;
                }
                //= =
                console.log(
                    handleValue(selected),
                    selected,
                    selected.old_code,
                    '--  data handle value --',
                );
                restProps.updateRow({
                    index: rowIndex,
                    newRow: {
                        ...restSelected,
                        ...handleValue(selected),
                        ...(restProps.displayKeys?.[0] !== 'code'
                            ? { code: selected?.code_unchanged || '' }
                            : {}),

                        // BackendId is so important here!
                        backendId: selected.id || '',
                        id: selected.id,
                        rowId: params.id,
                        // items list grid in order screen👇
                        order_qty_uom: selected?.inventory_uom || '',
                        order_qty: selected?.order_qty || 0,
                        available_qty: selected?.available_qty || 0,
                        onhand_qty: selected?.onhand_qty || 0,
                        inproduction_qty: selected?.inproduction_qty || 0,
                        invoiced_qty: selected?.invoiced_qty || 0,
                        // in Purchase screen
                        price: selected?.price || selected?.current_cost,
                    },
                });
                saveGridRows({});
            }
        }
    }, [
        selected,
        apiRef,
        params.row.backendId,
        restProps?.gridName,
        params.field,
    ]);

    const fetchAutoComplete = useCallback(
        async (input: string, callback: any) => {
            // In the Purchase Order and Adjustment page GridAutoComplete,
            // it depends on another cell => "type" cell.
            if (typeof apiUrl !== 'string' && !!apiUrl.length) {
                setLoading(false);
                return toast.error('You must choose "Type" first.');
            }
            //= =

            let fetchApi = apiUrl + input;
            const dynamicQueryParams =
                params.colDef?.args?.dynamicQueryParams ??
                conditionalURLDynamicParam ??
                {};
            if (dynamicQueryParams) {
                Object.keys(dynamicQueryParams)?.forEach(item => {
                    const splitedValue = dynamicQueryParams[item]?.split('.');
                    if (splitedValue?.length === 2) {
                        const getValue = getValues(splitedValue[0])?.[
                            splitedValue[1]
                        ];
                        if (getValue) {
                            fetchApi += `&${item}=${getValue}`;
                        }
                    } else {
                        const getValue = getValues(item);
                        if (getValue) {
                            fetchApi += `&${item}=${getValue}`;
                        }
                    }
                });
            }
            // this block use for adjustment_add_from in adjustment page
            // because we have 2 GridUtoComplete in grid,
            // and second GridUtoComplete search url depend on value from first
            if (
                restProps?.gridName === 'adjustment_add_from' &&
                params.field === 'lot_number' &&
                params.row?.code
            ) {
                fetchApi = `${apiUrl + input}&item_code__iexact=${
                    params.row?.code
                }&onhand_qty__gt=0`;
            }
            //= =

            setLoading(true);
            if (!!fetchApi) {
                await Api.autoComplete
                    .autoComplete(fetchApi)
                    .then((res: any) => {
                        const normalizedData = res.data.results.map(
                            (result: any) => {
                                return {
                                    ...result,
                                    ...handleValue(result),
                                    backendId: result.id,
                                    rowId: result.id,
                                    id: result.id,
                                    uom: result?.inventory_uom || '',
                                    // in Purchase screen
                                    price:
                                        result?.price || result?.current_cost,
                                    code_unchanged: result?.code,
                                };
                            },
                        );
                        callback(normalizedData);
                    })
                    .catch(() => {
                        callback([]);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        },
        [apiUrl, params.row?.code],
    );

    const fetch = useMemo(
        () =>
            debounce((input: string, callback: (results?: any) => void) => {
                fetchAutoComplete(input, callback);
            }, 400),
        [fetchAutoComplete],
    );

    useEffect(() => {
        let active = true;

        // when we select from modal option.length = 0
        // so if we hit enter, we get error
        // in this case we set this condition to prevent enter error
        if (selectedFromModal) {
            setOptions([value]);
            setSelectedFromModal?.(false);
            return undefined;
        }
        // =

        if (!open) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch(inputValue, results => {
            if (active) {
                let newOptions: any[] | ((prevState: object[]) => object[]) =
                    [];

                if (results) {
                    newOptions = [...results];
                }

                setOptions(newOptions);
            }
        });
        setLoading(true);

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch, open, selectedFromModal]);

    const onChange = (event: any, newValue: any) => {
        console.log(name, newValue, '-- aaaa  --');
        setSelected(newValue);
        setValue(newValue);
    };

    return (
        <Controller
            render={() => {
                return (
                    <Box
                        ref={autoCompleteRef}
                        width="100%"
                        height="100%"
                        sx={{
                            padding: '0!important',
                            '&>div': {
                                width: '100%',
                            },
                            '& .MuiOutlinedInput-root .MuiOutlinedInput-input':
                                {
                                    padding: '0 !important',
                                },
                        }}
                    >
                        <StyledAutocomplete
                            id={`auto_search_${restInputProps.name}`}
                            ref={ref}
                            freeSolo
                            disableClearable
                            blurOnSelect
                            autoComplete
                            includeInputInList
                            filterSelectedOptions
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            ListboxProps={{
                                'aria-details': 'grid-autocomplete',
                                onClick: () => {
                                    const nextElement = autoCompleteRef.current;
                                    nextElement
                                        ?.querySelector('input')
                                        ?.focus();
                                },
                            }}
                            options={options}
                            getOptionLabel={(option: any) => {
                                if (
                                    typeof option === 'string' ||
                                    typeof option === 'number'
                                ) {
                                    return option.toString();
                                }

                                const code = (
                                    option[restProps?.displayKeys[0]] ||
                                    option?.code
                                )?.toString();

                                const desc =
                                    option[restProps?.displayKeys[1]] ||
                                    option?.description;

                                if (code && desc) {
                                    return `${code} / ${desc}`;
                                }

                                if (code) {
                                    return code;
                                }

                                return option?.label;
                            }}
                            loading={loading}
                            value={value}
                            onChange={onChange}
                            // @ts-ignore
                            onKeyDown={(
                                event: React.KeyboardEvent<HTMLInputElement>,
                            ) => {
                                const input = event.target as HTMLInputElement;
                                if (input.style.color === 'red') {
                                    input.style.color = 'inherit';
                                    input.style.borderBottom = 'none';
                                }

                                if (event.key === 'F2') {
                                    onF2(event);
                                }
                                if (event.key === 'Enter') {
                                    if (
                                        options.length === 0 &&
                                        input.value &&
                                        !value?.label
                                    ) {
                                        if (
                                            input.value
                                                ?.toUpperCase()
                                                ?.split('')
                                                ?.includes('/')
                                        )
                                            return;
                                        event.stopPropagation();
                                        event.preventDefault();
                                        setTimeout(() => {
                                            input?.focus();
                                            input.style.color = 'red';
                                            input.style.borderBottom =
                                                '1px solid #ff000054';
                                        }, 150);
                                    }
                                    const cell = input.closest(
                                        '.MuiDataGrid-cell',
                                    ) as HTMLElement;

                                    const hasOption = options.find(
                                        opt =>
                                            opt.value?.toUpperCase() ===
                                            input.value?.toUpperCase(),
                                    );

                                    setTimeout(() => {
                                        if (
                                            hasOption &&
                                            // @ts-ignore
                                            hasOption['code']
                                        ) {
                                            setSelected(hasOption);
                                            onChange(event, hasOption);
                                            cell.setAttribute('data-error', '');
                                        } else {
                                            if (
                                                params.row?.phase_code ||
                                                params.row?.code ||
                                                // below condition used for choosing option with arrowkey and enter
                                                input.value
                                                    ?.toUpperCase()
                                                    ?.split('')
                                                    ?.includes('/')
                                            ) {
                                                return null;
                                            }
                                            input?.focus();
                                            input.style.color = 'red';
                                            input.style.borderBottom =
                                                '1px solid #ff000054';
                                            cell.setAttribute(
                                                'data-error',
                                                'true',
                                            );
                                        }
                                    }, 55);
                                }
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            {...(params.row?.type !== 'Item' &&
                            params.field === 'lot_number'
                                ? { disabled: true }
                                : {})}
                            renderInput={(inputPrams: any) => (
                                <TextField
                                    {...inputPrams}
                                    name={name}
                                    fullWidth
                                    InputProps={{
                                        ...inputPrams.InputProps,

                                        endAdornment: (
                                            <ButtonBase
                                                {...(params.row?.type !==
                                                    'Item' &&
                                                params.field === 'lot_number'
                                                    ? { disabled: true }
                                                    : { disabled: loading })}
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
                                    }}
                                />
                            )}
                            renderOption={(props: any, option: any) => {
                                return (
                                    <Tooltip
                                        title={option?.description}
                                        placement="right-start"
                                    >
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
                                    </Tooltip>
                                );
                            }}
                        />
                    </Box>
                );
            }}
            name={name}
            control={control}
        />
    );
};

export default GridAutoComplete;
