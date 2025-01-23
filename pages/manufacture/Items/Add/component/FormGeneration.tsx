/** @jsxImportSource @emotion/react */

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
import Api from 'api/api/services';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'component/common';
import { Field } from 'types/type';
import { Bounce, Flip, Slide, toast } from 'react-toastify';
import ActionBar from 'component/ActionBar';
import { useMutation, useQuery } from 'react-query';
import UseDisplayBtnActionBar from 'utils/hooks/useDisplayBtnActionBar';
import { overrideFields } from 'core/utils/overWrite';
import { handelError } from 'utils/utils';
import { normalized } from 'api/Normalized';
import UseFile from 'utils/hooks/useFile';
import { useSelector } from 'react-redux';
import {
    drawerWidth,
    drawerWidthClose,
} from '../../../../../layouts/DashBoard/component/DashBoard.styles';

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
    const {
        handleSubmit,
        watch,
        setValue,
        reset,
        setError,
        clearErrors,
        formState: { dirtyFields, isDirty },
    } = useFormContext();
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState({
        division: '',
        department: '',
        class_obj: '',
        version: '',
        color: '',
        extraText: '',
        isChanged: false,
    });
    const watchItemType = watch('item_type');
    const watchDepartment = watch('department');
    const watchDivision = watch('division');
    const watchClassObj = watch('class_obj');
    const watchMFGCode = watch('code');
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
        if (watchMFGCode) {
            const extraText =
                watchMFGCode.includes('_') &&
                watchMFGCode.slice(watchMFGCode.indexOf('_'));
            setCode(prevState => ({
                ...prevState,
                extraText: extraText || '',
            }));
        }
    }, [watchDepartment, watchClassObj, watchDivision, watchMFGCode]);
    const [generateCode, setGenerateCode] = useState<null | string>(null);
    const open_menu = useSelector(
        (store: any) => store?.MenuReducer?.toggleBtn,
    );
    const handleGenerateCodeMFG = useMutation({
        mutationFn: (text: string) => Api.manufacture.getVersionCode(text),
        onSuccess: ({ data }) => {
            const nameCode =
                code.division +
                code.department +
                code.class_obj +
                code.color +
                data.next_version +
                code.extraText;
            setCode(prevState => ({
                ...prevState,
                version: data.next_version,
            }));
            setGenerateCode(nameCode);
        },
        onError: (error: any) => {
            if (!!error?.response?.status)
                toast.error(`The ${error?.response?.status} error indicates`);
        },
    });
    useEffect(() => {
        const nameCode =
            code.division + code.department + code.class_obj + code.color;
        const CheckChangedCodes =
            listData?.code && listData?.code?.includes(nameCode);
        if (
            code.class_obj &&
            code.color &&
            code.department &&
            code.division &&
            !CheckChangedCodes
        ) {
            handleGenerateCodeMFG.mutateAsync(
                code.division + code.department + code.class_obj + code.color,
            );
        }
    }, [
        code.division,
        code.department,
        code.class_obj,
        code.color,
        code.isChanged,
    ]);
    useEffect(() => {
        if (!id) {
            if (listData && generateCode && listData?.code !== generateCode) {
                setValue('code', generateCode);
            }
        } else if (
            code.class_obj &&
            code.color &&
            code.department &&
            code.division &&
            code.version &&
            listData?.code !== generateCode
        ) {
            setValue('code', generateCode);
        }
    }, [id, generateCode]);
    useEffect(() => {
        if (listData) {
            setCode(prevState => ({
                ...prevState,
                color: listData.color?.code,
            }));
        }
    }, [listData]);
    // handle File
    const setFilesId = UseFile();
    //=

    //= show btn in action bar in some page👇
    UseDisplayBtnActionBar(id, 'pdf');
    //= ===================end=============👆

    const createItems = useMutation({
        mutationFn: data => Api.manufacture.insertManufactureItems(data),
        onSuccess: ({ data }) => {
            const formulaCode =
                code.division +
                code.department +
                code.class_obj +
                code.color +
                code.version;
            if (listData.code === watchMFGCode) {
                toast.success(
                    `Your Item Code Has Been Changed to ''${generateCode}'' .If You Want to Update the inventory of this Item You Should Create a Formula With This Code ''${formulaCode}''.`,
                    {
                        position: 'top-center',
                        style: {
                            // color: '#fff',
                            top: 70,
                            whiteSpace: 'pre-line',
                            width: `50%`,
                        },
                        hideProgressBar: true,
                        autoClose: false,
                        theme: 'colored',
                        transition: Slide,
                    },
                );
            } else {
                toast.success(
                    'Thank you! Your request has been successfully sent.',
                );
            }

            navigate(`/manufacture/items/${data.id}`);
        },
        onError: (err: any) => {
            handelError(err, setError, ['customer_discount_based_on_types']);
        },
    });

    const updateItems = useMutation({
        mutationFn: data => Api.manufacture.updateManufactureItems(id, data),
        onSuccess: () => {
            const formulaCode =
                code.division +
                code.department +
                code.class_obj +
                code.color +
                code.version;
            if (listData.code !== watchMFGCode) {
                toast.success(
                    `Your Item Code Has Been Changed to ''${generateCode}'' .If You Want to Update the inventory of this Item You Should Create a Formula With This Code ''${formulaCode}''.`,
                    {
                        position: 'top-center',
                        style: {
                            // color: '#fff',
                            top: 70,
                            // marginLeft: drawerWidth,
                            whiteSpace: 'pre-line',
                            width: `800px`,
                            fontWeight: 'bolder',
                            lineHeight: '30px',
                        },
                        hideProgressBar: true,
                        autoClose: false,
                        theme: 'colored',
                        transition: Slide,
                    },
                );
            } else {
                toast.success(
                    'Thank you! Your request has been successfully sent.',
                );
            }
            navigate(`/manufacture/items/${id}`, { replace: false });
        },
        onError: (err: any) => {
            handelError(err, setError, ['customer_discount_based_on_types']);
        },
    });

    const watchPrice = watch('price') || 0;
    const prevPriceRef = useRef<number>(listData?.price);
    useEffect(() => {
        if (typeof watchPrice !== 'string') {
            prevPriceRef.current = watchPrice;
        }
    }, [watchPrice]);

    const onSubmitHandler: SubmitHandler<any> = async data => {
        clearErrors();

        const dataForm = normalized.items.insert(data);
        dataForm.price = prevPriceRef.current;
        if (!!id) {
            await updateItems.mutateAsync(dataForm);
        } else {
            await createItems.mutateAsync(dataForm);
        }
    };
    // //=Socket Block: block user  in some page👇
    // const { type, isBlock, closeConnectionSocket } = useSocketBlock({
    //     type: 'item',
    //     id: id,
    //     location,
    //     disBlocking: () => {
    //         navigate('/manufacture/items/add');
    //         setTimeout(() => {
    //             navigate(0);
    //         });
    //     },
    // });
    // //= ===================end=============👆

    const handelReset = async () => {
        // await closeConnectionSocket();
        reset(listData);
    };

    const handleNavigateToEdit = useCallback(
        (itemId: number) => {
            navigate(`/manufacture/items/${itemId}`);
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
                name: 'attachments',
                setFilesId,
            },
            {
                name: 'division',
                onBlur: (id: number, allData: any, watchAllData: any) => {
                    if (allData && watchAllData)
                        setCode(prevState => ({
                            ...prevState,
                            division: allData?.code,
                            isChanged: true,
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
                onBlur: (id: number, allData: any, watchAllData: any) => {
                    if (allData && watchAllData)
                        setCode(prevState => ({
                            ...prevState,
                            department: allData?.code,
                            isChanged: true,
                        }));
                },
            },
            {
                name: 'class_obj',
                onBlur: (id: number, allData: any, watchAllData: any) => {
                    if (allData && watchAllData)
                        setCode(prevState => ({
                            ...prevState,
                            class_obj: allData?.code,
                            isChanged: true,
                        }));
                },
            },
            {
                name: 'color',
                onBlur: (value: any) => {
                    if (value)
                        setCode(prevState => ({
                            ...prevState,
                            isChanged: true,
                            color:
                                typeof value === 'object' ? value?.code : value,
                        }));
                },
            },
            {
                name: 'item_vendors',
                component_type:
                    watchItemType?.toLowerCase() === 'Purchased'.toLowerCase()
                        ? '#GridEditableStatic'
                        : '',
            },
        ]);
    }, [id, handleNavigateToEdit, fields, watchItemType]);

    return (
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
                {overWriteFieldForm()?.map((field: Field, index: number) => {
                    return (
                        <SelectedComponent
                            key={index.toString()}
                            field={field}
                        />
                    );
                })}
            </Grid>
        </Form>
    );
};

export default FormGeneration;
