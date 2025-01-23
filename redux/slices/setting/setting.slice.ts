import { createSlice } from '@reduxjs/toolkit';

type SettingT = {
    language: string;
    weight_unit: string;
    monetary_unit: string;
};
const initialState: SettingT = {
    language: 'English',
    weight_unit: 'lbs',
    monetary_unit: 'Dollar',
};

const settingReducer = createSlice({
    name: 'actionBar',
    initialState,
    reducers: {
        set_values: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { set_values } = settingReducer.actions;

export default settingReducer.reducer;
