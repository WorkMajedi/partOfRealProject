/* eslint-disable no-nested-ternary */
import { Box, ButtonBase, Typography } from '@mui/material';
import { isBoolean } from 'ahooks/es/utils';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { openScreenPopup } from 'redux/slices/screenPopup/screenPopupSlice';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { openPopup } from 'redux/slices/managePopup/managePopupSlice';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { LabelWrapper } from './GridLabel.styles';

dayjs.extend(customParseFormat);

const CodeLabel = ({ value, type, colDef: { args }, ...restProp }: any) => {
    const dispatch = useDispatch();
    const displayKeys = args?.keys || [];
    const typ = type || value?.target?.type;

    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:
            defaultOption?.default_monetary_unit === 'Euro'
                ? 'EUR'
                : defaultOption?.default_monetary_unit === 'Pound'
                ? 'GBP'
                : 'USD',
    });

    return (
        <LabelWrapper p={!!typ ? 0 : 2} display={!!typ ? 'grid' : 'flex'}>
            {!!typ ? (
                <ButtonBase
                    disableRipple
                    onClick={() => {
                        if (typ === 'screen') {
                            dispatch(
                                openScreenPopup({
                                    name:
                                        args?.target?.related_modal ||
                                        value?.target?.related_modal,
                                    isOpen: true,
                                    target: {
                                        ...(args?.target || value?.target),
                                        ...value,
                                        row: restProp?.api?.getRow(
                                            restProp?.id,
                                        ),
                                    },
                                }),
                            );
                        }
                        if (typ === 'modal') {
                            dispatch(
                                openPopup({
                                    name: args?.target?.related_modal,
                                    isOpen: true,
                                    inModal: true,
                                    state: {
                                        rowId: restProp?.id,
                                        row: restProp?.api?.getRow(
                                            restProp?.id,
                                        ),
                                        rowIndex:
                                            restProp?.api?.getRowIndexRelativeToVisibleRows(
                                                restProp?.id,
                                            ),
                                        filter: args?.target?.filter,
                                        id_source: args?.target?.id_source,
                                    },
                                }),
                            );
                        }
                    }}
                >
                    {(value[displayKeys[0]] || value?.code) && (
                        <Typography
                            variant="body1"
                            component="span"
                            className="code"
                        >
                            {args?.target?.add_currency
                                ? formatter.format(
                                      value[displayKeys[0]] || value?.code,
                                  )
                                : value[displayKeys[0]] || value?.code}
                        </Typography>
                    )}
                    {(value[displayKeys[1]] || value?.description) && (
                        <Typography
                            variant="body1"
                            component="span"
                            className="label"
                        >
                            {value[displayKeys[1]] || value?.description}
                        </Typography>
                    )}
                </ButtonBase>
            ) : (
                <>
                    {(value[displayKeys[0]] || value?.code) && (
                        <Typography
                            variant="body1"
                            component="span"
                            className="code"
                        >
                            {value[displayKeys[0]] || value?.code}
                        </Typography>
                    )}
                    {(value[displayKeys[1]] || value?.description) && (
                        <Typography
                            variant="body1"
                            component="span"
                            className="label"
                        >
                            {value[displayKeys[1]] || value?.description}
                        </Typography>
                    )}
                </>
            )}
        </LabelWrapper>
    );
};
const StatusLabel = ({ value, colDef }: any) => {
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
        ...colDef?.args,
    };

    const status: {
        color?: string;
        label?: string;
    } = args[value];

    return (
        <span
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: status.color || '#fff',
            }}
        >
            {status.label}
        </span>
    );
};

