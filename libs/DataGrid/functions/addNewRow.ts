type AddNewRowProps = {
    newRow?: any;
    apiRef: React.MutableRefObject<any>;
    at?: number;
    firstTime?: boolean;
    setGridValue?: any;
    addable?: boolean;
};

export const addNewRow = ({
    newRow,
    apiRef,
    at,
    firstTime,
    setGridValue,
    addable,
}: AddNewRowProps) => {
    // if (!addable) return null;
    const rowsLength = apiRef.current.getRowsCount();
    const id = rowsLength + 1 + Math.random();

    if (at) {
        apiRef.current.setRowIndex(id, at);
        apiRef.current.updateRows([
            {
                rowId: id,
                index: at,
                ...newRow,
            },
        ]);
    } else {
        apiRef.current.updateRows([
            {
                rowId: id,
                index: rowsLength,
                ...newRow,
            },
        ]);

        setTimeout(() => {
            const newRowInputs = document.querySelectorAll<HTMLInputElement>(
                `[data-id="${id}"] input:not(:disabled)`,
            );
            newRowInputs.forEach((input: HTMLInputElement) => {
                setTimeout(() => {
                    setGridValue(input.name, '');
                    input?.setAttribute('value', '');
                }, 50);
            });
        }, 5);

        if (!firstTime) {
            setTimeout(() => {
                const createdRow = document.querySelector(`[data-id="${id}"]`);
                const firstInput: HTMLInputElement | null | undefined =
                    createdRow?.querySelector('input:not(:disabled)');
                firstInput?.focus();
            }, 1);
        }
    }
};
