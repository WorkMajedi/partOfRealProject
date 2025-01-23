import { FunctionComponent, useCallback, useState } from 'react';
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
    const { handleSubmit, reset, setError, clearErrors } = useFormContext();
    const [open, setOpen] = useState(false);

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const createVendor = useMutation({
        mutationFn: data => Api.partner.insertVendor(data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, ['receive_order', 'phones']);
        },
    });

    const updateVendor = useMutation({
        mutationFn: data => Api.partner.updateVendor(id, data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, ['receive_order', 'phones']);
        },
    });

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();

        const dataForm = {
            ...data,
            vendor_account_number:
                data?.vendor_account_number?.id || data?.vendor_account_number,
            sr: data?.sr?.id || data?.sr,
            phones:
                data?.phones &&
                data?.phones?.map((item: any) => {
                    return {
                        ...item,
                        id: parseInt(item?.id) || '',
                    };
                }),
            receive_order: data?.receive_order?.map((item: any) => {
                return {
                    ...item,
                    id: parseInt(item?.id) || '',
                };
            }),
        };

        if (!!id) {
            await updateVendor.mutateAsync(dataForm);
        } else {
            await createVendor.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/partner/vendor/${itemId}`);
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
