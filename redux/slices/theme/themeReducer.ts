import { THEMES } from 'Theme/constatns';
import { createSlice } from '@reduxjs/toolkit';

export type ThemeInitialStateType = {
    currentTheme: string;
};

const initialState: ThemeInitialStateType = {
    currentTheme: THEMES.DEFAULT,
    // currentTheme: THEMES.DARK,
};

const ThemeReducer = createSlice({
    name: 'currentTheme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            return {
                ...state,
                currentTheme: action.payload,
            };
        },
    },
});

export const { setTheme } = ThemeReducer.actions;

export default ThemeReducer.reducer;
