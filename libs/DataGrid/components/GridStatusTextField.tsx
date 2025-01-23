import { useEffect } from 'react';
import { FormControl, TextField } from '@mui/material';
import { CustomTextFieldProps } from './TextField/TextFiled';
// @ts-ignore
const GridStatusTextField = ({
    inputProps: { defaultValue, ...otherInputProps },
    params,
    updateRow,
}: CustomTextFieldProps) => {
    const args: {
        [key: string]: {};
    } = {
        false: {
            label: 'Failed',
            color: '#FF513399',
        },
        true: {
            label: 'Approved',
            color: '#34A76999',
        },
        nature: {
            color: 'transparent',
        },
        ...params.colDef?.args,
    };

    let trueActualValue: boolean | string = '';
    if (params?.colDef?.field === 'raw_material_status') {
        trueActualValue =
            !!params.row?.raw_material_quantity &&
            !!params.row?.raw_material_available_qty
                ? Number(params.row?.raw_material_quantity) <=
                  Number(params.row?.raw_material_available_qty)
                : 'nature';
    } else {
        trueActualValue =
            !!params.row?.min_value &&
            !!params.row?.max_value &&
            !!params.row?.actual_value
                ? Number(params.row?.actual_value) >=
                      Number(params.row?.min_value) &&
                  Number(params.row?.actual_value) <=
                      Number(params.row?.max_value)
                : 'nature';
    }

    const status: {
        color?: string;
        label?: string;
    } = args[trueActualValue.toString()];

    useEffect(() => {
        if (status.label && updateRow) {
            updateRow({
                index: params.row.index,
                newRow: {
                    status: status.label,
                    ...params.row,
                },
            });
        }
    }, [status.label]);

    return (
        <FormControl variant="filled" fullWidth>
            <TextField
                value={status.label || ''}
                disabled="true"
                className="cellStatus"
                sx={{
                    '& .MuiOutlinedInput-input': {
                        '&.Mui-disabled': {
                            background: status.color,
                        },
                    },
                }}
                {...otherInputProps}
            />
        </FormControl>
    );
};

export default GridStatusTextField;
