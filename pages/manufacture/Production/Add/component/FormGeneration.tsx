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
    calculateEndDate,
    FindStepFristPath,
    formatErrorMessage,
    handelError,
} from 'utils/utils';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import ActionBar from 'component/ActionBar';
import UseDisplayBtnActionBar from 'utils/hooks/useDisplayBtnActionBar';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { normalized } from 'api/Normalized';
import UseFile from 'utils/hooks/useFile';
import ExitWarningWrapper from '../../../../../utils/hooks/ExitWarningWrapper';

interface OwnProps {
    fields: Field[];
    listData?: any;
    setDefaultValues?: any;
    reGenerateBatchNumber?: () => void;
    batchNumber?: number | string;
}

type Props = OwnProps;

interface ILotNumber {
    code: string | null;
    startDate: string | null;
}

const FormGeneration: FunctionComponent<Props> = ({
    fields = [],
    listData,
    setDefaultValues,
    reGenerateBatchNumber,
    batchNumber,
}) => {
    const {
        handleSubmit,
        reset,
        watch,
        setValue,
        setError,
        clearErrors,
        getValues,
        formState: { errors },
    } = useFormContext();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [searchParams] = useSearchParams();
    const code = searchParams.get('production_code');
    const templateId = searchParams.get('template');

    const [open, setOpen] = useState(false);
    const [prCode, setPrCode] = useState('');
    const [lotNumber, setLotNumber] = useState<ILotNumber>({
        code: null,
        startDate: null,
    });

    // handle File
    const setFilesId = UseFile();
    //=

    const watchStartDate = watch('start_date');
    const watchProductionCode = watch('production_code');
    const watchPrivateLabel = watch('private_label');
    const watchFormulaVolume = watch('formula_volume');
    const watchProductionVolume = watch('production_volume');
    const watchCriticalPath = watch('product_template_critical_path');
    const watchDurability = watch('durability');
    const watchApproval = watch('approval');
    const watchStatus = watch('status');
    const watchTemplate = watch('template');
    const watchMakeAllDone = watch('make_all_phases_done');
    const watchCustomer = watch('customer');

    const [templeteId, setTempleteId] = useState(null);
    useEffect(() => {
        if (!!watchTemplate?.id) {
            setTempleteId(watchTemplate.id);
        }
    }, [watchTemplate]);
    const { data: formulaInfo } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['template', watchTemplate],
        queryFn: () => Api.manufacture.getFormulaInfo(templeteId),
        enabled: !!templeteId,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    const updateArrayDone = (arr?: any) => {
        const newArr: any =
            Array.isArray(watchCriticalPath) &&
            watchCriticalPath.map((item: any) => {
                return {
                    ...item,
                    phase_status: 'Done',
                };
            });
        return newArr;
    };

    useEffect(() => {
        const arr = watchCriticalPath;
        const newArr = updateArrayDone(arr);
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
        const arr = watchCriticalPath;
        const newArr = updateArrayDone(arr);
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

    const setQuantity = (
        ProductionVolume: number | string,
        FormulaVolume: number | string,
    ) => {
        if (ProductionVolume && FormulaVolume) {
            const crossVar = +ProductionVolume / +FormulaVolume;
            const BaseFormCriticalPath =
                watchStatus === 'Open' && !!code
                    ? listData?.temp_product_template_critical_path
                    : listData.product_template_critical_path;

            const newArr =
                Array.isArray(BaseFormCriticalPath) &&
                BaseFormCriticalPath.map((i: any) => {
                    return {
                        ...i,
                        product_template_raw_material:
                            i.product_template_raw_material &&
                            i.product_template_raw_material.map((item: any) => {
                                const num = +item.quantity * crossVar;
                                return {
                                    ...item,
                                    quantity: num.toFixed(3),
                                };
                            }),
                    };
                });
            setValue('product_template_critical_path', newArr);
            // reset({ product_template_critical_path: newArr });
        }
    };

    useEffect(() => {
        if (watchStartDate && !code && watchDurability) {
            const startDate = new Date(watchStartDate);
            const expDate = calculateEndDate(startDate, watchDurability);
            setValue('expiration_date', expDate);
        } else {
            setValue('expiration_date', null);
        }
    }, [watchStartDate]);

    useEffect(() => {
        if (!code && watchStartDate) {
            const dateFormat =
                watchStartDate && watchStartDate.replace(/-/g, '');
            setLotNumber(prevState => ({
                ...prevState,
                startDate: dateFormat,
            }));
            setLotNumber(prevState => ({
                ...prevState,
                code: watchProductionCode,
            }));
        }
    }, [watchStartDate, watchProductionCode]);

    useEffect(() => {
        const { code: codeLotNumber, startDate } = lotNumber;

        if (codeLotNumber && startDate) {
            setValue('lot', codeLotNumber + startDate);
        }
    }, [lotNumber, setValue]);

    useEffect(() => {
        if (listData) {
            if (code) {
                reset({ ...listData });
            } else {
                // reset({ ...listData, production_code: prCode });
            }
        }
    }, [code, listData, prCode, reset]);

    useEffect(() => {
        if (!code) {
            setPrCode(watchProductionCode);
            setLotNumber(prevState => ({
                ...prevState,
                code: watchProductionCode,
                startDate: dayjs().format('YYYY-MM-DD').replace(/-/g, ''),
            }));
        }
    }, [watchProductionCode]);
    const { GridsListSlice }: any = useSelector(state => state);
    useEffect(() => {
        if (GridsListSlice?.rows?.production_define_packaging) {
            setValue(
                'packaging',
                GridsListSlice?.rows?.production_define_packaging.map(
                    (item: any) => {
                        return {
                            ...item,
                            produced_qty: !!item.data?.produced_qty
                                ? Number(item.data?.produced_qty)
                                : null,
                            requested_qty: !!item.data?.requested_qty
                                ? Number(item.data?.requested_qty)
                                : null,
                        };
                    },
                ),
            );
            // because the name of grid in that modal which open with packaging button is
            // "production_define_packaging" if we don't setValue for this name grid
            // will be empty next time we open the modal
            setValue(
                'production_define_packaging',
                GridsListSlice?.rows?.production_define_packaging.map(
                    (item: any) => {
                        return {
                            ...item,
                            produced_qty: !!item.data?.produced_qty
                                ? Number(item.data?.produced_qty)
                                : null,
                            requested_qty: !!item.data?.requested_qty
                                ? Number(item.data?.requested_qty)
                                : null,
                        };
                    },
                ),
            );
        }
    }, [GridsListSlice]);

    const createProduction = useMutation({
        mutationFn: data => Api.manufacture.insertProduction(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your message has been successfully sent.',
            );
            if (data.status === 'Ready for QA') {
                navigate(
                    `/manufacture/production/qa?production_code=${
                        data?.id || code
                    }`,
                );
            } else if (data.status === 'Ready for Packaging') {
                navigate(
                    `/manufacture/production/packaging?production_code=${
                        data?.id || code
                    }`,
                );
            } else if (
                data.status === 'Open' ||
                data.status === 'In Progress'
            ) {
                navigate(
                    `/manufacture/production/define?production_code=${
                        data?.id || code
                    }`,
                );
                // setTimeout(() => {
                // navigate(0);
                // }, 0);
            }
        },
        onError: (err: any) => {
            handelError(err, setError, []);
            // ----------------step 1) reGenerate batch number  when batch number  is not unique ------------------------
            const error = err?.response?.data;
            console.log(error, '-- err  --');
            if (Object.hasOwn(error, 'production_code')) {
                reGenerateBatchNumber?.();
            }
            // --------------- end of step 1 --------------------
        },
    });

    const updateProduction = useMutation({
        mutationFn: data =>
            Api.manufacture.updateProduction(code, data, {
                IGNORE_ERROR_RAISER: true,
            }),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your message has been successfully sent.',
            );

            // in packing modal👇
            // for change production_define_packaging grid to production_define_packaging_for_inprogress_status
            const attachments = data?.attachments?.length
                ? data.attachments.map((file: any) => file.id)
                : [];
            setDefaultValues({
                ...normalized.production.getDefine(data, true),
                attachments,
            });
            //= =

            if (data.status === 'Ready for QA') {
                navigate(
                    `/manufacture/production/qa?production_code=${
                        data?.id || code
                    }`,
                );
            } else if (data.status === 'Ready for Packaging') {
                navigate(
                    `/manufacture/production/packaging?production_code=${
                        data?.id || code
                    }`,
                );
            } else if (
                data.status === 'Open' ||
                data.status === 'In Progress'
            ) {
                setTimeout(() => {
                    navigate(
                        `/manufacture/production/define?production_code=${
                            data?.data?.id || code
                        }`,
                    );
                }, 0);
            }
        },
        onError: (err: any) => {
            handelError(err, setError, [], true);
        },
    });

    const onSubmitHandler: SubmitHandler<any> = async (data, e) => {
        clearErrors();

        // e?.preventDefault();
        const dataForm = normalized.production.insertDefine(data, code);
        console.log(dataForm, '-- data  --');
        if (!!code) {
            await updateProduction.mutateAsync(dataForm);
        } else {
            await createProduction.mutateAsync(dataForm);
        }
    };

    // ----------------step 2) reGenerate batch number  when batch number  is not unique ---
    useEffect(() => {
        console.log(
            watchProductionVolume,
            errors,
            '--watchProductionVolume   --',
        );
        if (
            !code &&
            !!batchNumber &&
            !!watchProductionCode &&
            batchNumber !== +watchProductionCode &&
            Object.hasOwn(errors.root || errors, 'production_code')
        ) {
            setValue('production_code', batchNumber);
            clearErrors();
            toast.warning(
                `Production Code Number not found. An automatic request has been
                            sent to the server, and the form has been
                            regenerated with a new ${batchNumber}`,
                { autoClose: 10000 },
            );
            const setTimeSendData = setTimeout(() => {
                handleSubmit(onSubmitHandler);
            }, 500);
            return () => clearTimeout(setTimeSendData);
        }
    }, [batchNumber]);
    // -------------------------------- end of batch number-----------

    useKeyPress(['esc'], e => {
        setOpen(true);
    });

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(code, 'pdf');
    //= ===================end=============👆

    const handelReset = (obj: any) => {
        const resetObj = obj ? cleanObject(obj) : cleanObject(watch());
        if (pathname) {
            const path = FindStepFristPath(pathname);
            navigate(`${path}/define`);
        }
        setOpen(false);

        reset(resetObj);
    };

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'product_template_critical_path',
                isAutoCompleteInitializer: true,
            },
            {
                name: 'mrp',
                choseDataIdForRequestGrid: code ? 'product_template.id' : 'id',
                passDataToQuery: {
                    production_factor:
                        +watchProductionVolume / +watchFormulaVolume,
                },
                disable:
                    !watchTemplate ||
                    !watchProductionVolume ||
                    !watchFormulaVolume,
            },

            {
                name: 'packaging_materials',
                disable: !watchProductionVolume,
                extraDataForModal: {
                    productionVolume: watchProductionVolume,
                },
            },
            {
                name: 'template',
                isAutoCompleteInitializer: true,
                editable: !code,
            },
            {
                name: 'customer',
                editable: watchPrivateLabel,
            },
            {
                name: 'production_volume',
                editable: watchStatus === 'Open' || listData?.status === 'Open',
                onBlur: (value: any) => {
                    if (value) {
                        setQuantity(value.target.value, watchFormulaVolume);
                    }
                },
            },
            {
                name: 'production_volume_uom',
                editable: watchStatus === 'Open' || listData?.status === 'Open',
            },
            {
                name: 'machine',
                editable: watchStatus === 'Open' || listData?.status === 'Open',
                onBlur: (id: number, allData: any) => {
                    if (allData) {
                        setValue('machine_volume', allData?.machine_volume);
                        setValue('production_volume', allData?.machine_volume);
                        setQuantity(
                            allData?.machine_volume,
                            watchFormulaVolume,
                        );
                    }
                },
            },
            {
                name: 'production_code',
                required: !!watchProductionCode,
                editable: !code,
                isAutoCompleteInitializer: true,
                onBlur: (id: number, allData: any, watchAllData: any) => {
                    if (allData && watchAllData)
                        setLotNumber(prevState => ({
                            ...prevState,
                            code: allData.code,
                        }));
                },
            },
            {
                name: 'attachments',
                setFilesId,
            },
            {
                name: 'packaging_materials',
                extraDataForModal: {
                    formula_template: watchTemplate,
                    customer: watchCustomer,
                    formulaInfo: formulaInfo?.data,
                    productionVolume: watchProductionVolume,
                },
            },
            {
                name: 'alert',
                default_value: formulaInfo?.data,
            },
        ]);
    }, [
        code,
        fields,
        setQuantity,
        setValue,
        watchFormulaVolume,
        watchPrivateLabel,
        watchProductionCode,
        watchTemplate,
        watchProductionVolume,
        setFilesId,
        watchTemplate,
        watchCustomer,
        formulaInfo?.data,
    ]);

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
