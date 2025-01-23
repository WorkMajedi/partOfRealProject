import { CircularProgress, SvgIcon } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openPopup } from 'redux/slices/managePopup/managePopupSlice';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Api } from 'api';
import printJS from 'print-js';
import { toast } from 'react-toastify';
import { useFormContext } from 'react-hook-form';
import { GridBtnBaseStyled, GridActionsWrapper } from './GridActionsBtn.styles';

export const GridDetailsBtn = ({
    id,
    icon,
    label,
    gridName,
    rowData,
    related_modal,
    saveGridRows,
    apiRef,
    setGridValue,
    gridArgs,
    dynamicQueryParams,
    filter,
}: any) => {
    const [, setSearchParams] = useSearchParams();
    const { getValues, watch } = useFormContext();
    const dispatch = useDispatch();

    return (
        <GridBtnBaseStyled
            id={`${label}-${id}`}
            onClick={() => {
                const dynamicQuerys = dynamicQueryParams;
                const filterObject = {};
                if (filter) {
                    // @ts-ignore
                    filterObject['filter-query'] = `${filter}-${rowData.id}`;
                }
                if (dynamicQuerys) {
                    let dynamicQueryString = ``;
                    const dynamicQueryKeys = Object.keys(dynamicQuerys);
                    dynamicQueryKeys?.forEach((item, index) => {
                        const splitedValue = dynamicQuerys[item]?.split('.');
                 
                        if (splitedValue?.length === 2) {
                            let getValue = (getValues(splitedValue[0]) ??
                                rowData[splitedValue[0]] ??
                                rowData)?.[splitedValue[1]];

                            if (
                                !getValues(splitedValue[0]) &&
                                splitedValue?.[1] === 'id' &&
                                `${rowData?.[splitedValue?.[1]]}`?.split(
                                    '.',
                                )?.[1]
                            ) {
                                getValue = rowData?.backendId;
                            }

                            if (getValue) {
                                dynamicQueryString += `${item}-${getValue}${index === dynamicQueryKeys?.length - 1
                                        ? ''
                                        : '+'
                                    }`;
                            }
                        } else {
                            const getValue =
                                getValues(dynamicQuerys[item]) ??
                                rowData[dynamicQuerys[item]];
                            if (getValue && item) {
                                dynamicQueryString += `${item}-${getValue}+`;
                            }
                        }
                    });

                    if (dynamicQueryString) {
                        setSearchParams({
                            'dynamic-query': dynamicQueryString,
                            ...filterObject,
                        });
                    } else {
                        setSearchParams({
                            ...filterObject,
                        });
                    }
                }

                if (related_modal) {
                    dispatch(
                        openPopup({
                            name: related_modal,
                            isOpen: true,
                            inModal: true,
                            state: {
                                gridArgs,
                                saveGridRows,
                                updateRow: ({ newRow }: any) => {
                                    const index =
                                        apiRef?.current?.getRowIndexRelativeToVisibleRows(
                                            id,
                                        );
                                    apiRef.current.updateRows([
                                        {
                                            rowId: id,
                                            index,
                                            ...newRow,
                                        },
                                    ]);
                                    Object.keys(newRow).forEach(key => {
                                        setGridValue(
                                            `_${index}_${gridName}_${key}`,
                                            newRow[key],
                                        );
                                    });
                                },
                                rowId: id,
                                row: apiRef?.current?.getRow(id),
                                rowIndex:
                                    apiRef?.current?.getRowIndexRelativeToVisibleRows(
                                        id,
                                    ),
                                grid: gridName,
                                label: gridName,
                            },
                        }),
                    );
                }
            }}
            hasMaterial={!!rowData?.product_template_raw_material?.length}
        >
            {icon}
            {label}
        </GridBtnBaseStyled>
    );
};
export const GridDeleteBtn = ({
    id,
    baseUrl,
    asyncDelete,
    handleOpenModal,
    ConfirmModalComponent = null,
    onDelete,
}: any) => {
    const { mutate, isLoading } = useMutation({
        mutationFn: () => Api.grid.deleteRow(`${baseUrl}${id}/`),
        onSuccess: () => {
            onDelete();
            toast.success('Record has been successfully deleted');
        },
        onError: (error: any) => {
            if (!!error?.response?.status)
                toast.error(`The ${error?.response?.status} error indicates`);
        },
    });

    return (
        <>
            {!!ConfirmModalComponent && (
                <ConfirmModalComponent onAccept={mutate} />
            )}
            <GridBtnBaseStyled
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onClick={(_e: any) => {
                    if (asyncDelete) {
                        return handleOpenModal();
                    }
                    onDelete();
                }}
            >
                {isLoading ? (
                    <CircularProgress size={15} />
                ) : (
                    <SvgIcon
                        viewBox="0 0 14 16"
                        sx={{
                            fontSize: 14.5,
                        }}
                    >
                        <path d="M5.5 12.5C5.69891 12.5 5.88968 12.421 6.03033 12.2803C6.17098 12.1397 6.25 11.9489 6.25 11.75V7.25C6.25 7.05109 6.17098 6.86032 6.03033 6.71967C5.88968 6.57902 5.69891 6.5 5.5 6.5C5.30109 6.5 5.11032 6.57902 4.96967 6.71967C4.82902 6.86032 4.75 7.05109 4.75 7.25V11.75C4.75 11.9489 4.82902 12.1397 4.96967 12.2803C5.11032 12.421 5.30109 12.5 5.5 12.5ZM13 3.5H10V2.75C10 2.15326 9.76295 1.58097 9.34099 1.15901C8.91903 0.737053 8.34674 0.5 7.75 0.5H6.25C5.65326 0.5 5.08097 0.737053 4.65901 1.15901C4.23705 1.58097 4 2.15326 4 2.75V3.5H1C0.801088 3.5 0.610322 3.57902 0.46967 3.71967C0.329018 3.86032 0.25 4.05109 0.25 4.25C0.25 4.44891 0.329018 4.63968 0.46967 4.78033C0.610322 4.92098 0.801088 5 1 5H1.75V13.25C1.75 13.8467 1.98705 14.419 2.40901 14.841C2.83097 15.2629 3.40326 15.5 4 15.5H10C10.5967 15.5 11.169 15.2629 11.591 14.841C12.0129 14.419 12.25 13.8467 12.25 13.25V5H13C13.1989 5 13.3897 4.92098 13.5303 4.78033C13.671 4.63968 13.75 4.44891 13.75 4.25C13.75 4.05109 13.671 3.86032 13.5303 3.71967C13.3897 3.57902 13.1989 3.5 13 3.5ZM5.5 2.75C5.5 2.55109 5.57902 2.36032 5.71967 2.21967C5.86032 2.07902 6.05109 2 6.25 2H7.75C7.94891 2 8.13968 2.07902 8.28033 2.21967C8.42098 2.36032 8.5 2.55109 8.5 2.75V3.5H5.5V2.75ZM10.75 13.25C10.75 13.4489 10.671 13.6397 10.5303 13.7803C10.3897 13.921 10.1989 14 10 14H4C3.80109 14 3.61032 13.921 3.46967 13.7803C3.32902 13.6397 3.25 13.4489 3.25 13.25V5H10.75V13.25ZM8.5 12.5C8.69891 12.5 8.88968 12.421 9.03033 12.2803C9.17098 12.1397 9.25 11.9489 9.25 11.75V7.25C9.25 7.05109 9.17098 6.86032 9.03033 6.71967C8.88968 6.57902 8.69891 6.5 8.5 6.5C8.30109 6.5 8.11032 6.57902 7.96967 6.71967C7.82902 6.86032 7.75 7.05109 7.75 7.25V11.75C7.75 11.9489 7.82902 12.1397 7.96967 12.2803C8.11032 12.421 8.30109 12.5 8.5 12.5Z" />
                    </SvgIcon>
                )}
            </GridBtnBaseStyled>
        </>
    );
};
export const GridEditBtn = ({ id }: any) => {
    const navigate = useNavigate();
    const route = useLocation();
    const parentRoute = route.pathname.split('/').slice(0, -1).join('/');
    return (
        <GridBtnBaseStyled
            onClick={(e: any) => {
                e.stopPropagation();
                navigate(`${parentRoute}/${id}`);
            }}
        >
            <SvgIcon
                viewBox="0 0 14 14"
                sx={{
                    fontSize: 14.5,
                }}
            >
                <path d="M8.54402 4.765L9.23402 5.455L2.43902 12.25H1.74902V11.56L8.54402 4.765ZM11.244 0.25C11.0565 0.25 10.8615 0.325 10.719 0.4675L9.34652 1.84L12.159 4.6525L13.5315 3.28C13.824 2.9875 13.824 2.515 13.5315 2.2225L11.7765 0.4675C11.6265 0.3175 11.439 0.25 11.244 0.25ZM8.54402 2.6425L0.249023 10.9375V13.75H3.06152L11.3565 5.455L8.54402 2.6425Z" />
            </SvgIcon>
        </GridBtnBaseStyled>
    );
};
export const GridPrintBtn = ({ rowData, printUrl }: any) => {
    const { mutate, isLoading } = useMutation({
        mutationFn: () => Api.manufacture.getReport(printUrl, rowData.id),
        onSuccess: async ({ data }) => {
            printJS({
                printable: data.file,
                type: 'pdf',
                base64: true,
            });
        },
    });
    return (
        <GridBtnBaseStyled onClick={() => mutate()}>
            {isLoading ? (
                <CircularProgress size={15} />
            ) : (
                <LocalPrintshopOutlinedIcon
                    sx={{
                        fontSize: 15.5,
                    }}
                />
            )}
        </GridBtnBaseStyled>
    );
};

