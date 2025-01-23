import {
    FunctionComponent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
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
import {
    handelError,
    handlePermissionList,
    updateArrayAllGranted,
} from 'utils/utils';
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
    const { reset, getValues, setValue, setError, clearErrors } =
        useFormContext();

    const [loading, setLoading] = useState(false);
    const [grantedAllPermission, setGrantedAllPermission] = useState<
        boolean | ''
    >('');
    useEffect(() => {
        if (!id) {
            setLoading(true);
            setTimeout(() => {
                setGrantedAllPermission(false);
            }, 100);
        }
    }, [listData]);
    useEffect(() => {
        if (grantedAllPermission === true) {
            setLoading(true);
            setTimeout(() => {
                setValue(
                    'permissions',
                    updateArrayAllGranted(getValues('permissions'), true),
                );
                setLoading(false);
            }, 100);
        } else if (grantedAllPermission === false) {
            setLoading(true);
            setTimeout(() => {
                setValue(
                    'permissions',
                    updateArrayAllGranted(getValues('permissions'), false),
                );
                setLoading(false);
            }, 100);
        }
    }, [getValues, grantedAllPermission, setValue]);

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆
    useEffect(() => {
        if (listData) reset(listData);
    }, [listData]);

    const createRole = useMutation({
        mutationFn: data => Api.role.insertRole(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            navigate(`/setting/role/${data.id}`);
        },
        onError: (err: any) => {
            handelError(err, setError, []);
        },
    });

    const updateRole = useMutation({
        mutationFn: data => Api.role.updateRole(id, data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
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
            apply_to_all: data?.apply_to_all,
            code: data.code.toString().toUpperCase(),
            description: data.description,
            permissions: handlePermissionList(data.permissions),
        };

        if (!!id) {
            // @ts-ignore
            await updateRole.mutateAsync(dataForm);
        } else {
            // @ts-ignore
            await createRole.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/setting/role/${itemId}`);
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
                name: 'grant_all',
                label: grantedAllPermission
                    ? 'Deny All Permissions'
                    : 'Grant All Permissions',
                component_type: grantedAllPermission
                    ? 'ButtonPrimary'
                    : 'ButtonSecondary',
                onClick: () => setGrantedAllPermission(prevState => !prevState),
            },
            {
                name: 'permissions',
                component_type: loading ? 'Loading' : '#GridEditableStatic',
            },
        ]);
    }, [
        handleNavigateToEdit,
        fields,
        setGrantedAllPermission,
        grantedAllPermission,
        loading,
    ]);
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
