import React, { FunctionComponent, useCallback, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
import SelectedComponent from 'core/component/selectedComponent/SelectedComponent';
import Api from 'api/api/services';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form } from 'component/common';
import { Field } from 'types/type';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import ActionBar from 'component/ActionBar';
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
    const { reset, setError, clearErrors } = useFormContext();
    const { load, loading } = useLoading();

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const createClass = useMutation({
        mutationFn: data => Api.manufacture.insertClass(data),
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

    const updateClass = useMutation({
        mutationFn: data => Api.manufacture.updateClass(id, data),
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

    const [open, setOpen] = useState(false);
    const { handleSubmit } = useFormContext();

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();

        const dataForm = {
            ...data,
        };

        if (!!id) {
            await updateClass.mutateAsync(dataForm);
        } else {
            await createClass.mutateAsync(dataForm);
        }
    };

    const { pathname } = useLocation();

    const handelReset = () => {
        const path = FindStepFristPath(pathname);
        console.log(listData, '-- listData  --');
        reset({
            code: '',
            description: '',
        });
        navigate(path + '/add');
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/manufacture/hierarchy/class/${itemId}`);
        },
        [navigate],
    );

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'code',
                editable: !id,
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },
            {
                name: 'class_list',
                component_type: loading ? 'Loading' : '#GridSimpleDynamic',
                asyncDelete: true,
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
