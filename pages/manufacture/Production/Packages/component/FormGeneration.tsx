import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
import SelectedComponent from 'core/component/selectedComponent/SelectedComponent';
import Api from 'api/api/services';
import { useKeyPress } from 'ahooks';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, WrapperLoading } from 'component/common';
import { Field } from 'types/type';
import { toast } from 'react-toastify';
import { overrideFields } from 'core/utils/overWrite';
import { cleanObject } from 'utils/CleanObject';
import {
    FindStepFristPath,
    getValueQuantityUom,
    handelError,
} from 'utils/utils';
import ActionBar from 'component/ActionBar';
import { useMutation } from 'react-query';
import { normalized } from '../../../../../api/Normalized';
import printJS from 'print-js';
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
    const {
        handleSubmit,
        reset,
        watch,
        clearErrors,
        setValue,
        getValues,
        setError,
    } = useFormContext();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [searchParams] = useSearchParams();
    const code = searchParams.get('production_code');

    const [open, setOpen] = useState(false);

    const watchPrivateLabel = watch('private_label');
    const watchMakeAllDone = watch('make_all_phases_done');
    const watchApproval = watch('approval');
    const watchPackagingApproval = watch('packaging_approval');

    useEffect(() => {
        if (watchPackagingApproval) {
            return setValue('status', 'Done');
        }
        setValue('status', 'Ready for Packaging');
    }, [setValue, watchPackagingApproval]);

    useEffect(() => {
        const grid = getValues('product_template_critical_path');

        if (watchMakeAllDone) {
            const newArr =
                Array.isArray(grid) &&
                grid.map((item: any) => {
                    return {
                        ...item,
                        phase_status: 'Done',
                    };
                });

            if (newArr) {
                setValue('product_template_critical_path', newArr);
            }
        }
    }, [watchMakeAllDone]);

    useEffect(() => {
        if (watchApproval) {
            setValue('status', 'Ready for Packaging');
        }
    }, [watchApproval]);

    // sum all item_produced_qty value from packaging grid and setValue("total_capacity_value")
    const watchPackagingListGrid = watch('packaging');
    const watchTotalCapacityValue = watch('total_capacity_value');
    const handleSumPrdQty = useCallback(() => {
        const setTimeCalcSum = setTimeout(() => {
            const sum = getValues('packaging').reduce(
                (prdQty: number, item: any) => {
                    // Each = 1 unit
                    // Dozen = 12 Each
                    // Gross = 12 Dozen
                    const multiple = getValueQuantityUom(
                        item?.item_quantity_uom,
                    );
                    const packagingVolume =
                        parseFloat(item.packaging_volume) || 0;
                    prdQty +=
                        Number(item?.item_produced_qty || 0) *
                        multiple *
                        packagingVolume;
                    return prdQty;
                },
                0,
            );

            setValue('total_capacity_value', Number(sum).toFixed(3));
        }, 500);
        return () => clearTimeout(setTimeCalcSum);
    }, [getValues, setValue]);

    const [errorTotalCapacityValue, setErrorTotalCapacityValue] = useState({
        error: false,
        message: '',
    });
    useEffect(() => {
        if (
            parseFloat(watchTotalCapacityValue) >
            parseFloat(getValues('yield_field'))
        ) {
            setErrorTotalCapacityValue({
                error: true,
                message: 'Out of Yield .',
            });
        } else {
            setErrorTotalCapacityValue({
                error: false,
                message: '',
            });
        }
    }, [watchTotalCapacityValue, getValues]);

    useEffect(() => {
        if (!!watchPackagingListGrid) {
            handleSumPrdQty();
        }
    }, [handleSumPrdQty, watchPackagingListGrid]);
    //=

    const createProduction = useMutation({
        mutationFn: data => Api.manufacture.insertProduction(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            if (data.status === 'Ready for QA') {
                navigate(`/manufacture/production/qa?production_code=${code}`);
            } else if (data.status === 'Ready for Packaging') {
                navigate(
                    `/manufacture/production/packaging?production_code=${code}`,
                );
            } else if (
                data.status === 'Open' ||
                data.status === 'In Progress'
            ) {
                navigate(
                    `/manufacture/production/define?production_code=${code}`,
                );
            }
        },
        onError: (err: any) => {
            handelError(err, setError, [
                'product_template_critical_path',
                'qa',
                'packaging',
            ]);
        },
    });

    const updateProduction = useMutation({
        mutationFn: data => Api.manufacture.updateProduction(code, data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your message has been successfully sent.',
            );
            if (data.status === 'Ready for QA') {
                navigate(`/manufacture/production/qa?production_code=${code}`);
            } else if (data.status === 'Ready for Packaging') {
                navigate(
                    `/manufacture/production/packaging?production_code=${code}`,
                );
            } else if (
                data.status === 'Open' ||
                data.status === 'In Progress'
            ) {
                navigate(
                    `/manufacture/production/define?production_code=${code}`,
                );
            }
        },
        onError: (err: any) => {
            handelError(err, setError, [
                'product_template_critical_path',
                'qa',
                'packaging',
            ]);
        },
    });

    const onSubmitHandler: SubmitHandler<any> = async (data, e) => {
        clearErrors();
        e?.preventDefault();

        const dataForm = normalized.production.insertPackage(data, code);
        if (!!code) {
            await updateProduction.mutateAsync(dataForm);
        } else {
            await createProduction.mutateAsync(dataForm);
        }
    };

    useKeyPress(['esc'], e => {
        setOpen(true);
    });

    useEffect(() => {
        if (listData) {
            reset(listData);
        }
    }, [listData, reset]);

    const handelReset = (obj: any) => {
        const resetObj = obj ? cleanObject(obj) : cleanObject(watch());
        if (pathname) {
            const path = FindStepFristPath(pathname);
            navigate(`${path}/define`);
        }
        setOpen(false);

        reset(resetObj);
    };

    //-------------- handle button Print Label for qa -------
    const Watch_qa_approval = watch('qa_approval');
    const urlPrintLabelQa = '/api/manufacture/qa_label_print';
    const handleGeneratorPDF = useMutation({
        mutationFn: (url: string) =>
            Api.print.GeneratorLinkPrint(`${url}/${code}`),
        onSuccess: ({ data }) => {
            toast.success('print successfully');
            printJS({
                printable: data.file,
                type: 'pdf',
                base64: true,
            });
        },
        onError: (error: any) => {
            if (!!error?.response?.status)
                toast.error(`The ${error?.response?.status} error indicates`);
        },
    });
    //--------------- end ------

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'template',
                isAutoCompleteInitializer: true,
            },
            {
                name: 'customer',
                editable: watchPrivateLabel,
            },
            {
                name: 'production_code',
                isAutoCompleteInitializer: true,
                editable: !code,
            },
            {
                name: 'total_capacity_value',
                customError: errorTotalCapacityValue,
            },
            {
                name: 'qa_label_print',
                isLoadingButton: handleGeneratorPDF.isLoading,
                onClick: () => {
                    if (!!code) {
                        return handleGeneratorPDF.mutateAsync(urlPrintLabelQa);
                    }
                },
            },
        ]);
    }, [code, watchPrivateLabel, errorTotalCapacityValue, Watch_qa_approval]);

    return (
        <ExitWarningWrapper iqnoreOpen={!open}>
            <Form
                display="flex"
                flexDirection="column"
                openModal={open}
                closeModal={() => setOpen(false)}
                reset={() => handelReset(listData)}
            >
                <ActionBar
                    save={handleSubmit(onSubmitHandler)}
                    reset={() => setOpen(true)}
                    printURL={
                        code
                            ? `/api/manufacture/get_production_excel_report/${code}`
                            : null
                    }
                />
                <WrapperLoading
                    isLoading={handleGeneratorPDF.isLoading}
                    isError={false}
                    type="circular"
                >
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
                </WrapperLoading>
            </Form>
        </ExitWarningWrapper>
    );
};

export default FormGeneration;
