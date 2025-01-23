import {
    FunctionComponent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { alertTitleClasses, Grid } from '@mui/material';
import SelectedComponent from 'core/component/selectedComponent/SelectedComponent';
import { Form, WrapperLoading } from 'component/common';
import { Field } from 'types/type';
import ActionBar from 'component/ActionBar';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Api } from 'api';
import { toast } from 'react-toastify';
import UseDisplayBtnActionBar from 'utils/hooks/useDisplayBtnActionBar';
import { overrideFields } from 'core/utils/overWrite';
import { buildUrlFromParams, handelError } from 'utils/utils';
import { useSelector } from 'react-redux';
import UseFile from '../../../../../utils/hooks/useFile';
import { instance } from '../../../../../api/config';
import {
    IReportRawMaterial,
    ReportBaseUrl,
} from 'api/api/services/report/report';
import generate from '@babel/generator';

interface OwnProps {
    fields: Field[];
    listData?: any;
    reGenerateBatchNumber?: () => void;
    batchNumber?: number | string;
}

type Props = OwnProps;

const FormGeneration: FunctionComponent<Props> = ({
    fields = [],
    listData,
}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        watch,
        getValues,
        reset,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();
    const [open, setOpen] = useState(false);
    // base url report  ============
    const baseURL =
        instance.defaults.baseURL +
        `${ReportBaseUrl}/packaging_material_inventory_and_price`;

    const [urlReport, setUrlReport] = useState<string>(baseURL);
    // ================= end =========
    const watchAllData = watch();
    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const handelReset = () => {
        reset(listData);
    };

    // ============= handle generate reports =================
    const handleGenerateReport = useMutation({
        mutationFn: (url: string) => Api.report.getReportRawMaterials(url),
        onSuccess: ({ data }) => {
            //toast.success('Generated pick ticket successfully.');
            //navigate(`/sales/pick_ticket/${data.id}`);
            console.log(data, '--  data --');
            if (data?.results) {
                reset({
                    ...watchAllData,
                    result: data?.results,
                    total_cost: data?.total_cost,
                });
            }
            return data;
        },
        onError: (error: any) => {
            if (!!error?.response?.status)
                toast.error(`The ${error?.response?.status} error indicates`);
        },
    });
    // ================= end ================================

    const selectedKeys = ['all_objects', 'obj_id', 'to_date', 'from_date'];
    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'generate_report',
                isLoadingButton: handleGenerateReport.isLoading,
                onClick: () => {
                    const url = buildUrlFromParams(baseURL, selectedKeys, {
                        ...(watchAllData?.packaging_material && {
                            obj_id:
                                watchAllData?.packaging_material?.id ||
                                watchAllData?.packaging_material,
                        }),
                    });
                    if (url.length > 0) {
                        setUrlReport(url);
                        handleGenerateReport.mutateAsync(url);
                    }
                },
            },
            {
                name: 'raw_material',
                editable: !watchAllData?.all_objects,
            },
        ]);
    }, [fields, watchAllData]);

    const ComponentActonBar = useMemo(() => {
        return (
            <ActionBar
                // save={handleSubmit(onSubmitHandler)}
                baseUrlReport={urlReport}
                reset={() => setOpen(true)}
            />
        );
    }, [urlReport]);

    return (
        <Form
            display="flex"
            flexDirection="column"
            openModal={open}
            closeModal={() => setOpen(false)}
            reset={() => handelReset()}
        >
            {ComponentActonBar}
            <WrapperLoading
                isLoading={handleGenerateReport.isLoading}
                isError={false}
                type="page"
            >
                <Grid container spacing={3}>
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
            </WrapperLoading>
        </Form>
    );
};

export default FormGeneration;
