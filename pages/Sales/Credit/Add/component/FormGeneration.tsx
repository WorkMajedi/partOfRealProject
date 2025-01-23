import { FunctionComponent, useCallback, useMemo, useState } from 'react';
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
import { deleteProps, handelError } from 'utils/utils';
import ExitWarningWrapper from 'utils/hooks/ExitWarningWrapper';

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
        reset,
        setValue,
        getValues,
        setError,
        watch,
        clearErrors,
    } = useFormContext();
    const [open, setOpen] = useState(false);

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const createCredit = useMutation({
        mutationFn: data => Api.sales.insertCredit(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            navigate(`/sales/credits/${data?.id}`);
        },

        onError: (err: any) => {
            handelError(err, setError, []);
        },
    });

    const updateCredit = useMutation({
        mutationFn: data => Api.sales.updateCredit(id, data),
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
        const dataForm = {
            ...data,
            customer: data?.customer?.id,
            amount: Number(data?.amount.replace(/,/g, '')).toFixed(3),
            available_amount: Number(data?.amount.replace(/,/g, '')).toFixed(3),
            approved_by: data?.approved_by?.username,
        };
        if (!!id) {
            deleteProps(dataForm, ['unchangedResponse', 'applied_amount']);
            await updateCredit.mutateAsync(dataForm);
        } else {
            await createCredit.mutateAsync(dataForm);
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
    const applied_amount = getValues('applied_amount');

    const overWriteFieldForm: any = useCallback(() => {
        const overridedFields = overrideFields(fields, [
            {
                name: 'code',
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },
            {
                name: 'amount',
                component_type: 'FieldCurrency',
            },
        ]);
        // status, approve, comment, structure
        if (+applied_amount !== 0) {
            return overridedFields?.map((field: any) => {
                const ignoreDisabledFields = [
                    'status',
                    'comment',
                    'instruction',
                    'approved',
                ];
                if (ignoreDisabledFields.includes(field.name)) return field;
                if (id) {
                    return { ...field, disable: true, editable: false };
                }
                return field;
            });
        }
        return overridedFields;
    }, [handleNavigateToEdit, fields, applied_amount]);

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
