import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
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
import { buildUrlFromParams } from 'utils/utils';
import { ReportBaseUrl } from 'api/api/services/report/report';
import { instance } from '../../../../../api/config';

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
    const { id } = useParams();
    const { watch, reset, setValue } = useFormContext();
    const [open, setOpen] = useState(false);
    // base url report  ============
    const baseURL = `${instance.defaults.baseURL}${ReportBaseUrl}/sales_by_customer`;
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
            // toast.success('Generated pick ticket successfully.');
            // navigate(`/sales/pick_ticket/${data.id}`);
            if (data?.results) {
                reset({
                    ...watchAllData,
                    result: data?.results,
                    total_of_total_paid: data?.total_of_total_paid,
                    total_of_total_due: data?.total_of_total_due,
                    total_of_grand_total: data?.total_of_grand_total,
                    total_of_total_applied_credit:
                        data?.total_of_total_applied_credit,
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

    const selectedKeys = [
        'sales_person_id',
        'customer_id',
        'to_date',
        'from_date',
    ];
    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'generate_report',
                isLoadingButton: handleGenerateReport.isLoading,
                onClick: () => {
                    const url = buildUrlFromParams(baseURL, selectedKeys, {
                        // all_customers: !!watchAllData?.all_customers,
                        ...(watchAllData?.customer && {
                            customer_id:
                                watchAllData?.customer?.id ||
                                watchAllData?.customer,
                        }),
                        ...(watchAllData?.to_date && {
                            to_date: watchAllData?.to_date,
                        }),
                        ...(watchAllData?.from_date && {
                            from_date: watchAllData?.from_date,
                        }),
                        ...(watchAllData?.salesperson && {
                            sales_person_id:
                                watchAllData?.salesperson?.id ||
                                watchAllData?.salesperson,
                        }),
                    });
                    if (url.length > 0) {
                        setUrlReport(url);
                        handleGenerateReport.mutateAsync(url);
                    }
                },
            },
            {
                name: 'customer',
                editable: !watchAllData?.all_customers,
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
