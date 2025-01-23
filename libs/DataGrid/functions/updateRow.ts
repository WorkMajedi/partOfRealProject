export const updateRow = ({
    index,
    newRow,
    setGridValue,
    name,
    apiRef,
}: {
    index: number;
    newRow: any;
    setGridValue: any;
    name: any;
    apiRef: any;
}) => {
    const id = apiRef.current.getRowIdFromRowIndex(index);
    apiRef.current.updateRows([{ rowId: id, index, ...newRow }]);
    Object.keys(newRow).forEach(key => {
        setGridValue(`_${index}_${name}_${key}`, newRow[key]);
    });
};
