import { FunctionComponent, useCallback, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
import SelectedComponent from 'core/component/selectedComponent/SelectedComponent';
import { Form } from 'component/common';
import { Field } from 'types/type';
import ActionBar from 'component/ActionBar';
import { useMutation } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Api } from 'api';
import { toast } from 'react-toastify';
import UseDisplayBtnActionBar from 'utils/hooks/useDisplayBtnActionBar';
import { overrideFields } from 'core/utils/overWrite';
import useLoading from 'utils/hooks/useLoading';
import { FindStepFristPath, handelError } from 'utils/utils';

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
    const { load, loading } = useLoading();
    const [open, setOpen] = useState(false);

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const createCustomerTerm = useMutation({
        mutationFn: data => Api.partner.insertCustomerTerms(data),
        onSuccess: () => {
            load();
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            handelReset();
        },
        onError: (err: any) => {
            handelError(err, setError, []);
        },
    });

    const updateCustomerTerm = useMutation({
        mutationFn: data => Api.partner.updateCustomerTerms(id, data),
        onSuccess: () => {
            load();
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            handelReset();
        },
        onError: (err: any) => {
            handelError(err, setError, []);
        },
    });

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();

        const dataForm = {
            ...data,
        };

        if (!!id) {
            await updateCustomerTerm.mutateAsync(dataForm);
        } else {
            await createCustomerTerm.mutateAsync(dataForm);
        }
    };

    const { pathname } = useLocation();

    const handelReset = () => {
        const path = FindStepFristPath(pathname);
        console.log(listData, '-- listData  --');
        reset({
            code: '',
            description: '',
            number_of_days: null,
        });
        navigate(path + '/add');
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/partner/customer/term/${itemId}`);
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
                name: 'terms_list',
                asyncDelete: true,
                component_type: loading ? 'Loading' : '#GridSimpleDynamic',
            },
        ]);
    }, [handleNavigateToEdit, fields, loading]);

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
