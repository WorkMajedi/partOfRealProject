type UseSaveGridRowsProps = {
    name: string;
    setFormContextValue: any;
    apiRef: any;
    deleteEmtyRows?: any;
    args?: any;
};
type SaveGridRowsProps = { deleteEmtyRows?: boolean } | any | undefined;
export const useSaveGridRows = (props: UseSaveGridRowsProps) => {
    const saveGridRows = (saveGridRowsProps: SaveGridRowsProps) => {
        if (saveGridRowsProps?.deleteEmtyRows) props.deleteEmtyRows();
        const rows = Array.from(
            props?.apiRef?.current?.getRowModels()?.values() ?? [],
        );
        props.setFormContextValue(props.name, rows);
    };
    return { saveGridRows };
};

// const rows = Array.from(
//     props?.apiRef?.current?.getRowModels()?.values(),
// );
// const filtrValidRows = rows.filter((r: any) => {
//     const { index, rowId, ...theRow } = r;
//     const condition = props.args?.critical_fields?.every(
//         (f: string) => !!theRow[f],
//     );
//     if (condition) return r;
// });
