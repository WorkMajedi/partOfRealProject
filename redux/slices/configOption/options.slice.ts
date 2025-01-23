import { createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
    defaults: {};
}

const initialState: InitialStateType = {
    defaults: {},
};

const ConfigOptionsReducer = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setDefaultOptions: (state, action) => {
            return {
                ...state,
                defaults: action.payload,
            };
        },
    },
});

export const { setDefaultOptions } = ConfigOptionsReducer.actions;

export default ConfigOptionsReducer.reducer;
