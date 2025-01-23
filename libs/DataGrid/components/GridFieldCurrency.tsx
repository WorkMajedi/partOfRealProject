/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils/formatPrice';

interface CustomProps {
    onChange: (event: { target: { name: string; value: any } }) => void;
    name: string;
    onChangeCustom: (value: {}) => void;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, onChangeCustom, ...other } = props;
        const [tempValue, setTempValue] = useState<number | undefined>(0);
        const rootRef = useRef(null);
        useEffect(() => {
            document
                .querySelector('button#save')
                ?.addEventListener('mouseenter', () => {
                    // @ts-ignore
                    rootRef?.current?.click();
                });
        }, [rootRef]);

        const handleChange = (value: any) => {
            onChangeCustom(value);
        };

        const onNumberChange = useCallback(
            (_event: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = _event.target;
                if (!value) return;
                const floatValue = formatPrice(value);
                onChange({
                    target: {
                        name: props.name,
                        value,
                    },
                });
                const targetValue: any = {
                    target: {
                        name: props.name,
                        value: floatValue,
                    },
                };
                handleChange(targetValue);
            },
            [handleChange, onChange, props.name],
        );

        return (
            <div
                onClick={() => {
                    if (tempValue) {
                        // @ts-ignore
                        onNumberChange({
                            // @ts-ignore
                            target: {
                                value: tempValue?.toString(),
                            },
                        });
                    }
                }}
                ref={rootRef}
            >
                <NumericFormat
                    {...other}
                    getInputRef={ref}
                    // @ts-ignore
                    onMouseLeave={onNumberChange}
                    onBlur={onNumberChange}
                    onValueChange={values => {
                        setTempValue(values?.floatValue);
                        // onChange({
                        //     target: {
                        //         name: props.name,
                        //         value: values.value,
                        //     },
                        // });
                        // const value: any = {
                        //     target: {
                        //         name: props.name,
                        //         value: values.floatValue,
                        //     },
                        // };
                        // handleChange(value);
                    }}
                    allowLeadingZeros
                    decimalScale={2}
                    fixedDecimalScale
                    thousandSeparator
                    valueIsNumericString
                />
            </div>
        );
    },
);

export default function GridFieldCurrency({
    inputProps: { name, ...rest },
    params,
    disabled,
}: any) {
    const { control } = useFormContext();
    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );
    return (
        <Controller
            control={control}
            name={name || ''}
            defaultValue={params?.value}
            disabled={disabled}
            render={({ field }) => (
                <FormControl variant="filled">
                    <TextField
                        style={{
                            background:
                                params?.field !== 'row_total_due'
                                    ? ''
                                    : params?.row?.row_total_due &&
                                        +params?.row?.row_total_due < 0
                                        ? '#FF9785'
                                        : params?.row?.row_total_due &&
                                            +params?.row?.row_total_due !== 0
                                            ? '#85CAA5'
                                            : '',
                        }}
                        {...field}
                        id={params?.id}
                        color="secondary"
                        InputProps={{
                            inputComponent: NumericFormatCustom as any,
                            inputProps: {
                                onChangeCustom: (value: number) => {
                                    rest?.onChange?.(value);
                                    rest?.onChangeCapture?.(value);
                                },
                                value: params?.value,
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    {defaultOption?.default_monetary_unit ===
                                        'Euro' ? (
                                        <span>&#x20AC;</span>
                                    ) : defaultOption?.default_monetary_unit ===
                                        'Pound' ? (
                                        <span>&#xa3;</span>
                                    ) : (
                                        <span>&#x24;</span>
                                    )}
                                </InputAdornment>
                            ),
                            autoComplete: 'off',
                        }}
                    />
                </FormControl>
            )}
        />
    );
}
