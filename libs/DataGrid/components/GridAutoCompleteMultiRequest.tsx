/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Box, ButtonBase, TextField } from '@mui/material';
import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { openPopup } from 'redux/slices/managePopup/managePopupSlice';
import { styled } from '@mui/material/styles';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from '@mui/material/utils';
import { Api } from 'api';

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
        top: 1,
        right: 0,
        height: '100%',
        width: '2.5rem',
        background: theme.palette.grey[100],
        borderLeft: `1px solid ${theme.palette.grey[300]}`,
        svg: {
            path: {
                fill: theme.palette.grey[500],
            },
        },
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
    readonly display_label: {
        code: string;
        desc: string;
    };
    readonly label: string;
    readonly value: string;
}

const GridAutoCompleteMultiRequest: React.FC<any> = ({
    inputProps: { defaultValue, name, ...restInputProps },
    endPoint,
    second_url,
    autoFill = true,
    params,
    item,
    saveGridRows,
    ...restProps
}) => {
    const dispatch = useDispatch();

    const { control, getValues } = useFormContext();

    const [value, setValue] = useState<any>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedFromModal, setSelectedFromModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>({});

    const autoCompleteRef: any = useRef(null);
    const inputRef: any = useRef(null);
    const ref: any = useRef(null);

    useEffect(() => {
        if (!!params.value) {
            setValue({
                label: params.value,
                value: params.value,
            });
        }
    }, [params]);

    const fetchAutoComplete = useCallback(
        async (input: string, callback: any) => {
            setLoading(true);
            await Api.autoComplete
                .autoComplete(endPoint + input)
                .then((res: any) => {
                    const normalizedData = res.data.results.map((i: any) => ({
                        rowId: i.id,
                        customer_code:
                            Number(getValues('customer')?.code) ||
                            Number(getValues('customer')) ||
                            restProps.gridArgs?.extraDataForModal?.customer
                                ?.id ||
                            null,
                        formula_code:
                            getValues('template')?.code ||
                            restProps.gridArgs?.extraDataForModal
                                ?.formula_template?.code ||
                            '',
                        package_code: i?.code,
                        package_id: i?.id,
                        //
                        code: i?.code,
                        label:
                            i?.description && i?.code
                                ? `${i?.code} / ${i?.description}`
                                : i?.code || i?.description,
                        description: i?.description,
                        display_label: {
                            code: i?.code,
                            desc: i?.description,
                        },
                    }));
                    callback(normalizedData);
                })
                .catch(() => {
                    callback([]);
                })
                .finally(() => {
                    setLoading(false);
                });
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
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch, open, selectedFromModal]);

    useKeyPress(
        'space',
        e => {
            e.stopPropagation();
            e.preventDefault();
            ref?.current?.click();
            inputRef?.current?.focus();
        },
        {
            target: ref?.current?.parentElement?.parentElement,
        },
    );

    const onF2 = (e: any) => {
        e.preventDefault();
        if (params.colDef.args?.modal) {
            dispatch(
                openPopup({
                    name: params.colDef.args?.modal,
                    isOpen: true,
                    state: {
                        endPoint,
                        label: params.colDef.args.label,
                        grid: true,
                        setSelectedFromModal,
                        setValue: (newRow: any) => {
                            const index =
                                restProps?.apiRef?.current?.getRowIndexRelativeToVisibleRows(
                                    params.id,
                                );
                            setSelected({
                                customer_code:
                                    Number(getValues('customer')?.code) ||
                                    Number(getValues('customer')) ||
                                    restProps.gridArgs?.extraDataForModal
                                        ?.customer?.id ||
                                    null,
                                formula_code:
                                    getValues('template')?.code ||
                                    restProps.gridArgs?.extraDataForModal
                                        ?.formula_template ||
                                    '',
                                package_id: newRow?.backendId,
                                package_code: newRow?.packaging_code,
                                rowId: params.id,
                                id: params.id,
                                index,
                                ...newRow,
                            });
                            restProps.updateRow({
                                index,
                                newRow: {
                                    rowId: params.id,
                                    id: params.id,
                                    index,
                                    ...newRow,
                                },
                            });
                            saveGridRows({});
                        },
                    },
                }),
            );
        }
    };

    useKeyPress('f2', onF2, {
        target: autoCompleteRef || autoCompleteRef?.current?.parentElement,
    });

    useKeyPress(
        () => true,
        () => {
            autoCompleteRef.current.querySelector('input').focus();
        },
        {
            target: autoCompleteRef?.current?.parentElement,
        },
    );

    const secondFetch = async () => {
        if (!selected.package_code) return null;
        const data = {
            customer_code: selected.customer_code,
            package_code: selected.package_code,
            formula_code: selected.formula_code,
            package_id: selected.package_id,
        };
        await Api.autoComplete
            .autoCompletePostData(second_url, data)
            .then((res: any) => {
                const rowIndex =
                    restProps?.apiRef?.current.getRowIndexRelativeToVisibleRows(
                        params.id,
                    );

                restProps.updateRow({
                    index: rowIndex,
                    newRow: {
                        ...res.data,
                        item_quantity_uom:
                            res.data?.inventory_uom ||
                            res.data?.item_quantity_uom,
                        produced_qty: !!res.data?.produced_qty
                            ? Number(res.data?.produced_qty)
                            : null,
                        requested_qty: !!res.data?.requested_qty
                            ? Number(res.data?.requested_qty)
                            : null,
                    },
                });
                setTimeout(() => {
                    saveGridRows({});
                }, 5);
            })
            .catch(() => { });
    };

    useEffect(() => {
        if (!!Object.keys(selected || {}).length) {
            secondFetch();
        }
    }, [selected]);

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
                            ListboxProps={{
                                'aria-details': 'grid-autocomplete',
                            }}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            options={options}
                            loading={loading}
                            value={value}
                            onChange={(event: any, newValue: any) => {
                                setSelected(newValue);
                                setValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
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
                                    if (options.length === 0 && input.value) {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        setTimeout(() => {
                                            input?.focus();
                                            input.style.color = 'red';
                                            input.style.borderBottom =
                                                '1px solid #ff000054';
                                        }, 150);
                                    }
                                    setTimeout(() => {
                                        if (
                                            options[0] &&
                                            // @ts-ignore
                                            options[0].code &&
                                            // @ts-ignore
                                            options[0].code
                                                ?.toUpperCase()
                                                .includes(
                                                    (
                                                        event.target as HTMLInputElement
                                                    ).value?.toUpperCase(),
                                                )
                                        ) {
                                            setSelected(options[0]);
                                            setValue(options[0]);
                                        }
                                    }, 60);
                                }
                            }}
                            renderInput={(inputPrams: any) => (
                                <TextField
                                    {...inputPrams}
                                    name={name}
                                    fullWidth
                                    InputProps={{
                                        ...inputPrams.InputProps,
                                        endAdornment: (
                                            <ButtonBase
                                                onClick={onF2}
                                                className="searchBtn"
                                            >
                                                <SearchIcon />
                                            </ButtonBase>
                                        ),
                                    }}
                                />
                            )}
                            renderOption={(props: any, option: any) => {
                                return (
                                    <li {...props}>
                                        {!!option?.display_label?.code && (
                                            <span className="code">
                                                {option.display_label.code}
                                            </span>
                                        )}
                                        <span className="description">
                                            {option?.display_label?.desc}
                                        </span>
                                    </li>
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

export default GridAutoCompleteMultiRequest;
