/* eslint-disable max-len */
import { useCallback, useState } from 'react';
import { GridCellParams } from '@mui/x-data-grid';
import { ComponentChooser } from '../types';
import { ComponentsList } from '../componentsList';

type UseInitializeColumnsProps = {
    columns: any;
    apiRef: any;
    name: string;
    setFormContextValue: any;
    components: any;
    register: any;
    updateCell: any;
    setGridValue: any;
    updateRow: any;
    saveGridRows: any;
    addable?: boolean;
    gridArgs: any;
};

export const useInitializeColumns = (props: UseInitializeColumnsProps) => {
    const [columns, setColumns] = useState([]);

    const initializeColumns = useCallback(() => {
        const componentsList: ComponentChooser = {
            ...ComponentsList,
            ...props.components,
        };

        const overWriteColumns = props.columns.map((c: any) => {
            // if (c.pinned_left) props.apiRef.current.pinColumn(c.name, 'left');
            // if (c.pinned_right) props.apiRef.current.pinColumn(c.name, 'right');
            return {
                ...c,
                default_value: c.default_value,
                editable: false,
                width: Number(c?.width) || 200,
                minWidth: c.args?.minWidth || 200,
                flex: c.args?.flex || 0,
                field: c.name,
                headerName: c.label,
                grid_name: props.name,
                renderCell: (params: GridCellParams) => {
                    if (componentsList && componentsList[c.component_type]) {
                        const C = componentsList[
                            c.component_type
                        ] as React.ElementType;
                        return (
                            <C
                                required={c.required}
                                gridArgs={props.gridArgs}
                                addable={props.addable}
                                register={props.register}
                                updateCell={props.updateCell}
                                updateRow={props.updateRow}
                                setGridValue={props.setGridValue}
                                saveGridRows={props.saveGridRows}
                                params={params}
                                apiRef={props.apiRef}
                                gridName={props.name}
                                inputProps={{
                                    ...props?.register(
                                        `_${props?.apiRef?.current.getRowIndexRelativeToVisibleRows(
                                            params.id,
                                        )}_${props?.name}_${c?.name}`,
                                    ),
                                    onChangeCapture: (
                                        event: React.FocusEvent<HTMLInputElement>,
                                    ) => {
                                        setTimeout(() => {
                                            props?.apiRef?.current?.updateRows([
                                                {
                                                    id: params.id,
                                                    index: props?.apiRef?.current?.getRowIndexRelativeToVisibleRows(
                                                        params.id,
                                                    ),
                                                    [params.field]:
                                                        event.target.value,
                                                },
                                            ]);
                                            props?.saveGridRows({});
                                        }, 60);
                                    },
                                    onBlur: (
                                        event: React.FocusEvent<HTMLInputElement>,
                                    ) => {
                                        props?.saveGridRows({});
                                        props?.apiRef?.current?.updateRows([
                                            {
                                                id: params.id,
                                                index: props?.apiRef?.current?.getRowIndexRelativeToVisibleRows(
                                                    params.id,
                                                ),
                                                [params.field]:
                                                    event.target.value,
                                            },
                                        ]);
                                    },
                                }}
                            />
                        );
                    }
                },
            };
        });

        props?.setFormContextValue(`${props?.name}_columns`, overWriteColumns);
        setColumns(overWriteColumns as never);
    }, [props.apiRef, props.columns, props.components, ComponentsList]);

    return { initializeColumns, columns };
};