export const GridAddBtn = ({ addRow }: any) => {
    return (
        <GridBtnBaseStyled onClick={addRow}>
            <SvgIcon
                viewBox="0 0 18 18"
                sx={{
                    fontSize: 14.5,
                }}
            >
                <path d="M14.25 9.75H9.75V14.25H8.25V9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75Z" />
            </SvgIcon>
        </GridBtnBaseStyled>
    );
};

export const GridCloneBtn = ({ rowData, baseUrl, gridName, onClone }: any) => {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: () => Api.grid.cloneRow(`${baseUrl}clone/${rowData.id}/`),
        onSuccess: async () => {
            toast.success('Record has been successfully cloned');
            onClone?.();
            return queryClient.invalidateQueries([gridName]);
        },
    });
    return (
        <GridBtnBaseStyled
            onClick={() => {
                mutate();
            }}
        >
            {isLoading ? (
                <CircularProgress size={15} />
            ) : (
                <FileCopyOutlinedIcon
                    sx={{
                        fontSize: 15,
                    }}
                />
            )}
        </GridBtnBaseStyled>
    );
};

export default function GridActionsBtn({
    colDef,
    id,
    rowData,
    onDelete,
    addRow,
    saveGridRows,
    apiRef,
    setGridValue,
    addable,
    gridArgs,
    rowItemId,
}: any) {
    const actions = colDef.args?.actions;
    const customActions = colDef.args?.custom_actions;
    return (
        <GridActionsWrapper>
            {customActions?.length
                ? customActions.map((actions: object, index: number) => (
                    <GridDetailsBtn
                        gridArgs={gridArgs}
                        apiRef={apiRef}
                        setGridValue={setGridValue}
                        key={`${index + id}`}
                        saveGridRows={saveGridRows}
                        id={id}
                        {...actions}
                        rowData={rowData}
                        gridName={colDef.grid_name}
                    />
                ))
                : null}
            {actions?.includes('delete') && (
                <GridDeleteBtn
                    onDelete={onDelete}
                    id={rowItemId}
                    rowData={rowData}
                    baseUrl={colDef.grid_url}
                    gridName={colDef.grid_name}
                    {...(colDef?.asyncDelete
                        ? {
                            asyncDelete: colDef?.asyncDelete,
                            handleOpenModal: colDef?.handleOpenModal,
                            ConfirmModalComponent:
                                colDef?.ConfirmModalComponent,
                        }
                        : {})}
                />
            )}
            {actions?.includes('edit') && (
                <GridEditBtn
                    id={id.length > 10 ? rowData.id : id}
                    rowData={rowData}
                />
            )}
            {actions?.includes('print') && (
                <GridPrintBtn
                    rowData={rowData}
                    printUrl={colDef.args?.printApi || ''}
                />
            )}
            {actions?.includes('add') && addable && (
                <GridAddBtn addRow={addRow} />
            )}
            {actions?.includes('clone') && (
                <GridCloneBtn
                    onClone={() => {
                        colDef.refetch?.();
                    }}
                    rowData={rowData}
                    baseUrl={colDef.grid_url}
                    gridName={colDef.grid_name}
                />
            )}
        </GridActionsWrapper>
    );
}
