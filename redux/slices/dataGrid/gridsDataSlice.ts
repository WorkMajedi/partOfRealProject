import { createSlice, current } from '@reduxjs/toolkit';

const initialState: any = {
    pickQtyLot: 0,
};

const GridsListSlice = createSlice({
    name: 'gridsList',
    initialState,
    reducers: {
        addGrid: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    [action.payload.name]: {
                        rows: action.payload.rows,
                    },
                };
            }
        },
        updateGrid: (state, action) => {
            const currentRow = current(state)
                ? [...(current(state)[action.payload?.name]?.rows ?? [])]
                : [];
            const currentRowIndex = currentRow?.findIndex(
                (r: any) => r.id === action.payload?.row?.id,
            );
            currentRow?.splice(currentRowIndex, 1, action.payload.row);
            return {
                ...state,
                [action.payload?.name]: {
                    rows: currentRow,
                },
            };
        },
        productionDefinePackaging: (state, action) => {
            return {
                ...state,
                rows: action.payload,
            };
        },
        clearProductionDefinePackaging: state => {
            return {
                ...state,
                rows: null,
            };
        },
        saveRowData: (state, action) => {
            return {
                ...state,
                rowData: action.payload,
            };
        },
    },
});

export const {
    updateGrid,
    saveRowData,
    productionDefinePackaging,
    clearProductionDefinePackaging,
} = GridsListSlice.actions;

export default GridsListSlice.reducer;
