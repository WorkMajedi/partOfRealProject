import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
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
import { normalized } from 'api/Normalized';
import UseFile from 'utils/hooks/useFile';
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
    const { handleSubmit, watch, reset, setError, clearErrors } =
        useFormContext();
    const [open, setOpen] = useState(false);

    // handle File
    const setFilesId = UseFile();
    //=

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const createPackagingMaterial = useMutation({
        mutationFn: data =>
            Api.manufacture.insertManufacturePackagingMaterial(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            navigate(`/manufacture/packaging-material/${data?.id}`);
        },
        onError: (err: any) => {
            handelError(err, setError, ['packaging_material_vendor']);
        },
    });

    const updatePackagingMaterial = useMutation({
        mutationFn: data =>
            Api.manufacture.updateManufacturePackagingMaterial(id, data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, ['packaging_material_vendor']);
        },
    });
    const watchPackageType = watch('package_type') || '';
    // select sub packages
    useEffect(() => {}, []);
    const watchCost = watch('current_cost') || 0;
    const prevCostRef = useRef<number>(listData?.current_cost);
    useEffect(() => {
        if (typeof watchCost !== 'string') {
            prevCostRef.current = watchCost;
        }
    }, [watchCost]);

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();
        const dataForm = normalized.packagingMaterial.insert(data, id);
        dataForm.current_cost = prevCostRef.current;
        if (!!id) {
            await updatePackagingMaterial.mutateAsync(dataForm);
        } else {
            await createPackagingMaterial.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/manufacture/packaging-material/${itemId}`);
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
                name: 'attachments',
                setFilesId,
            },
            {
                name: 'sub_packages',
                component_type:
                    watchPackageType?.toLowerCase() === 'dependent'
                        ? '#GridEditableStatic'
                        : '',
            },
        ]);
    }, [id, handleNavigateToEdit, fields, watchPackageType]);

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
            </Form>{' '}
        </ExitWarningWrapper>
    );
};

export default FormGeneration;
