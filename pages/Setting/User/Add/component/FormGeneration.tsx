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
import { handlePermissionList, handlePreparePermissions } from 'utils/utils';
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
    const [filesId, setFilesId] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const { reset, watch, setValue, getValues, handleSubmit } =
        useFormContext();
    const [open, setOpen] = useState(false);
    //= handle render permission in grid after selected in Assign role input
    const watchRole = watch('role');
    console.log(watchRole, '-- watchRole  --');
    useEffect(() => {
        if (
            !id &&
            !!watchRole?.permissions &&
            !!Object.keys(watchRole?.permissions).length
        ) {
            setLoading(true);
            const permissions =
                handlePreparePermissions(watchRole.permissions) || [];
            const sortedPermissions = Array.from(permissions.values()).sort(
                (a: any, b: any) => a.key.localeCompare(b.key),
            );
            setTimeout(() => {
                setValue('permissions', sortedPermissions);
                setLoading(false);
            }, 100);
        }
    }, [setValue, watchRole]);
    //=
    useEffect(() => {
        if (listData) reset(listData);
    }, [listData]);
    //= handle image id and default image
    useEffect(() => {
        const defaultFileIds = !!getValues('image')
            ? getValues('image').map((file: any) => file.id)
            : [];
        setFilesId(defaultFileIds);
    }, [getValues]);

    useEffect(() => {
        setValue('image', filesId);
    }, [filesId, setValue]);
    //= handle image id and default image

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const createUser = useMutation({
        mutationFn: data => Api.user.insertUser(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            handleNavigateToEdit(data.id);
        },
    });

    const updateUser = useMutation({
        mutationFn: data => Api.user.updateUser(id, data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
    });

    const onSubmitHandler: SubmitHandler<any> = async data => {
        const dataForm = {
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            is_active: data.is_active,
            password: data.password,
            email: data.email,
            phone_number: +data.phone_number || null,
            role_id: data.role.id,
            image: data.image,
            permissions: handlePermissionList(data.permissions),
        };

        try {
            if (!!id) {
                // @ts-ignore
                await updateUser.mutateAsync(dataForm);
            } else {
                // @ts-ignore
                await createUser.mutateAsync(dataForm);
                reset();
                setFilesId([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/setting/user/${itemId}`);
        },
        [navigate],
    );

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'username',
                navigateToEdit: (itemId: number) =>
                    handleNavigateToEdit(itemId),
            },
            {
                name: 'image',
                setFilesId,
            },
            {
                name: 'permissions',
                component_type: loading ? 'Loading' : '#GridEditableStatic',
            },
        ]);
    }, [handleNavigateToEdit, fields, loading]);

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
