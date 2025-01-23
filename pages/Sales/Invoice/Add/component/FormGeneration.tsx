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
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Api } from 'api';
import { toast } from 'react-toastify';
import UseDisplayBtnActionBar from 'utils/hooks/useDisplayBtnActionBar';
import { overrideFields } from 'core/utils/overWrite';
import { calculateEndDate, handelError } from 'utils/utils';
import { AxiosError } from 'axios';
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
    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );
    // handle File
    const setFilesId = UseFile();
    //=
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
    } = useFormContext();

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    // added number of days term to start date and set for due_date
    const watchTerm = watch('term');
    const watchSalesTax = watch('sales_tax');
    const watchStartDate = watch('start_date');
    const { data, isLoading: dueDateLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['term', watchTerm],
        queryFn: () => Api.partner.getCustomerTerms(watchTerm),
        enabled: !!watchTerm,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });
    useEffect(() => {
        if (!!data?.data?.number_of_days && !!watchStartDate) {
            const startDate = new Date(watchStartDate);
            const dueDate = calculateEndDate(
                startDate,
                data?.data?.number_of_days,
            );
            setValue('due_date', dueDate);
        } else {
            setValue('due_date', null);
        }
    }, [data, watchStartDate, watchTerm]);
    //=

    // set ship_to_address value
    const [shipToAddressChoices, setShipToAddressChoices] = useState([]);
    const watchCustomer = watch('customer');
    const handleCustomerData = useCallback(() => {
        setShipToAddressChoices(() => {
            return !!watchCustomer?.ship_to_address?.length
                ? watchCustomer.ship_to_address.map((item: any) => ({
                      code: item?.zip_code?.zip_code || item?.zip_code,
                      label: `${item?.state} ${item?.city} ${item?.address_line1}`,
                      value: item.id,
                  }))
                : [];
        });
    }, [watchCustomer]);
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
            if (address[0]?.zip_code?.sales_tax) {
                setValue('sales_tax', address[0]?.zip_code?.sales_tax);
            }
            setValue('contact_person', address[0]?.contact_person);
            setValue('email', address[0]?.email);
            setValue('phone_number', address[0]?.phone_number);
            console.log(address[0], '--watch   --');
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

    // watch order_items grid
    const watchItemListGrid = watch('invoice_items');
    // sum all extension value and setValue("sub_total")
    const handleSumTotal = useCallback(() => {
        const setTimeCalcSum = setTimeout(() => {
            const sum = !!getValues('invoice_items')?.length
                ? getValues('invoice_items')?.reduce(
                      (
                          acc: {
                              sub_total: number;
                              tax_amount: number;
                          },
                          item: any,
                      ) => {
                          let extension: number = 0;
                          let itemTax: number = 0;
                          const price: number = Number(item?.price) || 0;
                          const invoiceQty: number =
                              Number(item?.invoice_qty) || 0;
                          const defaultTax: number =
                              parseFloat(watchSalesTax) ||
                              parseFloat(defaultOption?.tax_rate) ||
                              10;

                          // Calculate the subtotal for the current item
                          if (price >= 0 && invoiceQty >= 0) {
                              extension = Number(
                                  (price * invoiceQty).toFixed(3),
                              );
                          }

                          // Calculate tax only if both customer and item are taxable
                          if (watchCustomer?.taxable && item?.taxable) {
                              itemTax = (defaultTax * extension) / 100;
                          }

                          // Return updated accumulator
                          return {
                              sub_total: acc.sub_total + extension,
                              tax_amount: acc.tax_amount + itemTax,
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

            // Set the calculated values in the form
            setValue('sub_total', Number(sum.sub_total).toFixed(3));
            setValue('tax_amount', Number(sum.tax_amount).toFixed(3));
        });
        return () => clearTimeout(setTimeCalcSum);
    }, [
        getValues,
        setValue,
        watchCustomer?.taxable,
        watchSalesTax,
        defaultOption?.tax_rate,
    ]);

    //=

    useEffect(() => {
        if (!!watchItemListGrid) {
            handleSumTotal();
        }
    }, [handleSumTotal, watchItemListGrid]);

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
    const watchStatus = watch('status') || '';
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
                Number(prevDiscountAmountRef.current);
            setValue('grand_total', grand_total.toFixed(3));
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

    // handel Change Tax Calculation based on zip code
    const watchZipCode = watch('address_zip_code');
    useEffect(() => {
        if (watchZipCode && watchZipCode?.sales_tax) {
            console.log(watchZipCode, '--  watchd --');
            setValue('sales_tax', watchZipCode?.sales_tax);
        }
    }, [watchZipCode]);
    // ------------- end ---------------------

    const createInvoice = useMutation({
        mutationFn: data => Api.sales.insertInvoice(data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, ['invoice_items', 'order_salespersons']);
        },
    });

    const updateInvoice = useMutation({
        mutationFn: data => Api.sales.updateInvoice(id, data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, ['invoice_items', 'order_salespersons']);
        },
    });

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();
        const {
            customer,
            ship_via,
            freight_method,
            term,
            order,
            prices,
            invoice_items,
            order_salespersons,
            invoice_salespersons,
            address_zip_code,
            ...rest
        } = data;

        const dataForm = {
            ...rest,
            customer: customer?.id,
            csr: customer.csr?.id,
            ship_via: ship_via?.id,
            freight_method: freight_method || null,
            customer_term: term,
            order: order?.id,
            extra_charge: prices?.extra_charge || 0,
            shipment_charge: prices?.shipment_charge || 0,
            discount_amount: prices?.discount_amount || 0,
            address_zip_code:
                address_zip_code?.code ||
                address_zip_code?.zip_code ||
                address_zip_code,
            invoice_items: !!invoice_items.length
                ? invoice_items
                      .map(
                          ({
                              id,
                              pickId,
                              itemId,
                              guid,
                              backendId,
                              invoice_item_lots,
                              ...pick
                          }: any) => ({
                              ...pick?.item,
                              ...pick,
                              id: pickId,
                              item: itemId || backendId,
                              invoice_item_lots:
                                  invoice_item_lots
                                      ?.map(
                                          ({
                                              index,
                                              id,
                                              rowId,
                                              guid,
                                              lot_id,
                                              quantity,
                                          }: any) => {
                                              if (
                                                  !!quantity &&
                                                  Number(quantity) > 0
                                              ) {
                                                  return {
                                                      item_lot: lot_id,
                                                      quantity: quantity ?? 0,
                                                  };
                                              }
                                          },
                                      )
                                      .filter(Boolean) || [],
                          }),
                      )
                      .filter((item: any) => !!item?.code)
                      .filter(Boolean)
                : [],
            invoice_salespersons: !!order_salespersons?.length
                ? order_salespersons
                      .map(
                          ({
                              guid,
                              rowId,
                              code,
                              name,
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
                          }),
                      )
                      .filter((item: any) => !!item?.code)
                      .filter(Boolean)
                : [],
            // invoice_salespersons: !!invoice_salespersons?.length
            //     ? invoice_salespersons.map(
            //           ({ id, salesperson, ...item }: any) => ({
            //               ...item,
            //               id,
            //               salesperson: salesperson?.id || salesperson,
            //           }),
            //       )
            //     : [],
        };
        if (!!id) {
            await updateInvoice.mutateAsync(dataForm);
        } else {
            await createInvoice.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/sales/invoice/${itemId}`);
        },
        [navigate],
    );

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'invoice_number',
                editable: !id,
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },
            {
                name: 'customer',
                creatable: false,
            },
            {
                name: 'freight_method',
                args: {
                    choices: shipViaChoices,
                },
            },
            {
                name: 'sales_tax',
                editable: watchStatus?.toString()?.toLowerCase() === 'open',
            },
            {
                name: 'address_zip_code',
                editable: watchStatus?.toString()?.toLowerCase() === 'open',
            },
            {
                name: 'ship_to_address',
                args: {
                    choices: shipToAddressChoices,
                },
            },
            {
                name: 'due_date',
                component_type: dueDateLoading ? 'Loading' : 'DatePicker',
            },
            {
                name: 'attachments',
                setFilesId,
            },
        ]);
    }, [
        fields,
        handleNavigateToEdit,
        shipViaChoices,
        shipToAddressChoices,
        dueDateLoading,
        watchStatus,
    ]);

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
                        id ? `/api/invoices/generate_pdf_invoice/${id}` : ''
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
