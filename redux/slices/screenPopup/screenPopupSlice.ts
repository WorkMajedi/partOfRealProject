import { createSlice } from '@reduxjs/toolkit';

interface IPopup {
    openedScreenName: '';
    openedScreenToggle: boolean;
    target: any;
}

const initialState: IPopup = {
    openedScreenName: '',
    openedScreenToggle: false,
    target: null,
};

const ScreenPopupSlice = createSlice({
    name: 'screenPopup',
    initialState,
    reducers: {
        openScreenPopup: (state, action) => {
            return {
                ...state,
                openedScreenName: action.payload.name,
                openedScreenToggle: action.payload.isOpen,
                target: action.payload.target,
            };
        },
        closeScreenPopup: state => {
            return {
                ...state,
                openedScreenName: '',
                openedScreenToggle: false,
                target: null,
            };
        },
    },
});

export const { openScreenPopup, closeScreenPopup } = ScreenPopupSlice.actions;

export default ScreenPopupSlice.reducer;
