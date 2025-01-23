/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
/* eslint-disable no-duplicate-case */
/* eslint-disable react/no-unstable-nested-components */
import React, { FunctionComponent, useEffect, useMemo, useRef } from 'react';
import { Alert, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    createPopup,
    closePopup,
} from 'redux/slices/managePopup/managePopupSlice';
import { useFormContext } from 'react-hook-form';
import {
    clearProductionDefinePackaging,
    productionDefinePackaging,
    saveRowData,
    updateGrid,
} from 'redux/slices/dataGrid/gridsDataSlice';
import { toast } from 'react-toastify';
import { Field } from 'types/type';
import CuDialog from 'component/CuDialog';
import { useSearchParams } from 'react-router-dom';
import SelectedComponent from '../selectedComponent/SelectedComponent';
import CuAlert from '../../../component/common/CuAlerts';
import { getValueQuantityUom } from '../../../utils/utils';

interface OwnProps {
    modals: any;
    name: string;
}

type Props = OwnProps;

const GenerationContentModal: FunctionComponent<Props> = ({ modals, name }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const selected = useSelector((state: any) => {
        const sel = state?.ManagePopup?.Popup.find((e: any) => e.name === name);
        return sel;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createPopup({ name, isOpen: false }));
    }, []);

    const handelClosePopup = () => {
        dispatch(closePopup({ name, isOpen: false }));
        setTimeout(() => {
            if (
                searchParams.has('dynamic-query') &&
                modals[name].type !== 'detail'
            ) {
                searchParams.delete('dynamic-query');
                setSearchParams(searchParams);
            }
            if (searchParams.has('filter-query')) {
                searchParams.delete('filter-query');
                setSearchParams(searchParams);
            }
        }, 500);
    };
    useEffect(() => {
        return () => {
            handelClosePopup();
        };
    }, []);

    const { handleSubmit, reset, setValue, watch } = useFormContext();

    useMemo(() => {
        const incomingRow = selected?.state?.row;
        if (incomingRow && modals[name].type === 'detail') {
            const { details, ...rest } = incomingRow;
            reset({ ...rest, ...details, details });
        } else {
            reset({});
        }
    }, [selected?.state, setValue]);

    const ref: any = useRef(null);

    const handleModalData = (details: any) => {
        if (selected?.state?.updateRow && selected?.state?.saveGridRows) {
            selected?.state?.updateRow({
                newRow: {
                    ...(selected?.state?.row ?? {}),
                    details: {
                        ...details,
                        phase_code:
                            selected?.state?.row?.phase_code ||
                            selected?.state?.row?.code,
                        phase_description:
                            selected?.state?.row?.phase_description ||
                            selected?.state?.row?.description,
                    },
                    ...details,
                    phase_code:
                        selected?.state?.row?.phase_code ||
                        selected?.state?.row?.code,
                    phase_description:
                        selected?.state?.row?.phase_description ||
                        selected?.state?.row?.description,
                    code:
                        selected?.state?.row?.phase_code ||
                        selected?.state?.row?.code,
                    description:
                        selected?.state?.row?.phase_description ||
                        selected?.state?.row?.description,
                },
            });

            selected?.state?.saveGridRows({});
        }

        dispatch(
            updateGrid({
                name: selected?.state?.grid,
                row: {
                    ...(selected?.state?.row ?? {}),
                    details: {
                        ...details,
                        phase_code:
                            selected?.state?.row?.phase_code ||
                            selected?.state?.row?.code,
                        phase_description:
                            selected?.state?.row?.phase_description ||
                            selected?.state?.row?.description,
                    },
                    ...details,
                    phase_code:
                        selected?.state?.row?.phase_code ||
                        selected?.state?.row?.code,
                    phase_description:
                        selected?.state?.row?.phase_description ||
                        selected?.state?.row?.description,
                },
            }),
        );
    };

    const handleDataModalInOrderScreenDetail = (details: any) => {
        if (
            Number(details?.invoice_qty) < Number(details?.order_qty) &&
            Number(details?.open_qty) > 0 &&
            details?.status !== 'Open'
        ) {
            selected.state?.updateRow({
                newRow: {
                    ...(selected?.state?.row ?? {}),
                    status: 'Open',
                    details: {
                        ...details,
                        status: 'Open',
                    },
                },
            });

            selected.state?.saveGridRows({});
        }

        if (details?.status === 'Close' || details?.status === 'Cancel') {
            selected.state?.updateRow({
                newRow: {
                    ...(selected?.state?.row ?? {}),
                    details: {
                        ...details,
                        adjusted_qty: details?.open_qty,
                        open_qty: 0,
                    },
                },
            });

            selected.state?.saveGridRows({});
        }
    };

    useEffect(() => {
        // below code for Production/list/details => production cost button
        if (selected?.name === 'production_cost') {
            reset({ ...selected.extraDataForModal });
        }
        if (selected?.name === 'cash_application_available_credits_list') {
            setValue('available_credits_list', selected?.extraDataForModal);
        }
    }, [selected]);

    const handleDataWithOnRowDoubleClick = (dataResult: any) => {
        const result = dataResult?.data?.results || dataResult;
        return result.map((r: any) => ({
            ...r,
            onRowDoubleClick: () => {
                if (selected?.state?.grid) {
                    selected?.state?.setValue({
                        ...r,
                        packaging_code: r.code,
                        packaging_description: r.description,
                        backendId: r.id,
                    });

                    if (selected?.state?.ref) {
                        setTimeout(() => {
                            selected?.state?.ref
                                ?.querySelector('input')
                                ?.focus();
                        }, 500);
                    }

                    selected?.state?.setSelectedFromModal(true);
                } else {
                    selected?.state?.clearErrors(
                        `root.${selected?.state?.name}`,
                    );
                    selected?.state?.setSelectedItems({
                        ...r,
                        label: `${r.code} / ${r.description}`,
                        value: r.id,
                    });
                    selected?.state?.setSearchedValue(
                        `${r.code} / ${r.description}`,
                    );

                    selected?.state?.setValue(selected?.state?.name, {
                        ...r,
                        label: `${r.code} / ${r.description}`,
                        value: r.id,
                    });
                    setTimeout(() => {
                        selected.state?.ref
                            ?.closest('.MuiGrid-item')
                            .nextElementSibling?.querySelector('input')
                            ?.focus();
                    }, 500);
                }
                handelClosePopup();
            },
        }));
    };

    const allData = watch('production_define_packaging');
    const totalSelectedCapacity = watch('total_selected_capacity');
    const productionVolume = selected?.extraDataForModal?.productionVolume || 0;
    const getTotalPackage = (details: any) => {
        if (!details.length) {
            return 0;
        }
        const totalPackage: any = details.reduce(
            (acc: any, currentItem: any) => {
                const packagingVolume =
                    parseFloat(currentItem.packaging_volume) || 0;
                const itemRequestedQty =
                    parseFloat(currentItem.item_requested_qty) || 0;
                const volume_uom = getValueQuantityUom(
                    currentItem?.item_quantity_uom,
                );
                const cost = packagingVolume * itemRequestedQty * volume_uom;
                return acc + cost;
            },
            0,
        );
        return +totalPackage;
    };

    useEffect(() => {
        if (
            (selected?.name === 'production_define_packaging' &&
                !!allData?.length) ||
            (selected?.name === 'production_define_packaging' &&
                !!selected?.state?.length)
        ) {
            const totalPackage = getTotalPackage(allData || selected?.state);
            setValue('total_selected_capacity', totalPackage);
        }
    }, [allData, selected]);
    // -----------------------------------------      end  ---------------------------------------------------------

    useEffect(() => {
        return () => {
            console.log('--  exit from  --');
            dispatch(clearProductionDefinePackaging());
        };
    });
    const chooseComponent = useMemo(
        () => (type: string, dialog: any) => {
            const dialogFieldNames = dialog?.fields?.map((f: any) => f.name);
            const dialogGridField = dialog?.fields?.find(
                (f: any) =>
                    f.component_type === '#GridEditableStatic' ||
                    f.component_type === '#GridEditableDynamic',
            );

            const onSave = handleSubmit((d: any) => {
                const details: any = {};

                Object.keys(d).map((key: any) => {
                    if (key === dialogGridField?.name && key !== 'lots_list') {
                        const nonEmptyRows = d[key].filter((r: any) => {
                            const condition =
                                dialogGridField?.args?.critical_fields?.some(
                                    (f: string) => !!r[f],
                                );
                            return condition;
                        });
                        return (details[key] = nonEmptyRows);
                    }
                    if (dialogFieldNames.includes(key)) {
                        details[key] = d[key];
                    }
                });
                //= in order item details to handle status
                if (selected.name === 'order_add_item_details') {
                    handleDataModalInOrderScreenDetail(details);
                }
                //=

                //= in pick_ticket item details
                // when we set pick_qty in modal for a lot
                if (
                    selected.name === 'pick_ticket_add_item_details' &&
                    !!details?.pick_ticket_item_lots?.length
                ) {
                    const sumLotPicked = details.pick_ticket_item_lots.reduce(
                        (
                            acc: { picked: number; suggest: number },
                            lot: any,
                        ) => {
                            const lotValue = Number(lot?.picked_qty || 0);
                            const suggestValue = Number(
                                lot?.suggested_picked_qty || 0,
                            );
                            acc.picked += lotValue;
                            acc.suggest += suggestValue;
                            return acc;
                        },
                        { picked: 0, suggest: 0 },
                    );

                    if (
                        details?.open_qty > 0 &&
                        sumLotPicked?.suggest > details?.open_qty
                    ) {
                        toast.warning(
                            'The sum of the Suggested Picked Qty column is bigger than the Open Qty',
                        );
                    }

                    if (
                        details?.open_qty > 0 &&
                        sumLotPicked?.picked > details?.open_qty
                    ) {
                        return toast.error(
                            'The sum of the Picked Qty column is bigger than the Open Qty',
                        );
                    }
                    details.picked_qty = sumLotPicked?.picked;
                }
                //=

                //= in Production define  Packaging Material
                if (
                    selected.name === 'production_define_packaging' &&
                    !!details?.production_define_packaging?.length
                ) {
                    details.total_selected_capacity = totalSelectedCapacity;
                    if (
                        +productionVolume > 0 &&
                        +totalSelectedCapacity > +productionVolume
                    ) {
                        setTimeout(() => {
                            toast.error(
                                `Due to the volume of production  ${productionVolume} , the number of selected packages is  ${totalSelectedCapacity}  more than what you need`,
                            );
                        }, 0);
                    }
                }
                //=
                //= in production for packaging btn
                dispatch(
                    productionDefinePackaging({
                        ...details,
                    }),
                );
                //=
                handleModalData(details);
                reset({});
                handelClosePopup();
            });

            switch (type) {
                case 'detail':
                    return (
                        <CuDialog
                            maxWidth="lg"
                            fullWidth
                            open={selected?.isOpen}
                            closeModal={handelClosePopup}
                            title={dialog?.label}
                            state={selected?.state}
                        >
                            <div ref={ref}>
                                <Grid container spacing={2}>
                                    {modals &&
                                        dialog?.fields?.map(
                                            (com: Field, index: number) => {
                                                const OrderQty =
                                                    selected?.state?.row
                                                        ?.open_qty ?? 0;
                                                if (com.name === 'auto_pick') {
                                                    com.args = {
                                                        action: 'auto_pick',
                                                        props: {
                                                            'data-OrderQty':
                                                                OrderQty,
                                                        },
                                                    };
                                                }
                                                if (
                                                    com.component_type.includes(
                                                        'Button',
                                                    )
                                                ) {
                                                    switch (
                                                        (com.args as any).action
                                                    ) {
                                                        case 'submit':
                                                            com.id = 'submit';
                                                            com.onClick =
                                                                () => {
                                                                    onSave();
                                                                    setTimeout(
                                                                        () => {
                                                                            (
                                                                                document.querySelector(
                                                                                    `[data-id="${selected?.state?.rowId}"] input:not(:disabled)`,
                                                                                ) as HTMLInputElement
                                                                            )?.focus();
                                                                        },
                                                                        5,
                                                                    );
                                                                };
                                                            break;

                                                        case 'close':
                                                            com.id = 'close';
                                                            com.onClick =
                                                                () => {
                                                                    handelClosePopup();
                                                                    setTimeout(
                                                                        () => {
                                                                            (
                                                                                document.querySelector(
                                                                                    `[data-id="${selected?.state?.rowId}"] input:not(:disabled)`,
                                                                                ) as HTMLInputElement
                                                                            )?.focus();
                                                                        },
                                                                        5,
                                                                    );
                                                                };
                                                            break;
                                                        default:
                                                            null;
                                                    }
                                                }

                                                // in pick ticket page to get lots
                                                if (
                                                    com.component_type.includes(
                                                        'GridEditableDynamic',
                                                    ) &&
                                                    !!selected?.state?.row?.code
                                                ) {
                                                    com.args.query_params_modal =
                                                        {
                                                            item_code__iexact:
                                                                selected.state
                                                                    .row.code,
                                                            onhand_qty__gt: 0,
                                                        };

                                                    // to handle (Lot Picked Qty bigger than Lot OnHand Qty
                                                    // & Picked Qty bigger than Open Qty) in pick ticket page
                                                    // after enter newValue in pick_qty cell
                                                    dispatch(
                                                        saveRowData(
                                                            selected?.state
                                                                ?.row,
                                                        ),
                                                    );
                                                    //= =
                                                }
                                                //= =

                                                if (
                                                    com.component_type.includes(
                                                        'GridSimple',
                                                    )
                                                ) {
                                                    com.args.query_params_modal =
                                                        {
                                                            ...(selected?.name ===
                                                            'item_details_lot_details'
                                                                ? {
                                                                      lot__iexact:
                                                                          selected
                                                                              ?.state
                                                                              ?.row
                                                                              ?.lot_id,
                                                                  }
                                                                : {}),
                                                            ...(selected?.name ===
                                                            'item_details_lot_log_histories_list'
                                                                ? {
                                                                      item_lot__id__iexact:
                                                                          selected
                                                                              ?.state
                                                                              ?.row
                                                                              ?.lot_id,
                                                                  }
                                                                : {}),
                                                        };
                                                }

                                                return (
                                                    <SelectedComponent
                                                        key={index.toString()}
                                                        field={com}
                                                        inModal={
                                                            selected?.inModal ||
                                                            selected?.state?.row
                                                                ?.rowId ||
                                                            selected?.state
                                                                ?.rowId
                                                        }
                                                    />
                                                );
                                            },
                                        )}
                                </Grid>
                            </div>
                        </CuDialog>
                    );
                case 'sampel':
                    return (
                        <CuDialog
                            maxWidth="lg"
                            open={selected?.isOpen}
                            closeModal={handelClosePopup}
                            title={dialog?.label}
                        >
                            <Grid container spacing={2}>
                                {modals &&
                                    dialog?.fields?.map(
                                        (com: Field, index: number) => {
                                            return (
                                                <SelectedComponent
                                                    key={index.toString()}
                                                    field={com}
                                                />
                                            );
                                        },
                                    )}
                            </Grid>
                        </CuDialog>
                    );
                case 'custom':
                    return (
                        <CuDialog
                            maxWidth="lg"
                            fullWidth
                            open={selected?.isOpen}
                            closeModal={handelClosePopup}
                            title={dialog?.label}
                        >
                            <Grid container spacing={2}>
                                {modals &&
                                selected?.name ===
                                    'production_define_packaging' &&
                                +productionVolume
                                    ? +totalSelectedCapacity > 0 && (
                                          <CuAlert
                                              isShow={Boolean(
                                                  +totalSelectedCapacity >
                                                      +productionVolume,
                                              )}
                                              severity="error"
                                          >
                                              Due to the volume of production
                                              <strong
                                                  style={{ padding: '0 6px' }}
                                              >
                                                  {productionVolume}
                                              </strong>{' '}
                                              the number of selected packages is
                                              <strong
                                                  style={{ padding: '0 6px' }}
                                              >
                                                  {totalSelectedCapacity}
                                              </strong>
                                              more than what you need`
                                          </CuAlert>
                                      )
                                    : null}
                                {modals &&
                                    dialog?.fields?.map(
                                        (com: Field, index: number) => {
                                            if (
                                                com.component_type.includes(
                                                    'Button',
                                                )
                                            ) {
                                                switch (
                                                    (com.args as any).action
                                                ) {
                                                    case 'submit':
                                                        com.id = 'submit';
                                                        com.onClick = () => {
                                                            onSave();
                                                        };
                                                        break;

                                                    case 'close':
                                                        com.id = 'close';
                                                        com.onClick = () => {
                                                            handelClosePopup();
                                                        };
                                                        break;
                                                    default:
                                                        null;
                                                }
                                            }
                                            if (
                                                com.component_type.includes(
                                                    'GridSimple',
                                                )
                                            ) {
                                                const updateUrl =
                                                    selected?.urlId
                                                        ? `${
                                                              com.args
                                                                  ?.base_url +
                                                              selected?.urlId
                                                          }/`
                                                        : com.args?.base_url;
                                                const query = selected?.query;
                                                const newCom = {
                                                    ...com,
                                                    args: {
                                                        ...com?.args,
                                                        base_url: updateUrl,
                                                        query_params_modal:
                                                            query,
                                                    },
                                                };

                                                if (
                                                    selected?.name ===
                                                        'item_details_lot_details' &&
                                                    !!selected?.state?.row
                                                        ?.lot_id
                                                ) {
                                                    newCom.args.query_params_modal =
                                                        {
                                                            lot__iexact:
                                                                selected?.state
                                                                    ?.row
                                                                    ?.lot_id,
                                                        };
                                                }
                                                if (
                                                    selected?.name ===
                                                        'item_details_lot_log_histories_list' &&
                                                    !!selected?.state?.row
                                                        ?.lot_id
                                                ) {
                                                    newCom.args.query_params_modal =
                                                        {
                                                            item_lot__id__iexact:
                                                                selected?.state
                                                                    ?.row
                                                                    ?.lot_id,
                                                        };
                                                }

                                                return (
                                                    <SelectedComponent
                                                        key={index.toString()}
                                                        field={newCom}
                                                        inModal={
                                                            selected?.inModal
                                                        }
                                                    />
                                                );
                                            }
                                            if (
                                                com.component_type.includes(
                                                    '#GridEditableStatic',
                                                )
                                            ) {
                                                if (
                                                    com.name ===
                                                    'production_define_packaging'
                                                ) {
                                                    const newCom = {
                                                        ...com,
                                                        defaultRows:
                                                            selected?.state,
                                                        args: {
                                                            ...com.args,
                                                            extraDataForModal:
                                                                selected?.extraDataForModal,
                                                        },
                                                    };
                                                    return (
                                                        <SelectedComponent
                                                            key={index.toString()}
                                                            field={newCom}
                                                            inModal={
                                                                selected?.inModal
                                                            }
                                                        />
                                                    );
                                                }

                                                com.defaultRows =
                                                    selected?.state;
                                                <SelectedComponent
                                                    key={index.toString()}
                                                    field={{
                                                        ...com,
                                                    }}
                                                />;
                                            }

                                            if (
                                                com.component_type.includes(
                                                    'Alert',
                                                )
                                            ) {
                                                com.default_value =
                                                    selected?.extraDataForModal?.formulaInfo;
                                            }

                                            return (
                                                <SelectedComponent
                                                    key={index.toString()}
                                                    field={com}
                                                />
                                            );
                                        },
                                    )}
                            </Grid>
                        </CuDialog>
                    );
                default:
                    const onReset = () => {
                        const data: any = {};
                        dialog?.fields.forEach((m: any) => {
                            data[m.name] = null;
                        });
                        reset(data);
                    };
                    return (
                        <CuDialog
                            search
                            maxWidth="lg"
                            fullWidth
                            open={selected?.isOpen}
                            closeModal={handelClosePopup}
                            title={dialog?.label}
                            selected={selected}
                        >
                            <Grid container spacing={2}>
                                {modals &&
                                    dialog?.fields?.map(
                                        (com: Field, index: number) => {
                                            if (
                                                com.component_type.includes(
                                                    'Button',
                                                )
                                            ) {
                                                switch (
                                                    (com.args as any).action
                                                ) {
                                                    case 'submit':
                                                        com.id = 'submit';
                                                        com.onClick = () => {
                                                            onSave();
                                                            handelClosePopup();
                                                        };
                                                        break;
                                                    case 'reset':
                                                        com.id = 'reset';
                                                        com.onClick = () => {
                                                            onReset();
                                                        };
                                                        break;
                                                    case 'close':
                                                        com.id = 'close';
                                                        com.onClick = () => {
                                                            handelClosePopup();
                                                        };
                                                        break;
                                                    default:
                                                        null;
                                                }
                                            }
                                            if (
                                                com.args?.target === 'selective'
                                            ) {
                                                com.args.handleDataWithOnRowDoubleClick =
                                                    handleDataWithOnRowDoubleClick;
                                            }

                                            if (selected?.state?.isDependOnUrl)
                                                com.args.base_url =
                                                    selected?.state?.apiUrl.split(
                                                        '?',
                                                    )[0];
                                            if (selected?.state?.filter) {
                                                com.args.query_params_modal = {
                                                    ...com.args
                                                        .query_params_modal,
                                                    [selected?.state?.filter]:
                                                        selected?.state
                                                            ?.id_source ??
                                                        selected?.state?.row
                                                            ?.id,
                                                };
                                            }

                                            // in adjustment page we have a grid, in this grid
                                            // lot_number depend on that value come from code cell
                                            if (
                                                selected?.name ===
                                                    'adjustment_add_lot_search' &&
                                                com.component_type ===
                                                    '#GridSimpleDynamic' &&
                                                !!selected?.state?.row?.code
                                            ) {
                                                com.args.query_params_modal = {
                                                    item_code__iexact:
                                                        selected.state.row.code,
                                                    onhand_qty__gt: 0,
                                                };

                                                dispatch(
                                                    saveRowData(
                                                        selected?.state?.row,
                                                    ),
                                                );
                                            }
                                            //=

                                            // below code for Production/list/details => production cost button
                                            if (
                                                selected?.name ===
                                                'production_cost'
                                            ) {
                                                if (com.name === 'items_list') {
                                                    // @ts-ignore
                                                    com.rows =
                                                        selected?.extraDataForModal?.item_list;
                                                }
                                                if (
                                                    com.name ===
                                                    'raw_materials_list'
                                                ) {
                                                    // @ts-ignore
                                                    com.rows =
                                                        selected?.extraDataForModal?.raw_material_list;
                                                }
                                            }
                                            return (
                                                <SelectedComponent
                                                    key={index.toString()}
                                                    field={com}
                                                    inModal={
                                                        selected?.inModal ||
                                                        selected?.state
                                                            ?.inModal ||
                                                        selected?.inModal
                                                    }
                                                />
                                            );
                                        },
                                    )}
                            </Grid>
                        </CuDialog>
                    );
            }
        },
        [
            handleSubmit,
            dispatch,
            selected?.state,
            selected?.isOpen,
            reset,
            handelClosePopup,
            modals,
        ],
    );

    if (!modals) {
        return null;
    }
    return <>{chooseComponent(modals[name].type, modals[name])}</>;
};

export default GenerationContentModal;
