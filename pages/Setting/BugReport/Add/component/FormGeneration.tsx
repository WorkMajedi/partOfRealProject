import { FunctionComponent, useCallback, useEffect, useState } from 'react';
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
import UseFile from 'utils/hooks/useFile';
import { useSelector } from 'react-redux';

interface OwnProps {
    fields: Field[];
    listData?: any;
}

type Props = OwnProps;

const FormGeneration: FunctionComponent<Props> = ({
    fields = [],
    listData,
}) => {
    const { id } = useParams();
    const { handleSubmit, reset, setValue, setError, clearErrors } =
        useFormContext();
    const [open, setOpen] = useState(false);

    // handle File
    const setFilesId = UseFile();
    //=

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    // set clerk input value
    const { userData } = useSelector((state: any) => state?.permissions);
    const handleClerkInput = useCallback(() => {
        setValue(
            'reported_by',
            `${userData?.first_name || ''} ${userData?.last_name || ''}`,
        );
    }, [setValue]);
    useEffect(() => {
        if (!id) {
            handleClerkInput();
        }
    }, [id, handleClerkInput]);
    //=

    const createBugReport = useMutation({
        mutationFn: data => Api.bug.reportCreate(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, []);
        },
    });

    const updateBugReport = useMutation({
        mutationFn: data => Api.bug.updateReport(id, data),
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
        };
        dataForm.reported_by = userData?.id;
        // return ('xxx dataForm', dataForm, '#f49');
        if (!!id) {
            await updateBugReport.mutateAsync(dataForm);
        } else {
            await createBugReport.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'attachments',
                setFilesId,
            },
        ]);
    }, [fields, setFilesId]);

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
