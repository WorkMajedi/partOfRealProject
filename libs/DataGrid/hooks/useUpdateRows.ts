import { useCallback } from 'react';

type UseUpdateRowsProps = {
    apiRef: any;
};

export const useUpdateRows = (props: UseUpdateRowsProps) => {
    const updateRow = useCallback(
        ({ index, newRow }: { index: number; newRow: any }) => {
            const id = props.apiRef.current.getRowIdFromRowIndex(index);
            props.apiRef.current.updateRows([{ id, ...newRow }]);
        },
        [props.apiRef],
    );
    return { updateRow };
};
