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
import UseFile from 'utils/hooks/useFile';
import ExitWarningWrapper from 'utils/hooks/ExitWarningWrapper';

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
        watch,
        setValue,
        getValues,
        formState: { errors },
        setError,
        clearErrors,
    } = useFormContext();

    // handle File
    const setFilesId = UseFile();
    //=

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const watchPoNumber = watch('po_number');
    useEffect(() => {
        if (!!watchPoNumber && !id) {
            const dataGrid = watchPoNumber?.pro_lines?.map(
                ({
                    inventory_data: { comment, ...restInventory },
                    ...po
                }: any) => ({
                    ...po,
                    ...restInventory,
                    line_id: po.id,
                }),
            );

            setValue('vendor', watchPoNumber?.vendor);
            setValue('ship_via', watchPoNumber?.ship_via);
            setValue('shipment_terms', watchPoNumber?.shipment_terms);
            setValue('fob_city', watchPoNumber?.fob_city);
            setValue('location', watchPoNumber?.location);
            setValue('purchase_receipt_lines', dataGrid);
        }
    }, [watchPoNumber, id]);

    const createPurchaseOrder = useMutation({
        mutationFn: data => Api.sales.insertPurchaseOrderReceipt(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            navigate(`/sales/PurchaseOrder/receipt/${data.id}`);
        },
        onError: (err: any) => {
            handelError(err, setError, []);
            // ----------------step 1) reGenerate batch number  when batch number  is not unique ------------------------
            const error = err?.response?.data;
            if (Object.hasOwn(error, 'po_receipt_number')) {
                reGenerateBatchNumber?.();
            }
            // --------------- end of step 1 --------------------
        },
    });

    const updatePurchaseOrder = useMutation({
        mutationFn: data => Api.sales.updatePurchaseOrderReceipt(id, data),
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
            purchase_receipt_lines,
            po_number,
            vendor,
            ship_via,
            receipt_date,
            ...rest
        } = data;

        const dataForm = {
            ...rest,
            purchase_order: po_number?.id,
            vendor: vendor?.id,
            ship_via: ship_via?.id,
            receipt_date: receipt_date || null,
            purchase_receipt_lines: !!purchase_receipt_lines?.length
                ? purchase_receipt_lines.map(
                      ({
                          row_id,
                          received_qty,
                          line_id,
                          obj_id,
                          item_id,
                          backendId,
                          ...po
                      }: any) => {
                          return {
                              ...po,
                              id: row_id,
                              obj_id:
                                  obj_id ??
                                  item_id ??
                                  backendId ??
                                  row_id ??
                                  line_id,
                              // id: row_id || line_id,
                              received_qty: !!received_qty ? received_qty : 0,
                              purchase_order_line: line_id,
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
            navigate(`/sales/PurchaseOrder/receipt/${itemId}`);
        },
        [navigate],
    );
    // ----------------step 2) reGenerate batch number  when batch number  is not unique ---
    useEffect(() => {
        if (
            !id &&
            batchNumber !== +getValues('po_receipt_number') &&
            Object.hasOwn(errors.root || errors, 'po_receipt_number')
        ) {
            setValue('po_receipt_number', batchNumber);
            clearErrors('root.po_receipt_number');
            toast.warning(
                `po receipt number not found. An automatic request has been
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
                name: 'po_receipt_number',
                editable: !id,
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },
            {
                name: 'attachments',
                setFilesId,
            },
        ]);
    }, [handleNavigateToEdit, fields]);

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
                        !!id
                            ? `/api/purchase_orders/generate_pdf_po_receipt/${id}`
                            : null
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
