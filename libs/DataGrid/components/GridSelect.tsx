import { useFormContext } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useKeyPress } from 'ahooks';
import { instance } from '../../../api/config';
import { addNewRow } from '../functions';

export const generateDynamicOptions = async (url: string) => {
    const res = await instance.get(url);
    return res.data.results;
};
const GridSelect = ({
    label,
    params,
    saveGridRows,
    options,
    placeholder,
    inputProps: { defaultValue, ...otherInputProps },
    updateRow,
    default_value,
    ...restProps
}: any) => {
    const ref: any = useRef();
    const [selectOptions, setSelectOptions] = useState<[]>([]);

    useEffect(() => {
        if (options?.length) {
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

    const [selected, setSelected] = useState<any>('');
    const [isTouch, setIsTouch] = useState<boolean>(false);
    const [defaultSelect, setDefaultSelect] = useState<any>(null);

    // set default value when we get params.value from api use for edit page
    useEffect(() => {
        if (!!params?.value && !defaultSelect && !isTouch) {
            setSelected(params?.value);
        }
    }, [defaultSelect, params?.value, isTouch]);
    //=

    // when params.value is empty and has a default value
    useEffect(() => {
        if (!params?.value && !!default_value) {
            setDefaultSelect(default_value);
        }
    }, [params.value, default_value]);

    useEffect(() => {
        if (!!defaultSelect) {
            const evt: any = {
                target: {
                    value: defaultSelect,
                },
            };
            (otherInputProps as any)?.onChangeCapture(evt);
            setSelected(defaultSelect);
            setDefaultSelect(null);
        }
    }, [defaultSelect]);
    //=

    const handle_changeDate = (evt: any) => {
        setSelected(evt.target.value);
    };

    useEffect(() => {
        if (selected) {
            updateRow({
                index: params.row.index,
                newRow: {
                    ...params.row,
                    [params.field]: selected,
                },
            });
        }
    }, [selected]);

    // in Order screen restProps?.gridName === 'order_items'
    // watch main status input if it change to "cancel || close"
    // every status column in order_items grid have to
    // change to "Close" and open_qty = 0
    const { watch } = useFormContext();
    const watchMainStatus = watch('status');
    useEffect(() => {
        if (restProps?.gridName === 'order_items' && params.field === 'status')
            if (
                (selected?.toString()?.toLowerCase() === 'close' ||
                    selected?.toString()?.toLowerCase() === 'cancel') &&
                isTouch
            ) {
                updateRow({
                    index: params?.row.index,
                    newRow: {
                        ...params?.row,
                        status: selected,
                        adjusted_qty: params?.row?.open_qty,
                        open_qty: 0,
                    },
                });
                saveGridRows({});
            } else if (
                (selected?.toString()?.toLowerCase() !== 'close' ||
                    selected?.toString()?.toLowerCase() !== 'cancel') &&
                isTouch
            ) {
                updateRow({
                    index: params?.row.index,
                    newRow: {
                        ...params?.row,
                        status: selected,
                        open_qty: params?.row?.adjusted_qty,
                        adjusted_qty: 0,
                        details: {
                            ...params?.row?.details,
                            status: selected,
                            open_qty: params?.row?.adjusted_qty,
                            adjusted_qty: 0,
                        },
                    },
                });
                saveGridRows({});
            }
    }, [selected]);

    useEffect(() => {
        if (
            restProps?.gridName === 'order_items' &&
            (watchMainStatus?.toString()?.toLowerCase() === 'close' ||
                watchMainStatus?.toString()?.toLowerCase() === 'cancel')
        ) {
            setIsTouch(false);
            updateRow({
                index: params?.row.index,
                newRow: {
                    ...params?.row,
                    status: watchMainStatus,
                    adjusted_qty:
                        params?.row?.open_qty > 0
                            ? params?.row?.open_qty
                            : params?.row?.adjusted_qty,
                    open_qty: 0,
                    details: {
                        ...params?.row?.details,
                        adjusted_qty:
                            params?.row?.open_qty > 0
                                ? params?.row?.open_qty
                                : params?.row?.adjusted_qty,
                        open_qty: 0,
                    },
                },
            });
            saveGridRows({});
        }
    }, [watchMainStatus]);
    //=

    // in Purchase Order screen
    useEffect(() => {
        if (
            (restProps?.gridName === 'pro_lines' ||
                restProps?.gridName === 'purchase_receipt_lines') &&
            params.field === 'inventory_uom' &&
            selected &&
            isTouch
        ) {
            updateRow({
                index: params?.row.index,
                newRow: {
                    ...params?.row,
                    inventory_uom: selected,
                    price: 0,
                },
            });
            saveGridRows({});
            setIsTouch(false);
        }
    }, [
        selected,
        isTouch,
        restProps?.gridName,
        params.field,
        params?.row,
        updateRow,
        saveGridRows,
    ]);
    //=

    useKeyPress(
        'Enter',
        (e: any) => {
            const currentCell = e.target?.closest('.MuiDataGrid-cell');
            const nextCell = currentCell?.nextElementSibling;
            const nextCellInput = nextCell?.querySelector(
                'input:not(:disabled)',
            );
            if (nextCellInput) {
                nextCellInput?.focus();
            } else {
                const nextRow =
                    currentCell?.closest('.MuiDataGrid-row').nextElementSibling;
                const nextRowInput = nextRow?.querySelector(
                    'input:not(:disabled)',
                );
                if (!nextRow) {
                    addNewRow({
                        // @ts-ignore
                        apiRef: restProps.apiRef,
                        // @ts-ignore
                        addable: restProps.addable,
                        // @ts-ignore
                        setGridValue: restProps.setGridValue,
                    });

                    setTimeout(() => {
                        const nextRow =
                            currentCell?.closest(
                                '.MuiDataGrid-row',
                            ).nextElementSibling;
                        const nextRowInput = nextRow?.querySelector(
                            'input:not(:disabled)',
                        );
                        nextRowInput?.focus();
                    }, 50);
                } else {
                    nextRowInput?.focus();
                }
            }
            e.preventDefault();
            e.stopPropagation();
        },
        {
            target: ref?.current?.parentElement,
        },
    );

    return (
        <FormControl fullWidth data-fieldType="SELECT" ref={ref}>
            <InputLabel id={`simple-select-label_${params.id}`}>
                {placeholder || ''}
            </InputLabel>
            <Select
                {...otherInputProps}
                value={selected}
                onKeyDown={event => {
                    setIsTouch(true);
                    event.defaultPrevented = true;
                }}
                labelId={`simple-select-label_${params.id}`}
                id={`simple-select_${params.id}`}
                label={label || ''}
                onChange={e => {
                    setIsTouch(true);
                    handle_changeDate(e);
                    (otherInputProps as any)?.onChangeCapture(e);
                }}
            >
                {selectOptions?.length
                    ? selectOptions?.map((item: any) => (
                          <MenuItem key={item.value} value={item.value}>
                              {item.code && (
                                  <span className="code">{item.code}</span>
                              )}
                              <span className="label">{item.label}</span>
                          </MenuItem>
                      ))
                    : null}
            </Select>
        </FormControl>
    );
};

export default GridSelect;
