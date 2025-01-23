/* eslint-disable no-nested-ternary */
import { Avatar, Grid } from '@mui/material';
import GridCheckBox from '../components/GridCheckBox';
import GridDatePicker from '../components/GridDatePicker';
import GridDateRange from '../components/GridDateRange';
import GridSwitch from '../components/GridSwitch';
import CustomTextField from '../components/TextField';
import GridSelect from '../components/GridSelect';
import GridAutoComplete from '../components/GridAutoComplete';
import { ComponentChooser } from '../types';
import GridActionsBtn from '../components/GridActionsBtn';
import GridAutoCompleteMultiRequest from '../components/GridAutoCompleteMultiRequest';
import { addNewRow } from '../functions';
import GridStatusTextField from '../components/GridStatusTextField';
import GridLabel from '../components/GridLabel';
import GridFieldCurrency from '../components/GridFieldCurrency';
import GridSequence from '../components/GridSequence';
import GridLabelDate from '../components/GridLabelDate';
import GridLabelStatus from '../components/GridLabelStatus';

export const ComponentsList: ComponentChooser = {
    GridCurrency: ({ inputProps, params, ...restParams }: any) => {
        return (
            <GridFieldCurrency
                inputProps={inputProps}
                params={params}
                disabled={params?.colDef?.disable}
                {...restParams}
            />
        );
    },
    GridLabelCurrency: ({ inputProps, params, ...restParams }: any) => {
        return (
            <GridFieldCurrency
                inputProps={inputProps}
                params={params}
                disabled
                {...restParams}
            />
        );
    },
    GridImage: ({ params }: any) => {
        return <Avatar src={params.value} variant="square" />;
    },
    GridSimple: ({
        inputProps,
        params,
        apiRef,
        register,
        gridName,
        ...restParams
    }: any) => {
        if (params?.colDef?.args?.incremental_number) {
            return (
                <GridSequence
                    apiRef={apiRef}
                    params={params}
                    inputProps={inputProps}
                    {...restParams}
                />
            );
        }

        return (
            <CustomTextField
                inputProps={{
                    ...inputProps,
                    placeholder: !params.editable ? params.value : '',
                    defaultValue: !params.editable ? params.value : '',
                }}
                params={params}
                defaultValue={!params.editable ? params.value : ''}
                placeholder={!params.editable ? params.value : ''}
                inputType={params?.colDef?.args?.type || 'text'}
                {...restParams}
            />
        );
    },
    GridCheckbox: ({ inputProps, params }: any) => {
        return (
            <GridCheckBox
                params={params}
                label="checkbox"
                size={15}
                inputProps={{ ...inputProps }}
            />
        );
    },
    GridSwitch: ({ inputProps, ...restProps }: any) => {
        return (
            <Grid width="100%" display="flex" justifyContent="center">
                <GridSwitch inputProps={{ ...inputProps }} {...restProps} />
            </Grid>
        );
    },
    GridDatePicker: ({ inputProps, ...restProps }: any) => {
        return <GridDatePicker inputProps={{ ...inputProps }} {...restProps} />;
    },
    GridDateTimePicker: ({ inputProps, ...restProps }: any) => {
        return (
            <GridDatePicker
                time
                inputProps={{ ...inputProps }}
                {...restProps}
            />
        );
    },
    GridDateRangePicker: ({ inputProps }: any) => {
        return <GridDateRange inputProps={{ ...inputProps }} />;
    },
    GridDropDownStatic: ({
        params,
        inputProps,
        saveGridRows,
        ...restProps
    }: any) => {
        return (
            <GridSelect
                params={params}
                saveGridRows={saveGridRows}
                inputProps={{ ...inputProps }}
                options={params.colDef.args?.choices.map((i: string) => ({
                    value: i,
                    label: i,
                }))}
                default_value={params?.colDef?.default_value}
                {...restProps}
            />
        );
    },
    GridDropDownDynamic: ({ params, inputProps }: any) => {
        return <GridSelect params={params} inputProps={{ ...inputProps }} />;
    },
    GridAutoComplete: ({
        params,
        inputProps,
        saveGridRows,
        apiRef,
        ...restProps
    }: any) => {
        return (
            <GridAutoComplete
                saveGridRows={saveGridRows}
                inputProps={{ ...inputProps }}
                endPoint={params.colDef.args?.search_url}
                autoFill={!!params.colDef.args?.autoFill}
                params={params}
                apiRef={apiRef}
                rowIndex={apiRef?.current.getRowIndexRelativeToVisibleRows(
                    params.id,
                )}
                item={{
                    name: params.colDef.name,
                    label: params.colDef.headerName,
                }}
                displayKeys={params.colDef.args?.keys || []}
                {...restProps}
            />
        );
    },
    GridAutoCompleteMultiRequest: ({
        params,
        inputProps,
        ...restProps
    }: any) => {
        return (
            <GridAutoCompleteMultiRequest
                inputProps={{ ...inputProps }}
                endPoint={params.colDef.args?.search_url}
                second_url={params.colDef.args?.second_url}
                autoFill={!!params.colDef.args?.autoFill}
                params={params}
                item={{
                    name: params.colDef.name,
                    label: params.colDef.headerName,
                }}
                {...restProps}
            />
        );
    },
    GridStatus: ({
        inputProps,
        params,
        apiRef,
        register,
        gridName,
        ...restParams
    }: any) => {
        return (
            <GridStatusTextField
                inputProps={{
                    ...inputProps,
                }}
                params={params}
                {...restParams}
            />
        );
    },
    GridLabel: ({ inputProps, params, ...rest }: any) => {
        return <GridLabel inputProps={inputProps} {...params} {...rest} />;
    },
    GridLabelStatus: ({ inputProps, params, ...rest }: any) => {
        return (
            <GridLabelStatus inputProps={inputProps} {...params} {...rest} />
        );
    },
    GridLabelDate: ({ inputProps, params, ...rest }: any) => {
        return <GridLabelDate inputProps={inputProps} {...params} {...rest} />;
    },
    // TODO: should sepreate from gridlabel
    GridLink: ({ params }: any) => {
        return params.colDef.args.target === 'tab' ? (
            <a href={params.colDef.args.url} target="_blank" rel="noreferrer">
                go to
            </a>
        ) : params.colDef.args.target === 'download' ? (
            <a href={params.colDef.args.url} download>
                download
            </a>
        ) : (
            <GridLabel {...params} type={params?.colDef?.args?.target?.type} />
        );
    },
    GridAction: ({
        params,
        apiRef,
        setGridValue,
        saveGridRows,
        gridName,
        addable,
        gridArgs,
        ...restProps
    }: any) => {
        return (
            <GridActionsBtn
                gridArgs={gridArgs}
                addable={addable}
                onDelete={() => {
                    apiRef.current.updateRows([
                        { rowId: params.id, _action: 'delete' },
                    ]);
                    saveGridRows({});
                    Object.keys(params.row).map(r => {
                        setGridValue?.(
                            `_${apiRef.current.getRowIndexRelativeToVisibleRows(
                                params.id,
                            )}_${gridName}_${r}`,
                            '',
                        );
                    });
                    saveGridRows({});
                }}
                addRow={() => {
                    addNewRow({
                        addable,
                        setGridValue,
                        apiRef,
                    });

                    Object.keys(params.row).map(r => {
                        setGridValue(
                            `_${
                                apiRef.current.getRowIndexRelativeToVisibleRows(
                                    params.id,
                                ) + 1
                            }_${gridName}_${r}`,
                            '',
                        );
                    });
                }}
                setGridValue={setGridValue}
                apiRef={apiRef}
                colDef={params.colDef}
                id={params.id}
                rowItemId={params.row.id}
                saveGridRows={saveGridRows}
                rowData={params.row}
            />
        );
    },
};
