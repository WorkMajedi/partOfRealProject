import { ChangeEvent, useEffect, useState } from 'react';
import {
    FormControl,
    ButtonBase,
    Box,
    useTheme,
    TextField,
} from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// @ts-ignore
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// @ts-ignore
const CustomTextField = ({
    required,
    startIcon,
    endIcon,
    inputProps: { onChange, onChangeCapture, ...restInputProps },
    inputType,
    errorMsg,
    error,
    helperText,
    params,
    sx,
    ...otherProps
}: any) => {
    const theme = useTheme();

    const [customType, setCustomType] = useState(inputType);
    useEffect(() => {
        setCustomType(inputType);
    }, [inputType]);

    const rowData = useSelector((state: any) => state?.GridsListSlice?.rowData);
    const [valueErr, setValueErr] = useState(false);

    return (
        <FormControl variant="filled" fullWidth>
            <TextField
                id={restInputProps.name}
                type={customType}
                required={required}
                disabled={params.colDef.disable}
                color="secondary"
                onChange={evt => {
                    setValueErr(false);
                    if (
                        restInputProps.name.includes(
                            'pick_ticket_item_lots_picked_qty',
                        )
                    ) {
                        setValueErr(false);
                        const newValue = Number(evt.target.value);
                        if (
                            (rowData?.open_qty > 0 &&
                                newValue <= rowData?.open_qty) ||
                            rowData?.open_qty === 0
                        ) {
                            if (newValue <= params?.row?.onhand_qty) {
                                onChange(evt);
                                onChangeCapture(evt);
                            } else {
                                setValueErr(true);
                                return toast.error(
                                    `Lot Picked Qty bigger than Lot OnHand Qty`,
                                );
                            }
                        } else {
                            setValueErr(true);
                            return toast.error(
                                `Picked Qty bigger than Open Qty`,
                            );
                        }
                    } else {
                        onChange(evt);
                        onChangeCapture(evt);
                    }
                }}
                helperText={
                    <Box
                        component="span"
                        color={
                            error
                                ? theme.palette.error.main
                                : theme.palette.grey[800]
                        }
                    >
                        {error && Boolean(errorMsg) ? errorMsg : helperText}
                    </Box>
                }
                InputProps={{
                    onBlurCapture: (_event: ChangeEvent<HTMLInputElement>) => {
                        if (required && !_event.target.value) {
                            setValueErr(true);
                        } else setValueErr(false);
                    },
                    componentsProps: {
                        input: {
                            ...(restInputProps?.name?.includes(
                                'pick_ticket_item_lots_picked_qty',
                            )
                                ? {
                                      max: rowData?.open_qty,
                                      min: 0,
                                  }
                                : {}),
                        },
                    },
                    startAdornment: startIcon,
                    endAdornment:
                        inputType === 'password' ? (
                            <ButtonBase
                                onClick={() => {
                                    if (customType === 'text') {
                                        setCustomType('password');
                                    } else {
                                        setCustomType('text');
                                    }
                                }}
                            >
                                {customType === 'text' ? (
                                    <RemoveRedEyeOutlinedIcon />
                                ) : (
                                    <VisibilityOffOutlinedIcon />
                                )}
                            </ButtonBase>
                        ) : (
                            endIcon
                        ),
                    autoComplete: 'off',
                    ...restInputProps,
                }}
                className={required ? 'required' : ''}
                sx={{
                    ...(valueErr
                        ? {
                              border: theme =>
                                  `3px solid ${theme.palette.error.main}`,
                          }
                        : {}),
                    '& input': {
                        paddingLeft: startIcon ? '9px' : '16px',
                        textTransform:
                            // @ts-ignore
                            inputType === 'password' || inputType === 'email'
                                ? 'none !important'
                                : 'capitalize !important',
                    },
                    ...sx,
                }}
                {...otherProps}
                error={error || valueErr}
                // onClick={evt => {
                //         clearFields();
                //         // if (
                //         //     (evt?.target as InputHTMLAttributes<any>)?.value === '0'
                //         // )
                //         //     clearFields();
                //     }}
                //     onBlur={() => {
                //         clearFields();
                //     }}
                //     onFocus={evt => {
                //         if (evt.target.value === '0') clearFields();
                // }}
            />
        </FormControl>
    );
};

export default CustomTextField;
