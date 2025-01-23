import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
import SelectedComponent from 'core/component/selectedComponent/SelectedComponent';
import { Form, WrapperLoading } from 'component/common';
import { Field } from 'types/type';
import ActionBar from 'component/ActionBar';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Api } from 'api';
import { toast } from 'react-toastify';
import UseDisplayBtnActionBar from 'utils/hooks/useDisplayBtnActionBar';
import { overrideFields } from 'core/utils/overWrite';
import { handelError } from 'utils/utils';
import { instance } from '../../../../../api/config';

interface OwnProps {
    fields: Field[];
    listData?: any;
    setDefaultValues?: any;
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
    const {
        handleSubmit,
        reset,
        watch,
        setValue,
        getValues,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();
    const [open, setOpen] = useState(false);
    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆
    const watchInvoicesList = watch('invoices_list');
    //= get customers involved   Finantial State === Open || Partially Paid ==> status == Approved 👇
    const { id: CustomerId } = watch('customer') || {};
    const [isLoading, setIsLoading] = useState(false);

    const [customerCredit, setCustomerCredit] = useState<any[] | null>(null);
    const query = `{id,invoice_number,due_date,total_due,total_applied_amount, grand_total,total_paid}`;
    const getInvoiceCustomers = useMutation({
        mutationFn: () =>
            instance.get(
                `api/invoices/invoice/?query=${query}&financial_state__in=Open, Partially Paid&customer__id__iexact=${CustomerId}&total_due__gt=0`,
            ),
        onSuccess: ({ data }) => {
            // toast.success('Generated pick ticket successfully.');
            // navigate(`/sales/pick_ticket/${data.id}`);
            const listData =
                !!data?.results?.length &&
                data?.results.map((items: any) => {
                    return {
                        ...items,
                        invoiceId: items?.id,
                    };
                });
            setIsLoading(false);
            setValue('invoices_list', listData);
        },
        onError: (error: any) => {
            if (!!error?.response?.status) setIsLoading(false);
            toast.error(`The ${error?.response?.status} error indicates`);
        },
    });

    //= ===================end=============👆

    //= get customers credit for modal details 👇
    const getCreditCustomers = useMutation({
        mutationFn: () =>
            instance.get(
                `api/customers/credits/?customer__id__iexact=${CustomerId}&status__iexact=Active&approved=True`,
            ),
        onSuccess: ({ data }) => {
            // toast.success('Generated pick ticket successfully.');
            // navigate(`/sales/pick_ticket/${data.id}`);
            const ignoreCreditZero = data.results.filter(
                (e: any) => e?.available_amount > 0,
            );
            setCustomerCredit(ignoreCreditZero);
        },
        onError: (error: any) => {
            if (!!error?.response?.status)
                toast.error(`The ${error?.response?.status} error indicates`);
        },
    });
    //= ===================end=============👆

    useEffect(() => {
        if (!!CustomerId && !id) {
            setIsLoading(true);
            getInvoiceCustomers.mutateAsync();
            getCreditCustomers.mutateAsync();
        } else if (id && CustomerId) {
            getCreditCustomers.mutateAsync();
        }
    }, [CustomerId, id]);

    const watchTotalAvailableCredit = watch('total_available_credit') || 0;
    const watchAmount =
        typeof watch('amount') === 'string'
            ? Number(watch('amount')?.replace(/,/g, ''))
            : watch('amount') || 0;

    useEffect(() => {
        if (customerCredit && !!customerCredit.length) {
            const total_credit_amount =
                customerCredit?.reduce(
                    (total: any, credit: any) =>
                        total + +credit?.available_amount,
                    0,
                ) || 0;
            setValue('total_available_credit', total_credit_amount);
            if (
                !getValues('available_credit_to_apply') &&
                !getValues('amount')
            ) {
                setValue('available_credit_to_apply', total_credit_amount);
            }
        } else {
            setValue('total_available_credit', 0);
        }
    }, [customerCredit]);

    const createCash = useMutation({
        mutationFn: data => Api.sales.insertCashApplication(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            navigate(`/sales/accounting/CashApplication/${data?.id}`);
        },
        onError: (err: any) => {
            handelError(err, setError, []);
            // ----------------step 1) reGenerate batch number  when batch number  is not unique ------------------------
            const error = err?.response?.data;
            if (Object.hasOwn(error, 'batch_number')) {
                reGenerateBatchNumber?.();
            }
            // --------------- end of step 1 --------------------
        },
    });
    const updateCash = useMutation({
        mutationFn: data => Api.sales.updateCashApplication(id, data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, []);
        },
    });
    const checkTotalAppliedCash = useCallback(() => {
        if (!!getValues('invoices_list').length) {
            const totalAppliedCash =
                (getValues('invoices_list')?.length > 0 &&
                    getValues('invoices_list').reduce((sum: any, item: any) => {
                        const appliedCash = Number(item?.applied_cash) || 0;
                        return sum + appliedCash;
                    }, 0)) ||
                0;

            if (+totalAppliedCash >= 0 && watchAmount) {
                if (+totalAppliedCash > watchAmount) {
                    setError('root.available_cash_to_apply', {
                        message:
                            'The Applied Cash value must be less than Total Amount.',
                    });
                } else {
                    clearErrors('root.available_cash_to_apply');
                }
            }

            if (typeof getValues('amount') === 'string') {
                setValue(
                    'available_cash_to_apply',
                    +watchAmount.toFixed(3) - +totalAppliedCash,
                );
            } else {
                setValue(
                    'available_cash_to_apply',
                    +Number(watchAmount)?.toFixed(3) - +totalAppliedCash,
                );
            }

            setValue('total_applied_cash', Number(totalAppliedCash).toFixed(3));
        }
    }, [getValues, watchAmount]);
    const checkTotalAppliedCredit = useCallback(() => {
        if (!!getValues('invoices_list').length) {
            const TotalAppliedCredit =
                getValues('invoices_list')?.length > 0 &&
                getValues('invoices_list').reduce((sum: any, item: any) => {
                    const appliedCredit = Number(item?.applied_credit) || 0;
                    return sum + appliedCredit;
                }, 0);

            if (TotalAppliedCredit >= 0 && watchTotalAvailableCredit >= 0) {
                if (TotalAppliedCredit > watchTotalAvailableCredit) {
                    setError('root.available_credit_to_apply', {
                        message:
                            'The Applied credit value must be less than Total Available Credit.',
                    });
                } else {
                    clearErrors('root.available_credit_to_apply');
                }
            }
            setValue(
                'total_applied_credit',
                Number(TotalAppliedCredit).toFixed(3),
            );
            if (typeof getValues('total_available_credit') === 'string') {
                setValue(
                    'available_credit_to_apply',
                    +Number(
                        getValues('total_available_credit').replace(/,/g, ''),
                    ).toFixed(3) - +TotalAppliedCredit,
                );
            } else {
                setValue(
                    'available_credit_to_apply',
                    +Number(getValues('total_available_credit')).toFixed(3) -
                        +TotalAppliedCredit,
                );
            }
        }
    }, [getValues, setValue, watchTotalAvailableCredit, watchAmount]);
    // useEffect(() => {
    //     if (getValues('available_cash_to_apply') < 0) {
    //         setError('available_cash_to_apply', {
    //             message:
    //                 'The value of "Available Cash To Apply" must always be greater than zero.',
    //         });
    //     }
    // }, [getValues('available_cash_to_apply')]);
    // useEffect(() => {
    //     if (getValues('available_credit_to_apply') < 0) {
    //         toast.error(
    //             'The value of "Available Credit To Apply" must always be greater than zero.',
    //         );
    //     }
    // }, [getValues('available_credit_to_apply')]);
    useEffect(() => {
        if (watchInvoicesList && watchInvoicesList?.length > 0) {
            checkTotalAppliedCash();
            checkTotalAppliedCredit();
        }
    }, [watchInvoicesList]);

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();
        if (Number(data?.amount?.replace(/,/g, '')) <= 0) {
            setError('root.amount', {
                message:
                    'The value of "amount" must always be greater than zero.',
            });
            return;
        }
        const dataForm = {
            ...data,
            customer: data?.customer?.id,
            check_date: data?.check_date || null,
            amount: Number(data?.amount?.replace(/,/g, '')),
            invoices_list: !!data?.invoices_list?.length
                ? data?.invoices_list.map(
                      ({ id, cashId, invoiceId, ...item }: any) => ({
                          ...item,
                          // id: data?.invoice || data?.id,
                          id: cashId,
                          applied_cash: item?.applied_cash || 0,
                          invoice: invoiceId || item?.invoice?.id,
                      }),
                  )
                : [],
        };

