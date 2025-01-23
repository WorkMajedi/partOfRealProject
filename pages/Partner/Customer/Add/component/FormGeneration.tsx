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
import ExitWarningWrapper from '../../../../../utils/hooks/ExitWarningWrapper';

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
    const { handleSubmit, reset, setError, clearErrors, watch, setValue } =
        useFormContext();
    const [open, setOpen] = useState(false);

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const createCustomer = useMutation({
        mutationFn: data => Api.partner.insertCustomer(data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, [
                'authorize_persons',
                'salespersons',
                'statement_recipients',
                'invoice_recipients',
                'phones',
                'ship_to_addresses',
            ]);
        },
    });

    // copy customer sales person
    const watchCustomerId = watch('customer')?.id;
    const [copySalesPerson, setCopySalesPerson] = useState<any[] | null>(null);
    const getSalesPersonCustomers = useMutation({
        mutationFn: ({ id }: any) => Api.partner.getCustomer(id),
        onSuccess: ({ data }) => {
            const listData =
                data?.customer_items?.length &&
                data?.customer_items?.map((item: any) => ({
                    ...(item?.item ?? {}),
                    ...item,
                    itemId: item?.item?.id ?? item?.item_id,
                }));
            setCopySalesPerson(listData);
        },
        onError: (error: any) => {
            toast.error(`The ${error?.response?.status} error indicates`);
        },
    });
    useEffect(() => {
        if (watchCustomerId)
            getSalesPersonCustomers.mutateAsync({ id: watchCustomerId });
    }, [watchCustomerId]);

    const handleClickCopySalesPerson = useCallback(() => {
        if (copySalesPerson && copySalesPerson.length > 0) {
            setValue('item_price_list', copySalesPerson);
        }
    }, [copySalesPerson]);

    // ------------ copy customer sales person

    const updateCustomer = useMutation({
        mutationFn: data => Api.partner.updateCustomer(id, data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, [
                'authorize_persons',
                'salespersons',
                'statement_recipients',
                'invoice_recipients',
                'phones',
                'ship_to_addresses',
            ]);
        },
    });

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();
        const {
            authorize_persons_columns,
            invoice_recipients_columns,
            phones_columns,
            salespersons_columns,
            ship_to_addresses_columns,
            statement_recipients_columns,
            ship_to_addresses,
            phones,
            invoice_recipients,
            statement_recipients,
            order_recipients,
            salespersons,
            item_price_list,
            authorize_persons,
            category,
            credit_limit,
            term,
            type,
            ...restData
        } = data;
        console.log({ data });
        const dataForm = {
            ...restData,
            category: category || null,
            credit_limit: credit_limit || 0,
            term: term || null,
            type: type || null,
            csr: restData?.csr?.id,
            ship_to_address: !!ship_to_addresses?.length
                ? ship_to_addresses.map(
                      ({ id, index, rowId, backendId, ...rest }: any) => ({
                          ...rest,
                          id: backendId,
                      }),
                  )
                : [],
            phones: !!phones?.length
                ? phones.map(({ id, index, backendId, ...rest }: any) => ({
                      ...rest,
                      id: backendId,
                  }))
                : [],
            customer_items: !!item_price_list.length
                ? item_price_list?.map(
                      ({
                          id,
                          backendId,
                          price,
                          inventory_uom,
                          itemId,
                          ...item
                      }: any) => {
                          return {
                              ...item,
                              id: backendId,
                              item: itemId ?? backendId,
                              active: item.active || true,
                              from_data: item.from_data || null,
                              to_date: item.to_date || null,
                              price,
                              inventory_uom,
                          };
                      },
                  )
                : [],
            invoice_recipients: !!invoice_recipients?.length
                ? invoice_recipients.map(
                      ({ id, index, rowId, backendId, ...rest }: any) => ({
                          ...rest,
                          id: backendId,
                      }),
                  )
                : [],
            order_recipients: !!order_recipients?.length
                ? order_recipients.map(
                      ({ id, index, rowId, backendId, ...rest }: any) => ({
                          ...rest,
                          id: backendId,
                      }),
                  )
                : [],
            statement_recipients: !!statement_recipients?.length
                ? statement_recipients.map(
                      ({ id, index, rowId, backendId, ...rest }: any) => ({
                          ...rest,
                          id: backendId,
                      }),
                  )
                : [],
            customer_salespersons: !!salespersons?.length
                ? salespersons.map(
                      ({
                          id,
                          backendId,
                          commission_rate,
                          salespersonId,
                          ...rest
                      }: any) => ({
                          ...rest,
                          id: backendId || null,
                          salesperson: salespersonId || id,
                          commission_rate,
                      }),
                  )
                : [],
            authorize_persons: !!authorize_persons?.length
                ? authorize_persons.map(
                      ({ id, index, rowId, backendId, ...rest }: any) => ({
                          ...rest,
                          id: backendId,
                      }),
                  )
                : [],
        };

        if (!!id) {
            await updateCustomer.mutateAsync(dataForm);
        } else {
            await createCustomer.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/partner/customer/${itemId}`);
        },
        [navigate],
    );

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'code',
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },
            {
                name: 'copy',
                onClick: async () => {
                    handleClickCopySalesPerson();
                },
            },
        ]);
    }, [handleNavigateToEdit, fields, copySalesPerson]);

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
