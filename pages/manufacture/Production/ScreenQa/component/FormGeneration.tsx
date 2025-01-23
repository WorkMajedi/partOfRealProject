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
import { Form } from 'component/common';
import { Field } from 'types/type';
import { toast } from 'react-toastify';
import { overrideFields } from 'core/utils/overWrite';
import { cleanObject } from 'utils/CleanObject';
import { FindStepFristPath, handelError } from 'utils/utils';
import ActionBar from 'component/ActionBar';
import { useMutation } from 'react-query';
import { normalized } from 'api/Normalized';
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

    const [open, setOpen] = useState(false);

    const [searchParams] = useSearchParams();
    const code = searchParams.get('production_code');
    const watchPrivateLabel = watch('private_label');
    const watchMakeAllDone = watch('make_all_phases_done');
    const watchStatus = watch('status');
    const watchApproval = watch('qa_approval');

    const updateArrayDone = (arr: any) => {
        const newArr =
            Array.isArray(arr) &&
            arr.map((item: any) => {
                return {
                    ...item,
                    phase_status: 'Done',
                };
            });
        return newArr;
    };

    useEffect(() => {
        const grid = getValues('product_template_critical_path');
        const newArr = updateArrayDone(grid);
        if (watchMakeAllDone) {
            if (newArr) {
                setValue('product_template_critical_path', newArr);
            }
        }
        if (watchMakeAllDone && watchStatus !== 'Ready for QA') {
            setValue('status', 'Ready for QA');
        }
    }, [watchMakeAllDone]);

    useEffect(() => {
        const grid = getValues('product_template_critical_path');
        const newArr = updateArrayDone(grid);
        if (watchStatus === 'Ready for QA') {
            if (newArr) {
                setValue('product_template_critical_path', newArr);
            }
        }
        if (watchStatus === 'Ready for QA') {
            setValue('make_all_phases_done', true);
        }
    }, [watchStatus]);

    useEffect(() => {
        if (watchApproval) {
            setValue('status', 'Ready for Packaging');
        }
    }, [watchApproval]);

    const watchYieldField = watch('yield_field');
    const [errorYieldField, setErrorYieldField] = useState({
        error: false,
        message: '',
    });
    useEffect(() => {
        if (
            !!watchYieldField &&
            parseFloat(watchYieldField) !==
                parseFloat(getValues('production_volume'))
        ) {
            setErrorYieldField({
                error: true,
                message:
                    'The amount of Yield varies with the Production Volume.',
            });
        } else {
            setErrorYieldField({
                error: false,
                message: '',
            });
        }
    }, [watchYieldField, getValues]);

    const createProduction = useMutation({
        mutationFn: data => Api.manufacture.insertProduction(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            if (data.status === 'Ready for QA') {
                navigate(
                    `/manufacture/production/qa?production_code=${
                        code || data?.id
                    }`,
                );
            } else if (data.status === 'Ready for Packaging') {
                navigate(
                    `/manufacture/production/packaging?production_code=${
                        code || data?.id
                    }`,
                );
            } else if (
                data.status === 'Open' ||
                data.status === 'In Progress'
            ) {
                navigate(
                    `/manufacture/production/define?production_code=${
                        code || data?.id
                    }`,
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

        const dataForm = normalized.production.insertQa(data, code);

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

    const handelReset = (obj: any, isRedirect?: boolean) => {
        const resetObj = obj ? cleanObject(obj) : cleanObject(watch());
        if (pathname && isRedirect) {
            const path = FindStepFristPath(pathname);
            navigate(`${path}/define`);
        }
        setOpen(false);

        reset(resetObj);
    };

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
                name: 'yield_field',
                customError: errorYieldField,
            },
        ]);
    }, [code, watchPrivateLabel, errorYieldField]);

    return (
        <ExitWarningWrapper iqnoreOpen={!open}>
            <Form
                display="flex"
                flexDirection="column"
                openModal={open}
                closeModal={() => setOpen(false)}
                reset={() => handelReset(listData, false)}
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
