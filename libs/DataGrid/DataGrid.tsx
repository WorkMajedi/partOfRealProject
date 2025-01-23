/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React, {
    FunctionComponent,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import {
    useGridApiRef,
    GridCellParams,
    DataGridPro as MuiDataGrid,
    MuiEvent,
    GridCallbackDetails,
} from '@mui/x-data-grid-pro';
import { CustomButton } from 'component/common';
import { Box, Typography } from '@mui/material';
import { useKeyPress } from 'ahooks';
import { useSelector } from 'react-redux';
import { StyledDataGrid } from './styles';
import { DataGridCodeProps } from './types';

import { addNewRow } from './functions';
import {
    useInitializeColumns,
    useSaveGridRows,
    useValidateGrid,
} from './hooks';

const DataGridCore: FunctionComponent<DataGridCodeProps> = props => {
    const apiRef = useGridApiRef();

    const { setValue: setFormContextValue, getValues: getFormContextValues } =
        useFormContext();

    const [rows, setRows] = useState(
        getFormContextValues(props.name) || props.rows || [],
    );

    const open = useSelector((state: any) => state?.MenuReducer?.toggleBtn);

    useValidateGrid({
        name: props.name,
    });

    const { register, setValue: setGridValue } = useForm({
        mode: 'onBlur',
    });

    const deleteEmtyRows = () => {
        const validRows = rows.filter((r: any) => {
            const { index, rowId, ...theRow } = r;
            const condition = props.args?.critical_fields?.some(
                (f: string) => !!theRow[f],
            );

            if (condition) return r;
            apiRef.current.updateRows([
                {
                    rowId,
                    _action: 'delete',
                },
            ]);
            Object.keys(r).map(r => {
                setGridValue(
                    `_${apiRef.current.getRowIndexRelativeToVisibleRows(
                        rowId,
                    )}_${props.name}_${r}`,
                    '',
                );
            });
        });

        setRows(validRows);
        return validRows;
    };

    const { saveGridRows } = useSaveGridRows({
        apiRef,
        name: props.name,
        setFormContextValue,
        deleteEmtyRows,
        args: props.args,
    });

    const updateRow = ({ index, newRow }: { index: number; newRow: any }) => {
        const id = apiRef.current.getRowIdFromRowIndex(index);
        apiRef.current.updateRows([{ rowId: id, index, ...newRow }]);
        Object.keys(newRow).forEach(key => {
            setGridValue(`_${index}_${props.name}_${key}`, newRow[key]);
        });
    };

    const updateCell = ({ rowId, field, value }: any) => {
        const rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(rowId);
        apiRef.current.setEditCellValue({ id: rowId, field, value });
        setGridValue(`_${rowIndex}_${props.name}_${field}`, value);
    };

    const { initializeColumns, columns } = useInitializeColumns({
        apiRef,
        columns: props.columns,
        addable: props.addable,
        register,
        name: props.name,
        updateRow,
        updateCell,
        setGridValue,
        setFormContextValue,
        components: props.components,
        saveGridRows,
        gridArgs: props.args,
    });

    useEffect(() => {
        initializeColumns();
    }, [apiRef, initializeColumns, rows.length]);

    useEffect(() => {
        if (rows.length === 0) {
            if (props.height) {
                Array.from(Array(+props.height || 1).keys()).map(_r => {
                    addNewRow({
                        addable: props.addable,
                        apiRef,
                        firstTime: true,
                        setGridValue,
                    });
                });
            } else {
                addNewRow({
                    addable: props.addable,
                    apiRef,
                    firstTime: true,
                    setGridValue,
                });
            }
        }
    }, [apiRef, rows.length]);

    useEffect(() => {
        apiRef.current.subscribeEvent('cellClick', x => {
            if ((x.colDef as any)?.component_type === 'GridSimple') {
                updateRow({
                    index: apiRef.current.getRowIndexRelativeToVisibleRows(
                        x.id,
                    ),
                    newRow: x.row,
                });
            }
        });
        if (getFormContextValues(props.name)) {
            setRows(getFormContextValues(props.name));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getFormContextValues(props.name), props.name]);

    useEffect(() => {
        if (rows.length === 0 && props.rows.length > 0) {
            setRows(props.rows);
        }
    }, [props.rows, rows.length]);

    function focusNextElement(
        allRows: any,
        rowIndex: number,
        cellIndex = 0,
    ): any {
        if (rowIndex > 20 && rowIndex > 20) return null;
        const nextCellInput = allRows[rowIndex]?.querySelectorAll('input');
        if (
            nextCellInput &&
            nextCellInput[cellIndex] &&
            !nextCellInput[cellIndex]?.disabled
        ) {
            nextCellInput[cellIndex]?.click();
            return nextCellInput[cellIndex]?.focus();
        }
        if (cellIndex < 30) focusNextElement(allRows, rowIndex, cellIndex + 1);
    }

    useLayoutEffect(() => {
        document
            .querySelector('button#save')
            ?.addEventListener('mouseenter', event => {
                event.preventDefault();
                event.stopPropagation();
                const theRows = Array.from(
                    apiRef?.current?.getRowModels()?.values() || [],
                );
                const filtrValidRows = theRows.filter((r: any) => {
                    const { index, rowId, ...theRow } = r;
                    const condition = props.args?.critical_fields?.some(
                        (f: string) => !!theRow[f],
                    );
                    if (condition) return r;
                });
                setFormContextValue(props.name, filtrValidRows);
                // deleteEmtyRows();
                // setRows(filtrValidRows);
            });
    }, [
        apiRef,
        deleteEmtyRows,
        props.args?.critical_fields,
        props.name,
        setFormContextValue,
    ]);

    useKeyPress(['F9', 'alt.s'], () => {
        deleteEmtyRows();
        saveGridRows({});

        const allRows =
            apiRef.current?.rootElementRef?.current?.querySelectorAll(
                '.MuiDataGrid-virtualScrollerRenderZone [role="row"]',
            ) ?? [];

        const prevElementBeforGrid =
            allRows[0]?.closest('.MuiGrid-item')?.nextElementSibling;

        const nextInput: HTMLInputElement | null | undefined =
            prevElementBeforGrid?.querySelector(
                '.MuiInputBase-input:not(:disabled)',
            ) ?? prevElementBeforGrid?.querySelector('input:not(:disabled)');
        nextInput?.click();
        nextInput?.focus();
    });

    useEffect(() => {
        const pinnedColumnsObject: {
            left: string[];
            right: string[];
        } = {
            left: [],
            right: [],
        };
        columns.map((column: any) => {
            if (column.pinned_left) pinnedColumnsObject.left.push(column.name);
            if (column.pinned_right)
                pinnedColumnsObject.right.push(column.name);
        });
        apiRef.current.setPinnedColumns(pinnedColumnsObject);
    }, [columns]);
    console.log('render');
    // ---------------------------------- handle errors grid --------------------------------
    // useEffect(() => {
    //     const errors = props?.error?.listError || [];
    // }, [props.error, errorsForm]);
    // ------------------------- end handle error ------------------
    return (
        <Box>
            {/* <>
                <Typography variant="h2" py={3}>
                    {props.title}
                </Typography>
                <Grid component="form" container spacing={2}>
                    {columns.map((col: any) => {
                        return (
                            // @ts-ignore
                            <Grid item col={4}>
                                <TextField label={col.label} />
                            </Grid>
                        );
                    })}
                    <Grid item col={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Add Row
                        </Button>
                    </Grid>
                </Grid>

                <StyledDataGrid
                    onClick={() => {
                        saveGridRows({});
                    }}
                    width="100%"
                    height={
                        props.height
                            ? `${((props.height as number) + 2) * 52}px`
                            : 'initial'
                    }
                    sx={{
                        maxWidth: props.inModal
                            ? '100%'
                            : open
                                ? 'calc(100vw - 380px)'
                                : 'calc(100vw - 195px)',
                        mb: props.height ? 20 : 3.5,
                    }}
                >
                    <MuiDataGrid
                        autoHeight={!props.height}
                        apiRef={apiRef}
                        rows={rows}
                        columns={columns}
                        isRowSelectable={() => false}
                        getRowId={row => {
                            return row.rowId ?? row.guid ?? row?.id;
                        }}
                        initialState={{}}
                    />
                </StyledDataGrid>
                <hr />
            </> */}

            <StyledDataGrid
                onClick={(_event: React.MouseEvent) => {
                    if ((_event.target as HTMLInputElement)?.value) {
                        saveGridRows({});
                    }
                }}
                width="100%"
                height={
                    props.height
                        ? `${((props.height as number) + 2) * 52}px`
                        : 'initial'
                }
                sx={{
                    maxWidth: props.inModal
                        ? '100%'
                        : open
                            ? 'calc(100vw - 380px)'
                            : 'calc(100vw - 195px)',
                    mb: props.height ? 20 : 3.5,
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h2" py={3}>
                        {props.title}
                    </Typography>
                    {props.addable ? (
                        <CustomButton
                            onClick={() => {
                                addNewRow({
                                    addable: props.addable,
                                    apiRef,
                                    setGridValue,
                                });
                            }}
                        >
                            Add New Row
                        </CustomButton>
                    ) : (
                        ''
                    )}
                </Box>
                {Boolean(props?.error) &&
                    props?.helperText && ( // Display error message if there's an error
                        <Typography
                            className="errorText"
                            variant="body1"
                            color="red"
                            style={{
                                fontSize: 12,
                                // position: 'absolute',
                                whiteSpace: 'pre-line',
                                width: '100%',
                            }}
                        >
                            {`${props?.helperText}`}
                        </Typography>
                    )}
                <MuiDataGrid
                    autoHeight={!props.height}
                    apiRef={apiRef}
                    rows={rows}
                    columns={columns}
                    isRowSelectable={() => false}
                    getRowId={row => {
                        return row.rowId ?? row.guid ?? row?.id;
                    }}
                    sortingMode="server"
                    onCellClick={(
                        _params: GridCellParams<any>,
                        _event: MuiEvent<React.MouseEvent<HTMLElement>>,
                    ) => {
                        if ((_event.target as HTMLInputElement)?.value) {
                            saveGridRows({});
                        }
                    }}
                    initialState={{}}
                    onCellKeyDown={(
                        params: GridCellParams<any>,
                        event: MuiEvent<React.KeyboardEvent<HTMLElement>>,
                        _details: GridCallbackDetails,
                    ) => {
                        switch (event.code) {
                            case 'KeyS':
                                if (!event.altKey) return;
                                event.stopPropagation();
                                event.preventDefault();
                                const validRows = deleteEmtyRows();
                                setRows(validRows);
                                const allRows =
                                    apiRef.current?.rootElementRef?.current?.querySelectorAll(
                                        '.MuiDataGrid-virtualScrollerRenderZone [role="row"]',
                                    ) ?? [];

                                const prevElementBeforGrid =
                                    allRows[0]?.closest(
                                        '.MuiGrid-item',
                                    )?.nextElementSibling;

                                const nextInput:
                                    | HTMLInputElement
                                    | null
                                    | undefined =
                                    prevElementBeforGrid?.querySelector(
                                        '.MuiInputBase-input:not(:disabled)',
                                    ) ??
                                    prevElementBeforGrid?.querySelector(
                                        'input:not(:disabled)',
                                    ) ??
                                    prevElementBeforGrid?.querySelector(
                                        'button:not(:disabled)',
                                    );
                                nextInput?.click();
                                nextInput?.focus();
                                break;
                            case 'KeyI':
                                if (event.altKey) {
                                    event.preventDefault();
                                    (
                                        document.querySelector(
                                            `[id="details-${params.id}"]`,
                                        ) as HTMLElement
                                    )?.click();
                                }
                                break;
                            case 'ArrowDown':
                                if (
                                    (event.target as any)?.closest(
                                        '.MuiSelect-select',
                                    ) ||
                                    (event.target as any)?.closest(
                                        '.MuiAutocomplete-root',
                                    )
                                ) {
                                    event.defaultMuiPrevented = true;
                                    event.stopPropagation();
                                }
                                break;
                            case 'ArrowUp':
                                if (
                                    (event.target as any)?.closest(
                                        '.MuiSelect-select',
                                    ) ||
                                    (event.target as any)?.closest(
                                        '.MuiAutocomplete-root',
                                    )
                                ) {
                                    event.defaultMuiPrevented = true;
                                    event.stopPropagation();
                                }
                                break;
                            case 'ArrowLeft':
                                (() => {
                                    event.preventDefault();

                                    const allRows =
                                        apiRef.current?.rootElementRef?.current?.querySelectorAll(
                                            '.MuiDataGrid-virtualScrollerRenderZone [role="row"]',
                                        ) ?? [];

                                    if (
                                        event.target ===
                                        apiRef.current?.rootElementRef?.current?.querySelector(
                                            '[role="cell"] input:not(:disabled)',
                                        )
                                    ) {
                                        event.stopPropagation();
                                        const prevElementBeforGrid =
                                            allRows[0]?.closest(
                                                '.MuiGrid-item',
                                            )?.previousElementSibling;

                                        const prevInput:
                                            | HTMLInputElement
                                            | null
                                            | undefined =
                                            prevElementBeforGrid?.querySelector(
                                                '.MuiInputBase-input:not(:disabled)',
                                            ) ??
                                            prevElementBeforGrid?.querySelector(
                                                'input:not(:disabled)',
                                            );
                                        prevInput?.click();
                                        prevInput?.focus();
                                    }
                                })();

                                break;
                            case 'KeyN':
                                if (event.altKey) {
                                    addNewRow({
                                        addable: props.addable,
                                        apiRef,
                                        setGridValue,
                                    });
                                }
                                break;
                            case 'KeyD':
                                if (event.altKey) {
                                    Object.keys(params.row).map(r => {
                                        setGridValue(
                                            `_${apiRef.current.getRowIndexRelativeToVisibleRows(
                                                params.id,
                                            )}_${props.name}_${r}`,
                                            '',
                                        );
                                    });
                                    saveGridRows({});
                                    apiRef.current.updateRows([
                                        { rowId: params.id, _action: 'delete' },
                                    ]);
                                }
                                saveGridRows({});
                                break;
                            case 'Space':
                                // event.preventDefault();
                                event.defaultMuiPrevented = true;
                                // (event.target as any)?.parentElement.click();
                                break;
                            case 'Enter':
                            case 'ArrowRight':
                                if (event.altKey) {
                                    deleteEmtyRows();
                                    const allRows =
                                        apiRef.current?.rootElementRef?.current?.querySelectorAll(
                                            '.MuiDataGrid-virtualScrollerRenderZone [role="row"]',
                                        ) ?? [];
                                    const nextElementAfterGrid =
                                        allRows[0]?.closest(
                                            '.MuiGrid-item',
                                        )?.nextElementSibling;

                                    nextElementAfterGrid
                                        ?.querySelector('input')
                                        ?.focus();
                                    return;
                                }
                                saveGridRows({});
                                if (event.code === 'ArrowRight') {
                                    return null;
                                }
                                event.preventDefault();
                                (() => {
                                    let count: number = 0;
                                    function currentCellFinder(el: any): any {
                                        if (count === 60) return el;
                                        if (el?.role !== 'cell') {
                                            // eslint-disable-next-line no-plusplus
                                            count++;
                                            return currentCellFinder(
                                                el?.parentElement,
                                            );
                                        }
                                        return el;
                                    }

                                    const currentCell =
                                        currentCellFinder(
                                            event.target as HTMLElement,
                                        ) ??
                                        document.querySelector(
                                            `[name="_${params.row.index}_${
                                            // @ts-ignore
                                            params.colDef?.grid_name as any
                                            }_${params.colDef?.field as any}"]`,
                                        );

                                    const currentRow =
                                        currentCell?.parentElement ??
                                        document.querySelector(
                                            `[data-id="${params.rowNode.id}"]`,
                                        );

                                    const allRows =
                                        apiRef.current?.rootElementRef?.current?.querySelectorAll(
                                            '.MuiDataGrid-virtualScrollerRenderZone [role="row"]',
                                        ) ?? [];

                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        // Check Empty Cell!
                                        if (
                                            !(
                                                // +currentRow.dataset?.rowindex ===
                                                // allRows?.length - 1 &&
                                                (
                                                    allRows[
                                                        currentRow.dataset
                                                            ?.rowindex
                                                            ? Number(
                                                                currentRow
                                                                    .dataset
                                                                    ?.rowindex,
                                                            )
                                                            : params.row.index
                                                    ]?.querySelector(
                                                        'input:not(:disabled)',
                                                    ) ===
                                                    currentCell?.querySelector(
                                                        'input:not(:disabled)',
                                                    )
                                                )
                                            ) &&
                                            (params.colDef as any)?.required &&
                                            !currentCell?.querySelector('input')
                                                ?.value
                                        ) {
                                            currentCell
                                                ?.querySelector('input')
                                                ?.focus();
                                            currentCell?.classList?.add(
                                                'error',
                                            );
                                            return;
                                        }
                                    }

                                    currentCell.classList.remove('error');
                                    let nextCell =
                                        currentCell?.nextElementSibling;

                                    if (!nextCell) {
                                        if (
                                            (params.colDef as any)?.pinned_left
                                        ) {
                                            const nextNotPinnedRowsFirstCell =
                                                apiRef.current?.rootElementRef?.current?.querySelector(
                                                    `.MuiDataGrid-virtualScrollerRenderZone [data-id="${params.id}"] [role="cell"]`,
                                                );
                                            if (nextNotPinnedRowsFirstCell)
                                                nextCell =
                                                    nextNotPinnedRowsFirstCell;
                                        }
                                    }

                                    const nextCellInput = (cell: any): any => {
                                        if (count === 60)
                                            return cell?.nextElementSibling;
                                        count++;
                                        const nextCellTextField =
                                            cell?.querySelector(
                                                'input:not(:disabled)',
                                            );

                                        if (nextCellTextField)
                                            return nextCellTextField;
                                        return nextCellInput(
                                            cell?.nextElementSibling,
                                        );
                                    };

                                    // Handle Click on Latest Row
                                    if (
                                        +currentRow.dataset?.rowindex ===
                                        allRows?.length - 1
                                    ) {
                                        if (
                                            !currentCell?.querySelector('input')
                                                ?.disabled &&
                                            !(event.target as HTMLInputElement)
                                                ?.value
                                        ) {
                                            const nonEmptyRows = Array.from(
                                                apiRef?.current
                                                    ?.getRowModels()
                                                    ?.values(),
                                            ).filter((i: any) => {
                                                const condition =
                                                    props.args?.critical_fields?.some(
                                                        (f: string) => !!i[f],
                                                    );
                                                return condition;
                                            });

                                            setFormContextValue(
                                                props.name,
                                                nonEmptyRows,
                                            );

                                            const nextElementAfterGrid =
                                                allRows[0]?.closest(
                                                    '.MuiGrid-item',
                                                )?.nextElementSibling;

                                            nextElementAfterGrid
                                                ?.querySelector('input')
                                                ?.focus();

                                            if (!props.inModal) {
                                                const validRows =
                                                    deleteEmtyRows();
                                                setRows(validRows);
                                                saveGridRows({});
                                            }
                                            return;
                                        }
                                        if (event.key === 'Enter') {
                                            const nextCellInputElement =
                                                nextCellInput(nextCell);

                                            if (!nextCellInputElement)
                                                addNewRow({
                                                    addable: props.addable,
                                                    apiRef,
                                                    setGridValue,
                                                });
                                            (
                                                event.target as HTMLInputElement
                                            )?.focus();
                                        }
                                    }

                                    const nextCellInputElement =
                                        nextCellInput(nextCell);

                                    if (nextCellInputElement) {
                                        if (
                                            nextCellInputElement.classList.contains(
                                                'MuiSelect-nativeInput',
                                            )
                                        ) {
                                            nextCellInputElement?.click();
                                            nextCellInputElement?.parentElement?.click();
                                        } else {
                                            nextCellInputElement?.click();
                                            nextCellInputElement?.focus();
                                        }
                                    } else {
                                        focusNextElement(
                                            allRows,
                                            +currentRow.dataset?.rowindex + 1,
                                        );
                                    }
                                })();
                                saveGridRows({});
                                event.defaultMuiPrevented = true;
                                break;
                            default:
                                if (
                                    (event.target as HTMLElement)?.nodeName !==
                                    'INPUT'
                                ) {
                                    const cellInput = (
                                        event.target as HTMLDivElement
                                    )
                                        ?.closest('.MuiDataGrid-cell')
                                        ?.querySelector('input');
                                    cellInput?.focus();
                                }
                        }
                    }}
                    disableColumnResize={false}
                />
            </StyledDataGrid>
        </Box>
    );
};

export const DataGrid = React.memo(DataGridCore);
