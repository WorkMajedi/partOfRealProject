import { FunctionComponent, useCallback, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
import SelectedComponent from 'core/component/selectedComponent/SelectedComponent';
import { Form } from 'component/common';
import { Field } from 'types/type';
import ActionBar from 'component/ActionBar';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { Api } from 'api';
import { toast } from 'react-toastify';
import { overrideFields } from 'core/utils/overWrite';
import { handelError } from 'utils/utils';
import UseDisplayBtnActionBar from 'utils/hooks/useDisplayBtnActionBar';
import { useDispatch } from 'react-redux';
import { setDefaultOptions } from 'redux/slices/configOption/options.slice';

interface OwnProps {
    fields: Field[];
    listData?: any;
}

type Props = OwnProps;

const FormGeneration: FunctionComponent<Props> = ({
    fields = [],
    listData,
}) => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const { handleSubmit, reset, setError, clearErrors } = useFormContext();
    const [open, setOpen] = useState(false);

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const createConfig = useMutation({
        mutationFn: data => Api.option.insertConfig(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            dispatch(setDefaultOptions(data));
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

        await createConfig.mutateAsync(dataForm);
    };

    const handelReset = () => {
        reset(listData);
    };

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, []);
    }, [fields]);

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
