import {
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
import { handelError } from 'utils/utils';
import UseFile from 'utils/hooks/useFile';
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

    const watchCost = watch('current_cost') || 0;
    const prevCostRef = useRef<number>(listData?.current_cost);
    useEffect(() => {
        if (typeof watchCost !== 'string') {
            prevCostRef.current = watchCost;
        }
    }, [watchCost]);

    const createRawMaterial = useMutation({
        mutationFn: data => Api.manufacture.insertManufactureRawMaterial(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            navigate(`/manufacture/raw-material/${data?.id}`);
        },
        onError: (err: any) => {
            handelError(err, setError, ['raw_material_vendor']);
        },
    });

    const updateRawMaterial = useMutation({
        mutationFn: data =>
            Api.manufacture.updateManufactureRawMaterial(id, data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(err, setError, ['raw_material_vendor']);
        },
    });

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();

        const dataForm = normalized.rawMaterial.insert(data);
        dataForm.current_cost = prevCostRef.current;
        if (!!id) {
            await updateRawMaterial.mutateAsync(dataForm);
        } else {
            await createRawMaterial.mutateAsync(dataForm);
        }
    };

    const handelReset = () => {
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/manufacture/raw-material/${itemId}`);
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
        ]);
    }, [id, handleNavigateToEdit, fields]);

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
