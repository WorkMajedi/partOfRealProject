import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    isLogin: false,
    isAdmin: false,
    permissionsList: null,
    userData: null,
    force_Refresh: false,
    auth_token: null,
    refresh_token: null,
};

const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                isLogin: true,
                auth_token: action.payload.authToken,
                refresh_token: action.payload.refreshToken,
            };
        },
        logout: state => {
            return {
                ...state,
                isLogin: false,
                auth_token: null,
                refresh_token: null,
            };
        },
        forceRefresh: (state, action) => {
            return {
                ...state,
                force_Refresh: action.payload,
            };
        },
        saveUser: (state, action) => {
            return {
                ...state,
                userData: action.payload,
            };
        },
        setPermissionsList: (state, action) => {
            return {
                ...state,
                permissionsList: action.payload,
            };
        },
    },
});

export const { login, logout, forceRefresh, saveUser, setPermissionsList } =
    permissionsSlice.actions;
export default permissionsSlice.reducer;
