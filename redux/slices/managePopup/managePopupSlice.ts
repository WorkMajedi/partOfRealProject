import { createSlice } from '@reduxjs/toolkit';

interface IPopup {
    name: string;
    isOpen: boolean;
    extraDataForModal?: any;
    urlId: string | number | null;
    Popup: { name: string; isOpen: boolean }[];
    query?: any;
}

const initialState: IPopup = {
    name: '',
    isOpen: false,
    urlId: null,
    Popup: [],
    query: null,
    extraDataForModal: null,
};

const ManagePopupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        createPopup: (state, action) => {
            const isExist = state.Popup.some(
                e => e.name === action.payload.name,
            );
            if (action.payload && !isExist) {
                return { ...state, Popup: [...state.Popup, action.payload] };
            }
            return { ...state };
        },
        openPopup: (state, action) => {
            if (action.payload) {
                const arr = state.Popup.map(e => {
                    if (e.name === action.payload.name) {
                        return {
                            ...action.payload,
                            extraDataForModal:
                                action?.payload?.extraDataForModal &&
                                action?.payload?.extraDataForModal,
                        };
                    }
                    return e;
                });
                return {
                    ...state,
                    name: action.payload.name,
                    urlId: action?.payload?.urlId && action?.payload?.urlId,
                    extraDataForModal:
                        action?.payload?.extraDataForModal &&
                        action?.payload?.extraDataForModal,
                    query: action?.payload?.query
                        ? action?.payload?.query
                        : null,
                    isOpen: true,
                    Popup: arr,
                    state: action.payload.state,
                };
            }
            return { ...state };
        },
        closePopup: (state, action) => {
            if (action.payload) {
                const arr = state.Popup.map(e => {
                    if (e.name === action.payload.name) {
                        return action.payload;
                    }
                    return e;
                });
                return {
                    ...state,
                    name: action.payload.name,
                    label: action.payload.label,
                    urlId: null,
                    extraDataForModal: null,
                    isOpen: false,
                    Popup: arr,
                    query: null,
                };
            }
            return { ...state };
        },
    },
});

export const { openPopup, closePopup, createPopup } = ManagePopupSlice.actions;

export default ManagePopupSlice.reducer;