        if (!!id) {
            await updateCash.mutateAsync(dataForm);
        } else {
            await createCash.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/sales/credits/${itemId}`);
        },
        [navigate],
    );
    // ----------------step 2) reGenerate batch number  when batch number  is not unique ---
    useEffect(() => {
        if (
            !id &&
            batchNumber !== +getValues('batch_number') &&
            Object.hasOwn(errors.root || errors, 'batch_number')
        ) {
            setValue('batch_number', batchNumber);
            clearErrors('root.batch_number');
            toast.warning(
                `Batch Number not found. An automatic request has been
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
    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'btn_credit',
                extraDataForModal: customerCredit,
                disable: !customerCredit,
            },
            {
                name: 'available_cash_to_apply',
                component_type: !!id ? '' : 'LabelCurrency',
            },
            {
                name: 'available_credit_to_apply',
                component_type: !!id ? '' : 'LabelCurrency',
            },
            {
                name: 'invoices_list',
                args: {
                    grid_data: {
                        gridcolumns: [
                            {
                                name: 'row_total_due',
                                is_show: !id,
                            },
                        ],
                    },
                },
            },
        ]);
    }, [handleNavigateToEdit, fields, customerCredit]);

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
            />
            <WrapperLoading isLoading={isLoading} isError={false}>
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
            </WrapperLoading>
        </Form>
    );
};

export default FormGeneration;
