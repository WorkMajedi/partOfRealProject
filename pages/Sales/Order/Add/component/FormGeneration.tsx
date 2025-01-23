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
import { Form, WrapperLoading } from 'component/common';
import { Field } from 'types/type';
import ActionBar from 'component/ActionBar';
import { useMutation } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Api } from 'api';
import { toast } from 'react-toastify';
import UseDisplayBtnActionBar from 'utils/hooks/useDisplayBtnActionBar';
import { overrideFields } from 'core/utils/overWrite';
import { useDispatch, useSelector } from 'react-redux';
import { setPageActionBar } from 'redux/slices/actionBar/actionBar.slice';
import { instance } from 'api/config';
import { handelError } from 'utils/utils';
import { useKeyPress } from 'ahooks';
import UseFile from 'utils/hooks/useFile';
import printJS from 'print-js';
import { handleDefaultValue } from '../index';

interface OwnProps {
    fields: Field[];
    listData?: any;
    screenDesign?: any;
    setDefaultValues?: any;
    loading: boolean;
    reGenerateBatchNumber?: () => void;
    batchNumber?: number | string;
}

type Props = OwnProps;

const FormGeneration: FunctionComponent<Props> = ({
    fields = [],
    listData,
    screenDesign,
    setDefaultValues,
    loading,
    reGenerateBatchNumber,
    batchNumber,
}) => {
    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );
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
    const { state: dataCopyFormDetail } = useLocation();
    // handle File
    const setFilesId = UseFile();
    //=

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    // set clerk input value
    const { userData } = useSelector((state: any) => state?.permissions);
    const handleClerkInput = useCallback(() => {
        setValue(
            'clerk',
            `${userData?.first_name || ''} ${userData?.last_name || ''}`,
        );
    }, [setValue]);
    useEffect(() => {
        if (!id) {
            handleClerkInput();
        }
    }, [id, handleClerkInput]);
    //=
    const watchSalesTax = watch('sales_tax');
    // set default value for specific inputs depend on customer autocomplete in add page
    const [salesPrLoading, setSalesPrLoading] = useState(false);
    const [shipToAddressChoices, setShipToAddressChoices] = useState([]);
    const watchCustomer = watch('customer');
    const handleCustomerData = useCallback(() => {
        if (typeof watchCustomer === 'string') return;
        setShipToAddressChoices(() => {
            return !!watchCustomer?.ship_to_address?.length
                ? watchCustomer.ship_to_address.map((item: any) => ({
                      code: item?.zip_code?.zip_code || item?.zip_code,
                      label: `${item?.state} ${item?.city} ${item?.address_line1}`,
                      value: item.id,
                  }))
                : [];
        });
        if (!id && !dataCopyFormDetail) {
            const defaultAddress = !!watchCustomer?.ship_to_address?.length
                ? watchCustomer.ship_to_address.filter(
                      (item: any) => item?.default,
                  )
                : [];
            const defaultPhones = !!watchCustomer?.phones?.length
                ? watchCustomer.phones.filter((item: any) => item?.default)
                : [];

            const defaultSales = !!watchCustomer?.customer_salespersons?.length
                ? watchCustomer?.customer_salespersons
                      .map((item: any) => {
                          if (item?.default) {
                              return {
                                  rowId: item.salesperson.id,
                                  id: item.salesperson.id,
                                  commission_rate: item.commission_rate,
                                  default: item.default,
                                  //
                                  salespersonId: item.salesperson.id,
                                  code: item.salesperson.code,
                                  name: item.salesperson.name,
                                  family: item.salesperson.family,
                              };
                          }
                      })
                      .filter(Boolean)
                : [];

            setValue('term', watchCustomer?.term?.id);
            setValue(
                'csr',
                `${watchCustomer?.csr?.first_name} ${watchCustomer?.csr?.last_name}`,
            );
            setValue('ship_to_address', defaultAddress[0]?.id);

            if (!!defaultAddress?.length) {
                console.log(defaultAddress[0], '-- def  --');
                setValue('ship_to_address', defaultAddress[0]?.id);
                setValue('address_line1', defaultAddress[0]?.address_line1);
                setValue('address_line2', defaultAddress[0]?.address_line2);
                setValue('address_state', defaultAddress[0]?.state);
                setValue('address_city', defaultAddress?.[0]?.city);
                setValue('address_zip_code', defaultAddress[0]?.zip_code);
                setValue('contact_person', defaultAddress[0]?.contact_person);
                setValue('email', defaultAddress[0]?.email);
                setValue('phone', defaultPhones[0]?.number);
            }

            setSalesPrLoading(true);
            setTimeout(() => {
                setValue('order_salespersons', defaultSales);
                setSalesPrLoading(false);
            }, 300);
        }
    }, [id, setValue, watchCustomer]);
    useEffect(() => {
        if (!!watchCustomer) {
            handleCustomerData();
        }
    }, [watchCustomer, handleCustomerData]);
    //=

    // if change ship_to_address
    const watchShipTo = watch('ship_to_address');
    const [isShipToTouch, setIsShipToTouch] = useState<boolean>(false);
    useEffect(() => {
        if (listData?.ship_to_address === watchShipTo && !isShipToTouch) return;
        if (watchShipTo) {
            setIsShipToTouch(true);
            const address = getValues('customer')?.ship_to_address?.filter(
                (item: any) => item?.id === watchShipTo,
            );

            setValue('ship_to_address', address[0]?.id);
            setValue('address_line1', address[0]?.address_line1);
            setValue('address_line2', address[0]?.address_line2);
            setValue('address_state', address[0]?.state);
            setValue('address_city', address[0]?.city);
            setValue('address_zip_code', address[0]?.zip_code);
            if (address[0]?.zip_code && !id) {
                handleCheckTaxRate.mutateAsync(address[0]?.zip_code);
            }
            if (address[0]?.zip_code?.sales_tax) {
                setValue('sales_tax', address[0]?.zip_code?.sales_tax);
            }
            setValue('contact_person', address[0]?.contact_person);
            setValue('email', address[0]?.email);
            setValue('phone_number', address[0]?.phone_number);
        }
    }, [watchShipTo, setValue, getValues]);
    //=

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

    // handle default sales_tax when the customer has taxable ----------
    useEffect(() => {
        if (watchCustomer?.taxable) {
            setValue('sales_tax', parseFloat(defaultOption?.tax_rate));
        }
    }, [watchCustomer?.taxable]);
    // end handle default sales_tax when the customer has taxable ------

    // watch order_items grid
    const watchStatus = watch('status');
    const watchItemListGrid = watch('order_items');
    // if status column of all row change to "close"
    // we have to change status input value to "close"
    const handleStatusColumnValue = useCallback(() => {
        if (!!getValues('order_items')?.length) {
            const statusColumnOpen = getValues('order_items').some(
                (item: any) =>
                    item?.status?.toString().toLowerCase() === 'open',
            );
            const statusColumnClose = getValues('order_items').every(
                (item: any) =>
                    item?.status?.toString().toLowerCase() === 'close',
            );
            const statusColumnCancel = getValues('order_items').every(
                (item: any) =>
                    item?.status?.toString().toLowerCase() === 'cancel',
            );

            const hasInvoices = getValues('invoices')?.length > 0;
            // if status column value in some of the rows become to open
            if (statusColumnOpen && watchStatus !== 'Approved') {
                return setValue('status', 'Open');
            }
            // if status column value in all rows become to close
            if (statusColumnCancel) {
                if (hasInvoices) {
                    return setValue('status', 'Close');
                }
                return setValue('status', 'Cancel');
            }
            // if status column value in all rows become to cancel
            if (statusColumnClose && watchStatus !== 'Quote') {
                return setValue('status', 'Close');
            }
        }
    }, [getValues, setValue, watchStatus]);

    // sum all extension value and setValue("sub_total")
    const handleSumTotal = useCallback(() => {
        const setTimeCalcSum = setTimeout(() => {
            const sum = !!getValues('order_items')?.length
                ? getValues('order_items')?.reduce(
                      (
                          arr: {
                              sub_total: number;
                              tax_amount: number;
                          },
                          item: any,
                      ) => {
                          let extension: number = 0;
                          let taxIncrement: number = 0;
                          const price: number = Number(item?.price) || 0;
                          const orderQty: number = Number(item?.order_qty) || 0;
                          const defaultTax: number =
                              parseFloat(watchSalesTax) ||
                              parseFloat(defaultOption?.tax_rate) ||
                              10;

                          if (price >= 0 && orderQty >= 0) {
                              extension = Number((price * orderQty).toFixed(3));
                          }

                          const sub_total = arr.sub_total + extension;
                          if (watchCustomer?.taxable && item?.taxable) {
                              taxIncrement = (defaultTax * extension) / 100;
                          }

                          return {
                              sub_total,
                              tax_amount: arr.tax_amount + taxIncrement,
                          };
                      },
                      {
                          sub_total: 0,
                          tax_amount: 0,
                      },
                  )
                : {
                      sub_total: 0,
                      tax_amount: 0,
                  };

            setValue('sub_total', Number(sum.sub_total).toFixed(3));
            setValue('tax_amount', Number(sum.tax_amount).toFixed(3));
        }, 1000);
        return () => clearTimeout(setTimeCalcSum);
    }, [
        getValues('order_items'),
        setValue,
        watchCustomer?.taxable,
        watchSalesTax,
        defaultOption?.tax_rate,
    ]);

    //=

    useEffect(() => {
        if (!!watchItemListGrid) {
            setTimeout(() => {
                handleStatusColumnValue();
                handleSumTotal();
            }, 1000);
        }
    }, [handleStatusColumnValue, handleSumTotal, watchItemListGrid]);
    //=

    // to set a grand_total field
    const watchSubtotal = watch('sub_total') || 0;
    const watchTaxAmount = watch('tax_amount') || 0;
    // Create a useRef to store the previous value of the field,(at this moment type of value is Number)
    // because when we write to another price input the previous input return a string and cause conflict.
    const watchDiscountAmount = watch('discount_amount') || 0;
    const prevDiscountAmountRef = useRef<number>(listData?.discount_amount);
    useEffect(() => {
        if (typeof watchDiscountAmount !== 'string') {
            prevDiscountAmountRef.current = watchDiscountAmount;
        }
    }, [watchDiscountAmount]);

    const watchExtraCharges = watch('extra_charge') || 0;
    const prevExtraChargesRef = useRef<number>(listData?.extra_charge);
    useEffect(() => {
        if (typeof watchExtraCharges !== 'string') {
            prevExtraChargesRef.current = watchExtraCharges;
        }
    }, [watchExtraCharges]);

    const watchShipmentCharges = watch('shipment_charge') || 0;
    const prevShipmentChargesRef = useRef<number>(listData?.shipment_charge);
    useEffect(() => {
        if (typeof watchShipmentCharges !== 'string') {
            prevShipmentChargesRef.current = watchShipmentCharges;
        }
    }, [watchShipmentCharges]);

    useEffect(() => {
        const setTimeCalculate = setTimeout(() => {
            const grand_total =
                Number(watchSubtotal) +
                    Number(watchTaxAmount) +
                    Number(prevExtraChargesRef.current) +
                    Number(prevShipmentChargesRef.current) -
                    Number(prevDiscountAmountRef.current) || 0;
            setValue('grand_total', grand_total?.toFixed(3));
            setValue('prices', {
                extra_charge: prevExtraChargesRef.current,
                shipment_charge: prevShipmentChargesRef.current,
                discount_amount: prevDiscountAmountRef.current,
            });
        });
        return () => clearTimeout(setTimeCalculate);
    }, [
        watchSubtotal,
        watchTaxAmount,
        watchDiscountAmount,
        watchExtraCharges,
        watchShipmentCharges,
        setValue,
    ]);
    //=

    useEffect(() => {
        if (listData) {
            reset(listData);
        }
    }, [listData, dataCopyFormDetail]);

    const handleGeneratePickTicket = useMutation({
        mutationFn: () =>
            instance.post(
                `api/pick_ticket/create_pick_ticket_from_order/${id}/`,
            ),
        onSuccess: ({ data }) => {
            toast.success('Generated pick ticket successfully.');
            if (data.id) {
                navigate(`/sales/pick_ticket/${data.id}`);
            } else {
                toast.error(`We have error indicates`);
            }
        },
        onError: (error: any) => {
            if (!!error?.response?.status)
                toast.error(`The ${error?.response?.status} error indicates`);
        },
    });
    const dispatch = useDispatch();
    useEffect(() => {
        const oldFields = screenDesign?.actionbar?.basic?.fields;
        let newFields: any;
        if (!!id && listData?.status === 'Approved') {
            const GeneratePickBtn = {
                args: {
                    action: 'generate',
                    short_key: 'F10',
                    size: 'medium',
                    icon: 'generate',
                },
                component_type: 'ButtonSecondary',
                default_value: '',
                disable: false, // pick ticket === open
                // disable:true, //  approved && pick ticket !== open && status one of item in grid === open
                is_show: true,
                label: 'Generate Pick Ticket',
                name: 'generate_pick_ticket',
                type: 'ButtonSecondary',
                width: '1',
                onClick: async () => {
                    await handleGeneratePickTicket.mutateAsync();
                },
            };
            const indexId =
                screenDesign.actionbar.basic.fields.findIndex(
                    (item: any) =>
                        item.label.toString().toLowerCase() === 'pdf',
                ) + 1;
            newFields = [
                ...oldFields.slice(0, indexId),
                GeneratePickBtn,
                ...oldFields.slice(indexId),
            ];
        } else {
            newFields = oldFields;
        }

        dispatch(
            setPageActionBar({
                actionBar: {
                    basic: {
                        ...screenDesign?.actionbar?.basic,
                        fields: newFields,
                    },
                },
                pageTitle: screenDesign?.label,
                isLoadingFetched: loading,
            }),
        );
    }, [
        dispatch,
        screenDesign,
        id,
        listData,
        watchStatus,
        handleGeneratePickTicket,
        loading,
    ]);

    const createOrder = useMutation({
        mutationFn: data => Api.sales.insertOrder(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            setDefaultValues(handleDefaultValue(data));
            navigate(`/sales/order/${data.id}`);
        },
        onError: (err: any) => {
            handelError(err, setError, []);
            // ----------------step 1) reGenerate batch number  when batch number  is not unique ------------------------
            const error = err?.response?.data;
            if (Object.hasOwn(error, 'order_number')) {
                reGenerateBatchNumber?.();
            }
            // --------------- end of step 1 --------------------
        },
    });

    const updateOrder = useMutation({
        mutationFn: data => Api.sales.updateOrder(id, data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            setDefaultValues(handleDefaultValue(data));
        },
        onError: (err: any) => {
            handelError(err, setError, ['order_items', 'order_salespersons']);
        },
    });

    // handel Change Tax Calculation based on zip code
    const watchZipCode = watch('address_zip_code');
    useEffect(() => {
        if (watchZipCode && watchZipCode?.sales_tax) {
            console.log(watchZipCode, '--  watchd --');
            setValue('sales_tax', watchZipCode?.sales_tax || 0);
            // setValue('tax_amount', watchZipCode?.sales_tax || 0);
        }
    }, [watchZipCode]);
    // ------------- end ---------------------

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();
        const {
            invoices_lis,
            invoices,
            pick_tickets,
            order_items,
            order_salespersons,
            prices,
            address_zip_code,
            ...rest
        } = data;
        console.log(rest?.attachments, '--   --');
        const dataForm = {
            ...rest,
            customer: rest?.customer?.id,
            csr: rest?.customer.csr?.id,
            ship_via: rest?.ship_via?.id,
            address_zip_code:
                address_zip_code?.code ||
                address_zip_code?.zip_code ||
                address_zip_code,
            freight_method: rest?.freight_method || null,
            customer_term: rest?.term || null,
            extra_charge: prices?.extra_charge || 0,
            shipment_charge: prices?.shipment_charge || 0,
            discount_amount: prices?.discount_amount || 0,
            sub_total: +data?.sub_total || 0,
            tax_amount: +data?.tax_amount || 0,
            grand_total: +data?.grand_total || 0,
            end_date: rest?.end_date || null,
            attachments:
                rest?.attachments &&
                !!rest?.attachments?.length &&
                dataCopyFormDetail
                    ? rest?.attachments.map((item: any) => {
                          if (typeof item === 'string') {
                              return item;
                          }
                          return item?.id;
                      })
                    : rest?.attachments || [],
            order_items: !!order_items?.length
                ? order_items
                      .map(
                          ({
                              guid,
                              id,
                              rowId,
                              itemId,
                              orderId,
                              backendId,
                              //   item_comment,
                              //   item_remark,
                              adjusted_qty,
                              details,
                              ...rest
                          }: any) => {
                              if (!!rest.code)
                                  return {
                                      ...rest,
                                      ...details,
                                      id: orderId,
                                      item: itemId || backendId,
                                      stop_date: rest?.stop_date || null,
                                      start_date: rest?.start_date || null,
                                      adjusted_qty:
                                          adjusted_qty &&
                                          Number(adjusted_qty) >= 0
                                              ? adjusted_qty
                                              : 0,
                                      //   comment: item_comment,
                                      //   remark: item_remark,
                                  };
                          },
                      )
                      .filter((item: any) => !!item?.code)
                      .filter(Boolean)
                : [],
            order_salespersons: !!order_salespersons?.length
                ? order_salespersons
                      .map(
                          ({
                              rowId,
                              code,
                              name,
                              family,
                              commission_rate,
                              salespersonId,
                              backendId,
                              ...rest
                          }: any) => ({
                              ...rest,
                              id: salespersonId || backendId,
                              salesperson: salespersonId || backendId, // backendId, when select from code column = salespersonId, when select default sales person from customer input
                              commission_rate,
                              code,
                              name,
                              family,
                          }),
                      )
                      .filter((item: any) => !!item?.code)
                      .filter(Boolean)
                : [],
        };

        if (!!id) {
            delete dataForm.clerk;
            await updateOrder.mutateAsync(dataForm);
        } else {
            await createOrder.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/sales/order/${itemId}`);
        },
        [navigate],
    );
    // ----------------step 2) reGenerate batch number  when batch number  is not unique ---
    useEffect(() => {
        if (
            !id &&
            batchNumber !== +getValues('order_number') &&
            Object.hasOwn(errors.root || errors, 'order_number')
        ) {
            setValue('order_number', batchNumber);
            clearErrors('root.order_number');
            toast.warning(
                `Order Number not found. An automatic request has been
                            sent to the server, and the form has been
                            regenerated with a new ${batchNumber}`,
            );
            setTimeout(() => {
                const submitFn = handleSubmit(onSubmitHandler);
                submitFn();
            }, 100);
        }
    }, [batchNumber]);
    // -------------------------------- end of batch number-----------

    //----------check if ship_to_address changed then zip_code has tax_rate then set it
    const handleCheckTaxRate = useMutation({
        mutationFn: (qoury: string) => Api.option.searchTaxRate(qoury),
        onSuccess: ({ data }) => {
            console.log(data, '-- data  --');
            if (data?.results && !!data?.results.length) {
                const taxRate: number | string = data?.results?.[0].sales_tax;
                console.log(taxRate, '-- taxRate  --');
                setValue('sales_tax', taxRate);
            }
        },
        onError: (error: any) => {
            console.log(error, '-- error --');
        },
    });
    // -------------------------------- end of ship_to_address -----------

    // -------------- handle button generate pdf pick_ticket -------
    const urlGeneratePdfPickTicket = '/api/order/order_pick_list';
    const handleGeneratePdfPickTicket = useMutation({
        mutationFn: (url: string) =>
            Api.print.GeneratorLinkPrint(`${url}/${id}`),
        onSuccess: ({ data }) => {
            toast.success('print successfully');
            printJS({
                printable: data.file,
                type: 'pdf',
                base64: true,
            });
        },
        onError: (error: any) => {
            if (!!error?.response?.status)
                toast.error(`The ${error?.response?.status} error indicates`);
        },
    });
    // --------------- end ------

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'order_number',
                editable: !id,
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },
            {
                name: 'customer',
                editable: !id,
                creatable: false,
            },
            {
                name: 'ship_to_address',
                args: {
                    choices: shipToAddressChoices,
                },
            },
            {
                name: 'ship_via',
                creatable: false,
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
            {
                name: 'order_salespersons',
                component_type: salesPrLoading
                    ? 'Loading'
                    : '#GridEditableStatic',
            },
            {
                name: 'print_order_pick_list',
                component_type: !!id ? 'ButtonSecondary' : '',
                isLoadingButton: handleGeneratePdfPickTicket.isLoading,
                onClick: () => {
                    if (!!id) {
                        return handleGeneratePdfPickTicket.mutateAsync(
                            urlGeneratePdfPickTicket,
                        );
                    }
                },
            },
        ]);
    }, [
        id,
        fields,
        handleNavigateToEdit,
        shipToAddressChoices,
        shipViaChoices,
        salesPrLoading,
        dataCopyFormDetail,
    ]);

    // generate pick_ticket
    useKeyPress(['f10'], async () => {
        await handleGeneratePickTicket.mutateAsync();
    });

    // open reset modal
    useKeyPress(['esc'], () => {
        setOpen(true);
    });

    return (
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
                printURL={`/api/order/generate_pdf_order/${id}`}
                isLoadingActionBar={handleGeneratePdfPickTicket.isLoading}
            />
            <Grid container spacing={2.5}>
                {overWriteFieldForm()?.map((field: Field, index: number) => {
                    return (
                        <SelectedComponent
                            key={index.toString()}
                            field={field}
                        />
                    );
                })}
            </Grid>
        </Form>
    );
};

export default FormGeneration;