export default function GridLabel({
    inputProps,
    value,
    row,
    updateRow,
    saveGridRows,
    type,
    ...restProps
}: any) {
    // =========all these👇 in order/pick/invoice page
    const [finalPrice, setFinalPrice] = useState<null | number>(null);
    const [totalDu, setTotalDu] = useState<null | number>(null);

    const handleExtension = useCallback(
        ({ order_qty, price, invoice_qty, received_qty }: any) => {
            if (
                (restProps?.gridName === 'order_items' ||
                    restProps?.gridName === 'pro_lines') &&
                order_qty >= 0 &&
                price >= 0
            ) {
                setFinalPrice(Number((price * order_qty).toFixed(3)));
            } else if (
                restProps?.gridName === 'invoice_items' &&
                invoice_qty >= 0 &&
                price >= 0
            ) {
                setFinalPrice(Number((price * invoice_qty).toFixed(3)));
            } else if (
                restProps?.gridName === 'purchase_receipt_lines' &&
                received_qty >= 0 &&
                price >= 0
            ) {
                setFinalPrice(Number((price * received_qty).toFixed(3)));
            }
        },
        [restProps?.gridName],
    );
    const { id: idCash } = useParams();
    const handleExtensionCashApplicationTotalDue = useCallback(
        ({ total_due, applied_cash, applied_credit }: any) => {
            if (restProps?.gridName === 'invoices_list') {
                if (idCash) {
                    if (+total_due > 0) {
                        setTotalDu(
                            Number(
                                (
                                    total_due -
                                    (applied_cash + applied_credit)
                                ).toFixed(3),
                            ),
                        );
                    } else {
                        setTotalDu(0.0);
                    }
                } else {
                    setTotalDu(
                        Number(
                            (
                                total_due -
                                (applied_cash + applied_credit)
                            ).toFixed(3),
                        ),
                    );
                }
            }
        },
        [restProps?.gridName],
    );

    useEffect(() => {
        const fn = () => {
            if (
                ((restProps?.gridName === 'order_items' ||
                    restProps?.gridName === 'pro_lines') &&
                    row?.order_qty >= 0 &&
                    row?.price >= 0) ||
                (restProps?.gridName === 'invoice_items' &&
                    row?.invoice_qty >= 0 &&
                    row?.price >= 0) ||
                (restProps?.gridName === 'purchase_receipt_lines' &&
                    row?.received_qty >= 0 &&
                    row?.price >= 0)
            )
                handleExtension({
                    order_qty: row?.order_qty || 0,
                    price: row?.price || 0,
                    invoice_qty: +row?.invoice_qty || 0,
                    received_qty: +row?.received_qty || 0,
                });
        };

        document
            .querySelector(`input[name="_${row.index}_order_items_order_qty"]`)
            ?.addEventListener('blur', fn);

        document
            .querySelector(`input[name="_${row.index}_order_items_price"]`)
            ?.addEventListener('blur', fn);

        document
            .querySelector(`input[name="_${row.index}_pro_lines_order_qty"]`)
            ?.addEventListener('blur', fn);

        document
            .querySelector(`input[name="_${row.index}_pro_lines_price"]`)
            ?.addEventListener('blur', fn);
        document
            .querySelector(
                `input[name="_${row.index}_purchase_receipt_lines_received_qty"]`,
            )
            ?.addEventListener('blur', fn);
        document
            .querySelector(
                `input[name="_${row.index}_purchase_receipt_lines_price"]`,
            )
            ?.addEventListener('blur', fn);

        // const setTimeOutSum = setTimeout(() => {
        // if (
        //     ((restProps?.gridName === 'order_items' ||
        //         restProps?.gridName === 'pro_lines') &&
        //         row?.order_qty >= 0 &&
        //         row?.price >= 0) ||
        //     (restProps?.gridName === 'invoice_items' &&
        //         row?.invoice_qty >= 0 &&
        //         row?.price >= 0)
        // )
        //     handleExtension({
        //         order_qty: row?.order_qty || 0,
        //         price: row?.price || 0,
        //         invoice_qty: row?.invoice_qty || 0,
        //     });
        // }, 500);
        // return () => clearTimeout(setTimeOutSum);
    }, [
        restProps?.gridName,
        handleExtension,
        row?.order_qty,
        row?.price,
        row?.invoice_qty,
        row,
        row.index,
    ]);

    useMemo(() => {
        if (
            ((restProps?.gridName === 'order_items' ||
                restProps?.gridName === 'pro_lines') &&
                row?.order_qty >= 0 &&
                row?.price >= 0) ||
            (restProps?.gridName === 'invoice_items' &&
                row?.invoice_qty >= 0 &&
                row?.price >= 0) ||
            (restProps?.gridName === 'purchase_receipt_lines' &&
                row?.received_qty >= 0 &&
                row?.price >= 0)
        )
            handleExtension({
                order_qty: row?.order_qty || 0,
                price: row?.price || 0,
                invoice_qty: row?.invoice_qty || 0,
                received_qty: row?.received_qty || 0,
            });
    }, [row?.price]);

    useEffect(() => {
        const setTimeOutSum = setTimeout(() => {
            if (
                restProps?.gridName === 'invoices_list' &&
                row?.total_due >= 0
            ) {
                handleExtensionCashApplicationTotalDue({
                    total_due: +row?.total_due || 0,
                    applied_cash: +row?.applied_cash || 0,
                    applied_credit: +row?.applied_credit || 0,
                });
            }
        }, 500);
        return () => clearTimeout(setTimeOutSum);
    }, [
        restProps?.gridName,
        handleExtensionCashApplicationTotalDue,
        row?.total_due,
        row?.applied_cash,
        row?.applied_credit,
    ]);
    useEffect(() => {
        // after calculate final price
        if (
            (restProps?.gridName === 'order_items' ||
                restProps?.gridName === 'invoice_items' ||
                restProps?.gridName === 'purchase_receipt_lines' ||
                restProps?.gridName === 'pro_lines') &&
            updateRow &&
            finalPrice
        ) {
            updateRow({
                index: row.index,
                newRow: {
                    ...row,
                    extension: finalPrice,
                },
            });
            saveGridRows({});
        }
    }, [finalPrice]);
    useEffect(() => {
        // after calculate final price
        if (restProps?.gridName === 'invoices_list' && updateRow && totalDu) {
            updateRow({
                index: row.index,
                newRow: {
                    ...row,
                    row_total_due: totalDu,
                },
            });
            saveGridRows({});
        }
    }, [totalDu]);
    useEffect(() => {
        const fn = () => {
            if (
                ((restProps?.gridName === 'order_items' &&
                    Number(row?.order_qty) >= 0) ||
                    (restProps?.gridName === 'invoice_items' &&
                        Number(row?.invoice_qty) >= 0) ||
                    restProps?.gridName === 'pick_ticket_items') &&
                updateRow
            ) {
                updateRow({
                    index: row.index,
                    newRow: {
                        ...row,
                        open_qty:
                            Number(row?.order_qty || 0) -
                            Number(row?.invoiced_qty || 0) -
                            Number(row?.adjusted_qty || 0),
                        details: {
                            ...row.details,
                            open_qty:
                                Number(row?.order_qty) -
                                Number(row?.invoiced_qty || 0) -
                                Number(row?.adjusted_qty || 0),
                        },
                    },
                });
                saveGridRows({});
            }
        };
        document
            .querySelector(`input[name="_${row.index}_order_items_order_qty"]`)
            ?.addEventListener('blur', fn);

        document
            .querySelector(`input[name="_${row.index}_pro_lines_order_qty"]`)
            ?.addEventListener('blur', fn);
    }, [
        restProps?.gridName,
        row?.order_qty,
        row?.invoiced_qty,
        row?.adjusted_qty,
    ]);

    // ========= end in order page

    // ========= 👇 in adjustment page
    // set lot_number cell in grid base on lot_number input in page
    const { watch } = useFormContext();
    const watchLotNumber = watch('lot_number');
    useEffect(() => {
        if (
            restProps?.gridName === 'adjustment_add_to' &&
            restProps.field === 'lot_number' &&
            updateRow
        ) {
            updateRow({
                index: row.index,
                newRow: {
                    ...row,
                    lot_number: watchLotNumber,
                },
            });
            saveGridRows({});
        }
    }, [restProps?.gridName, restProps.field]);
    // ========= end in adjustment page

    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:
            defaultOption?.default_monetary_unit === 'Euro'
                ? 'EUR'
                : defaultOption?.default_monetary_unit === 'Pound'
                ? 'GBP'
                : 'USD',
    });

    // const isValidDate = dayjs(value).isValid() && dayjs(value,['MM-DD-YY H:mm:ss Z', 'YYYY-MM-DD']).isValid() ;
    // const formattedDate = isValidDate ? dayjs(value).format(value.length === 10 ? 'MM-DD-YYYY' : 'MM-DD-YYYY - h:mm A') : null;
    // : (isValidDate) ? (
    //     <LabelWrapper p={2}>
    //         {formattedDate ?? value}
    //     </LabelWrapper>
    // )
    return (
        <Box width="100%" height="100%" display="flex" alignItems="center">
            {isBoolean(value) ? (
                <StatusLabel value={value} {...restProps} />
            ) : !!value &&
              Object.prototype.toString.call(value) === '[object Object]' ? (
                <CodeLabel value={value} type={type} {...restProps} />
            ) : !!type ? (
                <CodeLabel
                    value={{
                        code: value,
                        id: row.id,
                    }}
                    type={type}
                    {...restProps}
                />
            ) : (
                // @ts-ignore
                <LabelWrapper
                    p={2}
                    style={{
                        background:
                            restProps.field === 'row_total_due'
                                ? totalDu && +totalDu < 0
                                    ? '#FF9785'
                                    : totalDu && +totalDu !== 0
                                    ? '#85CAA5'
                                    : ''
                                : '',
                    }}
                >
                    {restProps.field === 'extension'
                        ? formatter.format(finalPrice || 0)
                        : restProps.field === 'row_total_due'
                        ? formatter.format(totalDu || 0)
                        : value}
                    {/* {value} */}
                </LabelWrapper>
            )}
        </Box>
    );
}
