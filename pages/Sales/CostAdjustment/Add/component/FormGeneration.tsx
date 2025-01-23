import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
import SelectedComponent from 'core/component/selectedComponent/SelectedComponent';
import { Form } from 'component/common';
import { Field } from 'types/type';
import ActionBar from 'component/ActionBar';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Api } from 'api';
import { toast } from 'react-toastify';
import UseDisplayBtnActionBar from 'utils/hooks/useDisplayBtnActionBar';
import { overrideFields } from 'core/utils/overWrite';
import { handelError } from 'utils/utils';
import { useSelector } from 'react-redux';
import ExitWarningWrapper from 'utils/hooks/ExitWarningWrapper';
import UseFile from '../../../../../utils/hooks/useFile';

interface OwnProps {
    fields: Field[];
    listData?: any;
}

type Props = OwnProps;

const FormGeneration: FunctionComponent<Props> = ({
    fields = [],
    listData,
}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        watch,
        getValues,
        reset,
        setValue,
        setError,
        clearErrors,
    } = useFormContext();
    const [open, setOpen] = useState(false);

    // handle File
    const setFilesId = UseFile();
    //=

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    // set clerk input value
    const { userData } = useSelector((state: any) => state?.permissions);
    const handleAdjustmentByInput = useCallback(() => {
        setValue(
            'adjusted_by',
            `${userData?.first_name || ''} ${userData?.last_name || ''}`,
        );
    }, [setValue]);
    useEffect(() => {
        if (!id) {
            handleAdjustmentByInput();
        }
    }, [id, handleAdjustmentByInput]);
    //=

    // set lot input value
    const watchAdjust = watch('adjustment_number');
    const watchStartDate = watch('adjusted_on');
    useEffect(() => {
        if (!!watchAdjust && !!watchStartDate) {
            const lotNumber = `A${watchAdjust + watchStartDate}`;
            setValue('lot_number', lotNumber.replaceAll('-', ''));
        }
    }, [watchAdjust, watchStartDate, setValue]);
    //=

    // set show and hide "to grid"
    const watchTransfer = watch('transfer');
    const [toggleToGrid, setToggleToGrid] = useState(false);
    useEffect(() => {
        setToggleToGrid(watchTransfer);
    }, [watchTransfer, setValue]);
    //=

    // sum all adj_qty value in Adjustment_From grid
    const watchAdjustmentAddFrom = watch('adjustment_add_from');
    const [adjustmentQtyFrom, setAdjustmentQtyFrom] = useState<null | number>(
        null,
    );
    const handleSumAdjustmentQtyFrom = useCallback(() => {
        const sum = getValues('adjustment_add_from').reduce(
            (arr: number, item: any) => {
                const adjusted_qty: number = Math.abs(
                    Number(item?.adjusted_qty),
                );
                const item_volume: number = Math.abs(Number(item?.item_volume));
                if (!!adjusted_qty) {
                    arr += adjusted_qty * item_volume;
                }
                return arr;
            },
            null,
        );
        setAdjustmentQtyFrom(sum);
    }, [getValues, setValue]);

    useEffect(() => {
        if (!!watchAdjustmentAddFrom) {
            handleSumAdjustmentQtyFrom();
        }
    }, [watchAdjustmentAddFrom]);
    //=

    // sum all adj_qty value in Adjustment_To grid
    const watchAdjustmentAddTo = watch('adjustment_add_to');
    const [adjustmentQtyTo, setAdjustmentQtyTo] = useState<null | number>(null);
    const handleSumAdjustmentQtyTo = useCallback(() => {
        const sum = getValues('adjustment_add_to').reduce(
            (arr: number, item: any) => {
                if (!!item?.code) {
                    const adjusted_qty: number = Math.abs(
                        Number(item?.adjusted_qty),
                    );
                    const item_volume: number = Math.abs(
                        Number(item?.item_volume),
                    );
                    if (!!adjusted_qty) {
                        arr += adjusted_qty * item_volume;
                    }
                    return arr;
                }
                return null;
            },
            null,
        );

        setAdjustmentQtyTo(sum);
    }, [getValues, setValue]);

    useEffect(() => {
        if (!!watchAdjustmentAddTo) {
            handleSumAdjustmentQtyTo();
        }
    }, [watchAdjustmentAddTo]);

    const [alert, setAlert] = useState('');
    useEffect(() => {
        const setTimeHandleAlert = setTimeout(() => {
            if (adjustmentQtyFrom !== null && adjustmentQtyTo !== null) {
                if (Math.abs(adjustmentQtyFrom) !== Math.abs(adjustmentQtyTo))
                    setAlert('From and To capacity are different!');
                else setAlert('');
            } else setAlert('');
        }, 500);
        return () => clearTimeout(setTimeHandleAlert);
    }, [adjustmentQtyFrom, adjustmentQtyTo]);
    //=

    const createAdjustment = useMutation({
        mutationFn: data => Api.sales.insertCostAdjustment(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            navigate(`/sales/adjustment/cost_adjustment/${data?.id}`);
        },
        onError: (err: any) => {
            handelError(err, setError, []);
        },
    });

    const updateAdjustment = useMutation({
        mutationFn: data => Api.sales.updateCostAdjustment(id, data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, []);
        },
    });

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();
        const {
            adjustment_add_from_columns,
            adjustment_add_to_columns,
            adjustment_add_from,
            adjustment_add_to,
            adjustment_lines,
            ...restData
        } = data;
        const dataForm = {
            ...restData,
            adjustment_lines: !!adjustment_lines?.length
                ? adjustment_lines.map(({ ...rest }: any) => {
                    return {
                        ...rest,
                        obj_id: rest.obj_id ?? rest.backendId ?? rest.id,
                    };
                })
                : [],

            from_rows: !!adjustment_add_from?.length
                ? adjustment_add_from.map(
                    ({
                        guid,
                        id,
                        index,
                        rowId,
                        row_id,
                        backendId,
                        obj_id,
                        ...rest
                    }: any) => {
                        return {
                            ...rest,
                            id: row_id,
                            obj_id: obj_id ?? backendId ?? id,
                        };
                    },
                )
                : [],
            to_rows: !!adjustment_add_to?.length
                ? adjustment_add_to
                    .map(
                        ({
                            guid,
                            id,
                            index,
                            rowId,
                            row_id,
                            obj_id,
                            backendId,
                            ...rest
                        }: any) => {
                            return {
                                ...rest,
                                id: row_id,
                                type: 'Item',
                                obj_id: obj_id ?? backendId ?? id,
                            };
                        },
                    )
                    .filter((item: any) => !!item?.code)
                    .filter(Boolean)
                : [],
        };

        if (!!id) {
            await updateAdjustment.mutateAsync(dataForm);
        } else {
            await createAdjustment.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/sales/adjustment/cost_adjustment/${itemId}`);
        },
        [navigate],
    );

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'adjustment_number',
                editable: !id,
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },
            {
                name: 'adjustment_add_to',
                component_type: toggleToGrid ? '#GridEditableStatic' : '',
            },
            {
                name: 'attachments',
                setFilesId,
            },
            {
                name: 'alert',
                default_value: alert,
            },
        ]);
    }, [fields, id, handleNavigateToEdit, toggleToGrid, alert]);

    return (
        <ExitWarningWrapper iqnoreOpen={!open}>
            <Form
                display="flex"
                flexDirection="column"
                openModal={open}
                closeModal={() => setOpen(false)}
                reset={() => handelReset()}
            >
                <ActionBar
                    save={handleSubmit(onSubmitHandler)}
                    reset={() => setOpen(true)}
                />
                <Grid container spacing={2.5}>
                    {overWriteFieldForm()?.map(
                        (field: Field, index: number) => {
                            return (
                                <SelectedComponent
                                    key={index.toString()}
                                    field={field}
                                />
                            );
                        },
                    )}
                </Grid>
            </Form>
        </ExitWarningWrapper>
    );
};

export default FormGeneration;
