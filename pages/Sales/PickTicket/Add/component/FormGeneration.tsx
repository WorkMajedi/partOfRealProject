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
import { consoleLog, handelError } from 'utils/utils';
import UseFile from '../../../../../utils/hooks/useFile';
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

    // handle File
    const setFilesId = UseFile();
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
        }
    }, [
        watchShipTo,
        setValue,
        getValues,
        listData?.ship_to_address,
        isShipToTouch,
    ]);
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

    const createPickTicket = useMutation({
        mutationFn: data => Api.sales.insertPickTicket(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            if (data?.status === 'Ready For Invoice' && data?.invoice_id) {
                navigate(`/sales/invoice/${data?.invoice_id}`);
            }
        },
        onError: (err: any) => {
            handelError(err, setError, ['pick_ticket_items']);
        },
    });

    const updatePickTicket = useMutation({
        mutationFn: data => Api.sales.updatePickTicket(id, data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            if (data?.status === 'Ready For Invoice' && data?.invoice_id) {
                navigate(`/sales/invoice/${data?.invoice_id}`);
            }
        },
        onError: (err: any) => {
            handelError(err, setError, ['pick_ticket_items']);
        },
    });
    useEffect(() => {
        console.log(
            getValues('pick_ticket_items')?.[0]?.pick_ticket_item_lots,
            '--------',
        );
    }, [getValues('pick_ticket_items')]);
    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();

        const {
            csr,
            customer,
            ship_via,
            term,
            picker,
            pick_ticket_items,
            freight_method,
            address_zip_code,
            sales_tax,
            ...restData
        } = data;
        console.log(data, '-- data  --');
        const dataForm = {
            ...restData,
            csr: csr?.id,
            customer_term: term || null,
            customer: customer?.id,
            ship_via: ship_via?.id,
            freight_method: freight_method || null,
            picker: picker?.id,
            address_zip_code:
                address_zip_code?.code ||
                address_zip_code?.zip_code ||
                address_zip_code,
            pick_ticket_items: !!pick_ticket_items.length
                ? pick_ticket_items
                      .map(
                          ({
                              index,
                              id,
                              rowId,
                              guid,
                              pickId,
                              itemId,
                              backendId,
                              details,
                              pick_ticket_item_lots,
                              ...pick
                          }: any) => {
                              const pickItemLot = !!details
                                  ?.pick_ticket_item_lots?.length
                                  ? details?.pick_ticket_item_lots
                                  : pick_ticket_item_lots;
                              return {
                                  ...pick,
                                  id: pickId,
                                  item: itemId || backendId,
                                  pick_ticket_item_lots:
                                      pickItemLot
                                          ?.map(
                                              ({
                                                  lot_id,
                                                  picked_qty,
                                                  suggested_picked_qty,
                                                  quantity,
                                              }: any) => {
                                                  if (
                                                      (!!picked_qty &&
                                                          Number(picked_qty) >
                                                              0) ||
                                                      (!!suggested_picked_qty &&
                                                          Number(
                                                              suggested_picked_qty,
                                                          ) > 0)
                                                  ) {
                                                      return {
                                                          item_lot: lot_id,
                                                          quantity:
                                                              picked_qty ?? 0,
                                                          suggested_picked_qty,
                                                      };
                                                  } else if (
                                                      !details
                                                          ?.pick_ticket_item_lots
                                                          ?.length &&
                                                      !!quantity
                                                  ) {
                                                      return {
                                                          item_lot: lot_id,
                                                          quantity:
                                                              picked_qty ||
                                                              quantity ||
                                                              0,
                                                          suggested_picked_qty,
                                                      };
                                                  }
                                              },
                                          )
                                          .filter(Boolean) || [],
                              };
                          },
                      )
                      .filter((item: any) => !!item?.code)
                      .filter(Boolean)
                : [],
        };

        if (!!id) {
            await updatePickTicket.mutateAsync(dataForm);
        } else {
            await createPickTicket.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/sales/pick_ticket/${itemId}`);
        },
        [navigate],
    );
    // handel Change Tax Calculation based on zip code
    const watchZipCode = watch('address_zip_code');
    useEffect(() => {
        if (watchZipCode && watchZipCode?.sales_tax) {
            setValue('sales_tax', watchZipCode?.sales_tax || 0);
        }
    }, [watchZipCode]);
    // ------------- end ---------------------
    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'pick_ticket_number',
                editable: !id,
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },
            {
                name: 'customer',
                creatable: false,
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
                name: 'ship_to_address',
                args: {
                    choices: shipToAddressChoices,
                },
            },
            {
                name: 'attachments',
                setFilesId,
            },
            {
                name: 'pick_ticket_items',
                datahere: {
                    sampleTest: 'HERE',
                },
            },
        ]);
    }, [fields, handleNavigateToEdit, shipViaChoices, shipToAddressChoices]);

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
                            ? `/api/pick_ticket/generate_pdf_pick_ticket/${id}`
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
