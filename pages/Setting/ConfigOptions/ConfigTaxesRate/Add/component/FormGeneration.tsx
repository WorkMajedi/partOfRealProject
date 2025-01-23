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
import { FindStepFristPath, handelError } from '../../../../../../utils/utils';
import useLoading from '../../../../../../utils/hooks/useLoading';

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
    const { handleSubmit, reset, setValue, getValues, setError, clearErrors } =
        useFormContext();
    const [open, setOpen] = useState(false);
    const { load, loading } = useLoading();

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const createTaxRate = useMutation({
        mutationFn: data => Api.option.insertTaxRate(data),
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

    const updateTaxRate = useMutation({
        mutationFn: data => Api.option.updateTaxRate(id, data),
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
        console.log(id, data, '-- id  --');
        if (!!id) {
            await updateTaxRate.mutateAsync(dataForm);
        } else {
            await createTaxRate.mutateAsync(dataForm);
        }
    };

    const { pathname } = useLocation();

    const handelReset = () => {
        const path = FindStepFristPath(pathname);
        reset({
            zip_code: '',
            description: '',
            sales_tax: '',
            green_tax: '',
        });
        navigate(path + '/add');
        setTimeout(() => {
            navigate(0);
        });
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/config-tax-rate/${itemId}`);
        },
        [navigate],
    );

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'taxes_list',
                asyncDelete: true,
                component_type: loading ? 'Loading' : '#GridSimpleDynamic',
                width: '12',
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },
        ]);
    }, [id, handleNavigateToEdit, fields, loading]);

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
            <Grid container spacing={2}>
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
