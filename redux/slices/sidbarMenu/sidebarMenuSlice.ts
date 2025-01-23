import { createSlice } from '@reduxjs/toolkit';

export type sidebarInitialStateType = {
    activeMenu: any;
    pageLabel: string;
    toggleBtn: boolean;
};

const initialState: sidebarInitialStateType = {
    activeMenu: null,
    pageLabel: '',
    toggleBtn: true,
    // currentTheme: THEMES.DARK,
};

const MenuReducer = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            return {
                ...state,
                activeMenu: action.payload,
            };
        },
        setPageLabel: (state, action) => {
            return {
                ...state,
                pageLabel: action.payload,
            };
        },
        setToggleMenu: (state, action) => {
            return {
                ...state,
                toggleBtn: action.payload,
            };
        },
    },
});

export const { setActiveMenu, setPageLabel, setToggleMenu } =
    MenuReducer.actions;

export default MenuReducer.reducer;
