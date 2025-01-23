import { FormControl, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function GridSequence({
    apiRef,
    params,
    updateRow,
    saveGridRows,
    inputProps: { name },
}: any) {
    const { watch } = useFormContext();

    //= ========================================================
    // These useEffect hooks update a row and saves grid rows
    // when the 'end_date' and 'start_date' value of page change.
    const watchStopDate = watch('end_date') || watch('stop_date');
    useEffect(() => {
        if (
            (params?.colDef?.grid_name === 'order_items' ||
                params?.colDef?.grid_name === 'pro_lines' ||
                params?.colDef?.grid_name === 'purchase_receipt_lines') &&
            updateRow &&
            watchStopDate
        ) {
            updateRow({
                index: params?.row.index,
                newRow: {
                    ...params?.row,
                    stop_date: watchStopDate ?? null,
                    details: {
                        ...params?.row?.details,
                        stop_date: watchStopDate ?? null,
                    },
                },
            });
            saveGridRows({});
        }
    }, [watchStopDate]);

    const watchStartDate = watch('start_date');
    useEffect(() => {
        if (
            (params?.colDef?.grid_name === 'order_items' ||
                params?.colDef?.grid_name === 'pro_lines' ||
                params?.colDef?.grid_name === 'purchase_receipt_lines') &&
            updateRow &&
            watchStartDate
        ) {
            updateRow({
                index: params?.row.index,
                newRow: {
                    ...params?.row,
                    start_date: watchStartDate,
                    details: {
                        ...params?.row?.details,
                        start_date: watchStartDate,
                    },
                },
            });
            saveGridRows({});
        }
    }, [watchStartDate]);
    //= =====================================================

    const formatValue = (valueParams: any) => {
        if (valueParams?.colDef?.args?.incremental_number) {
            return (
                apiRef?.current?.getRowIndexRelativeToVisibleRows(
                    valueParams.id,
                ) + 1
            );
        }
        return valueParams.value;
    };

    return (
        <FormControl variant="filled" fullWidth>
            <TextField
                id={name}
                type="number"
                value={formatValue(params)}
                disabled
                InputProps={{
                    readOnly: true,
                }}
            />
        </FormControl>
    );
}
