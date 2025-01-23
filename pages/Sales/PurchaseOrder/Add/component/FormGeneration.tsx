import {
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
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
import UseFile from 'utils/hooks/useFile';
import ExitWarningWrapper from '../../../../../utils/hooks/ExitWarningWrapper';

interface OwnProps {
    fields: Field[];
    listData?: any;
    reGenerateBatchNumber?: () => void;
    batchNumber?: number | string;
}

type Props = OwnProps;

const FormGeneration: FunctionComponent<Props> = ({
    fields = [],
    listData,
    reGenerateBatchNumber,
    batchNumber,
}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const {
        handleSubmit,
        reset,
        setValue,
        getValues,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    // handle File
    const setFilesId = UseFile();
    //=

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    // set freight_methods value
    const [shipViaChoices, setShipViaChoices] = useState([]);
    const watchShipVia = watch('ship_via');
    const handleFreightMethods = useCallback(() => {
        setShipViaChoices(() => {
            return !!watchShipVia?.freight_methods?.length
                ? watchShipVia.freight_methods.map((item: any) => ({
                      code: `${item?.code}`,
                      label: `${item?.description}`,
                      value: item.id,
                  }))
                : [];
        });
    }, [watchShipVia]);
    useEffect(() => {
        if (!!watchShipVia) {
            handleFreightMethods();
        }
    }, [watchShipVia, handleFreightMethods]);
    //=

    // set vendor term values after selected vendor
    const watchVendor = watch('vendor');

    useEffect(() => {
        if (!id && watchVendor) {
            const defaultPhones = !!watchVendor?.phones?.length
                ? watchVendor.phones.filter((item: any) => item?.default)
                : [];
            setValue('ship_to_address', watchVendor?.id);
            setValue('address_line1', watchVendor?.address_line_1);
            setValue('address_line2', watchVendor?.address_line_2);
            setValue('address_state', watchVendor?.state);
            setValue('address_city', watchVendor?.city);
            setValue('address_zip_code', watchVendor?.zip_code);
            setValue('contact_person', watchVendor?.contact_person);
            setValue(
                'email',
                watchVendor?.email ?? watchVendor?.vendor_emails?.[0],
            );
            setTimeout(() => {
                setValue('phone', defaultPhones[0]?.number);
            }, 500);
            setValue('phone', defaultPhones[0]?.number);

            setValue('vendor_term', watchVendor?.vendor_term?.id);
        }
    }, [watchVendor, setValue]);
    // ----------------------------------------------------------------
    // sum all extension value and setValue("sub_total")
    const watchItemListGrid = watch('pro_lines');
    const handleSumTotal = useCallback(() => {
        const setTimeCalcSum = setTimeout(() => {
            const sum = getValues('pro_lines')?.reduce(
                (
                    arr: {
                        sub_total: number;
                    },
                    item: any,
                ) => {
                    const price: number = Number(item?.price) || 0;
                    const orderQty: number = Number(item?.order_qty) || 0;
                    let extension: number = 0;

                    if (price >= 0 && orderQty >= 0) {
                        extension = Number((price * orderQty).toFixed(3));
                    }

                    const sub_total = arr?.sub_total + extension;

                    arr = {
                        ...arr,
                        sub_total,
                    };
                    return arr;
                },
                {
                    sub_total: 0,
                },
            );

            setValue('sub_total', Number(sum?.sub_total).toFixed(3));
        });
        return () => clearTimeout(setTimeCalcSum);
    }, [getValues, setValue]);
    //=

    //
    useEffect(() => {
        if (!!watchItemListGrid) {
            handleSumTotal();
        }
    }, [handleSumTotal, watchItemListGrid]);
    //=

    // to set a grand_total field
    const watchSubtotal = watch('sub_total') || 0;
    // Create a useRef to store the previous value of the field,(at this moment type of value is Number)
    // because when we write to another price input the previous input return a string and cause conflict.
    const watchMiscCharge = watch('misc_charge') || 0;
    const prevMiscChargeRef = useRef<number>(listData?.misc_charge);
    useEffect(() => {
        if (typeof watchMiscCharge !== 'string') {
            prevMiscChargeRef.current = watchMiscCharge;
        }
    }, [watchMiscCharge]);

    const watchExtraCharges = watch('extra_charge') || 0;
    const prevExtraChargesRef = useRef<number>(listData?.extra_charge);
    useEffect(() => {
        if (typeof watchExtraCharges !== 'string') {
            prevExtraChargesRef.current = watchExtraCharges;
        }
    }, [watchExtraCharges]);

    useEffect(() => {
        const setTimeCalculate = setTimeout(() => {
            const grand_total =
                Number(watchSubtotal) +
                Number(prevExtraChargesRef.current) +
                Number(prevMiscChargeRef.current);
            setValue('grand_total', grand_total.toFixed(3));
            setValue('prices', {
                extra_charge: prevExtraChargesRef.current,
                discount_amount: prevMiscChargeRef.current,
            });
        });
        return () => clearTimeout(setTimeCalculate);
    }, [watchSubtotal, watchMiscCharge, watchExtraCharges, setValue]);
    //=

    const createPurchaseOrder = useMutation({
        mutationFn: data => Api.sales.insertPurchaseOrder(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            navigate(`/sales/PurchaseOrder/${data.id}`);
        },
        onError: (err: any) => {
            handelError(err, setError, []);
            // ----------------step 1) reGenerate batch number  when batch number  is not unique ------------------------
            const error = err?.response?.data;
            if (Object.hasOwn(error, 'po_number')) {
                reGenerateBatchNumber?.();
            }
            // --------------- end of step 1 --------------------
        },
    });

    const updatePurchaseOrder = useMutation({
        mutationFn: data => Api.sales.updatePurchaseOrder(id, data),
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
            pro_lines,
            prices,
            vendor,
            ship_via,
            freight_method,
            days_to_freight,
            ...rest
        } = data;
        const dataForm = {
            ...rest,
            vendor: vendor?.id,
            ship_via: ship_via?.id,
            freight_method: freight_method || null,
            vendor_term: rest?.vendor_term || null,
            tolerance: rest?.tolerance || null,
            days_to_freight: parseInt(days_to_freight),
            pro_lines: !!pro_lines?.length
                ? pro_lines.map(
                      ({
                          index,
                          guid,
                          id,
                          backendId,
                          rowId,
                          value,
                          code_value,
                          poId,
                          obj_id,
                          item_id,
                          inventory_uom,
                          ...rest
                      }: any) => {
                          return {
                              ...rest,
                              id: poId,
                              obj_id: obj_id ?? item_id ?? backendId,
                              uom: inventory_uom,
                              code: value || code_value || rest.packaging_code,
                          };
                      },
                  )
                : [],
        };

        if (!!id) {
            await updatePurchaseOrder.mutateAsync(dataForm);
        } else {
            await createPurchaseOrder.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/sales/purchaseOrder/${itemId}`);
        },
        [navigate],
    );

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'po_number',
                editable: !id,
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },

            {
                name: 'freight_method',
                args: {
                    choices: shipViaChoices,
                },
            },
            {
                name: 'attachments',
                setFilesId,
            },
        ]);
    }, [handleNavigateToEdit, shipViaChoices, fields]);
    // ----------------step 2) reGenerate batch number  when batch number  is not unique ---------
    useEffect(() => {
        if (
            !id &&
            batchNumber !== +getValues('po_number') &&
            Object.hasOwn(errors.root || errors, 'po_number')
        ) {
            setValue('po_number', batchNumber);
            clearErrors('root.po_number');
            toast.warning(
                `po_number not found. An automatic request has been
                            sent to the server, and the form has been
                            regenerated with a new ${batchNumber}`,
            );
            setTimeout(() => {
                const submitFn = handleSubmit(onSubmitHandler);
                submitFn();
            }, 100);
        }
    }, [batchNumber]);

    // -------------------------------- end of batch number---------------
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
                    printURL={
                        id
                            ? `/api/purchase_orders/generate_pdf_purchase_order/${id}`
                            : ''
                    }
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
