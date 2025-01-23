import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
import SelectedComponent from 'core/component/selectedComponent/SelectedComponent';
import Api from 'api/api/services';
import { useKeyPress } from 'ahooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form } from 'component/common';
import { Field } from 'types/type';
import { AxiosError } from 'axios';
import { overrideFields } from 'core/utils/overWrite';
import { cleanObject } from 'utils/CleanObject';
import { FindStepFristPath, handelError } from 'utils/utils';
import ActionBar from 'component/ActionBar';
import UseDisplayBtnActionBar from 'utils/hooks/useDisplayBtnActionBar';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { normalized } from 'api/Normalized';
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
    const {
        handleSubmit,
        reset,
        watch,
        setValue,
        setError,
        clearErrors,
        formState: { isDirty, dirtyFields },
    } = useFormContext();
    const navigate = useNavigate();
    const { id: itemId } = useParams();
    const { pathname } = useLocation();

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState({
        division: '',
        department: '',
        class_obj: '',
        version: '',
        color: 'WHT',
    });

    // handle File
    const setFilesId = UseFile();
    //=

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(itemId, 'pdf');
    //= ===================end=============👆

    useEffect(() => {
        if (listData) reset(listData);
    }, [listData, reset]);

    const watchApproved = watch('approved');
    const watchDepartment = watch('department');
    const watchDivision = watch('division');
    const watchClassObj = watch('class_obj');
    const watchColorObj = watch('color');
    useEffect(() => {
        if (watchDepartment) {
            setCode(prevState => ({
                ...prevState,
                department: watchDepartment?.code,
            }));
        }
        if (watchClassObj) {
            setCode(prevState => ({
                ...prevState,
                class_obj: watchClassObj?.code,
            }));
        }
        if (watchDivision) {
            setCode(prevState => ({
                ...prevState,
                division: watchDivision?.code,
            }));
        }
    }, [watchDepartment, watchClassObj, watchDivision, watchColorObj]);

    const [generateCode, setGenerateCode] = useState<null | string>(null);
    const { isLoading: isLoadingFetchVersion } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['version_code', generateCode],
        queryFn: () => Api.manufacture.getVersionCode(generateCode),
        enabled: !!generateCode && !itemId,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            const nameCode = generateCode + data.next_version;
            setValue('version', data.next_version);
            setValue('code', nameCode);
        },
    });

    useEffect(() => {
        if (code.class_obj && code.color && code.department && code.division) {
            setGenerateCode(
                code.division + code.department + code.class_obj + code.color,
            );
        } else if (!itemId) {
            setValue('code', '');
        }
    }, [code, itemId, setValue, setGenerateCode]);

    useEffect(() => {
        setValue('active', watchApproved);
    }, [setValue, watchApproved]);

    const handelReset = (obj: any) => {
        const resetObj = obj ? cleanObject(obj) : cleanObject(watch());
        setOpen(false);
        setCode({
            division: '',
            department: '',
            class_obj: '',
            version: '',
            color: '',
        });
        reset({});
        if (pathname) {
            const path = FindStepFristPath(pathname);
            navigate(`${path}/add`);
        }
    };

    const createFormulaTemplate = useMutation({
        mutationFn: data => Api.manufacture.insertFormulaTemplate(data),
        onSuccess: ({ data }) => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
            navigate(`/manufacture/template/${data?.id}`);
        },
        onError: (err: any) => {
            handelError(
                err,
                setError,
                ['product_template_critical_path', 'qa'],
                false,
                {
                    product_template_critical_path:
                        'Formula Mixing Instructions',
                    product_template_raw_material: 'Phase Details',
                },
            );
        },
    });

    const updateFormulaTemplate = useMutation({
        mutationFn: data => Api.manufacture.updateFormulaTemplate(itemId, data),
        onSuccess: () => {
            toast.success(
                'Thank you! Your request has been successfully sent.',
            );
        },
        onError: (err: any) => {
            handelError(
                err,
                setError,
                ['product_template_critical_path', 'qa'],
                false,
                {
                    product_template_critical_path:
                        'Formula Mixing Instructions',
                    product_template_raw_material: 'Phase Details',
                },
            );
        },
    });

    function deleteProps(obj: any, prop: any[]) {
        for (const p of prop) {
            delete obj[p];
        }
    }

    const onSubmitHandler: SubmitHandler<any> = async (data, e) => {
        clearErrors();
        e?.preventDefault();
        const dataForm = normalized.template.insert(data, itemId);
        deleteProps(dataForm, ['unchangedResponse', 'approved_by']);
        console.log(dataForm, '-- temp dataForm  --');
        if (!!itemId) {
            await updateFormulaTemplate.mutateAsync(dataForm);
        } else {
            await createFormulaTemplate.mutateAsync(dataForm);
        }
    };

    useKeyPress(['esc'], e => {
        // ResetAllForm(listData, reset);
        setOpen(true);
        // handelReset();
    });

    useMemo(() => {
        if (!itemId) reset({});
    }, [itemId, reset]);

    const overWriteFieldForm: any = useCallback(() => {
        return overrideFields(fields, [
            {
                name: 'division',
                editable: !itemId,
                onBlur: (id: number, allData: any, watchAllData: any) => {
                    if (allData && watchAllData && !itemId)
                        setCode(prevState => ({
                            ...prevState,
                            division: allData?.code,
                        }));
                    if (allData) {
                        const { default_volume, default_volume_uom } =
                            allData || {};
                        if (default_volume) {
                            setValue('formula_volume', default_volume);
                        }
                        if (default_volume_uom) {
                            setValue('formula_volume_uom', default_volume_uom);
                        }
                    }
                },
            },
            {
                name: 'department',
                editable: !itemId,
                onBlur: (id: number, allData: any, watchAllData: any) => {
                    if (allData && watchAllData && !itemId)
                        setCode(prevState => ({
                            ...prevState,
                            department: allData?.code,
                        }));
                },
            },
            {
                name: 'class_obj',
                editable: !itemId,
                onBlur: (id: number, allData: any, watchAllData: any) => {
                    if (allData && watchAllData && !itemId)
                        setCode(prevState => ({
                            ...prevState,
                            class_obj: allData?.code,
                        }));
                },
            },
            {
                name: 'color',
                editable: !itemId,
                onBlur: (value: any) => {
                    if (value)
                        setCode(prevState => ({
                            ...prevState,
                            color:
                                typeof value === 'object' ? value?.code : value,
                        }));
                },
            },
            {
                name: 'version',
                editable: !itemId,
                onBlur: (e: any) => {
                    if (!itemId)
                        setCode(prevState => ({
                            ...prevState,
                            version: e.target.value,
                        }));
                },
                component_type: isLoadingFetchVersion ? 'Loading' : 'FieldText',
            },
            {
                name: 'code',
                editable: !itemId,
                initialFetch: 'code',
                component_type: isLoadingFetchVersion
                    ? 'Loading'
                    : 'AutoCompleteInitializer',
            },
            {
                name: 'attachments',
                setFilesId,
            },
        ]);
    }, [fields, itemId, isLoadingFetchVersion, setFilesId]);

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
                    printURL={`/api/manufacture/get_product_template_excel_report/${itemId}`}
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
