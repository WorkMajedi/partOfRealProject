import permissions from 'redux/slices/permissions/permissionsSlice';
import ThemeReducer from 'redux/slices/theme/themeReducer';
import MenuReducer from 'redux/slices/sidbarMenu/sidebarMenuSlice';
import ManagePopup from 'redux/slices/managePopup/managePopupSlice';
import ScreenPopup from 'redux/slices/screenPopup/screenPopupSlice';
import ActionBar from 'redux/slices/actionBar/actionBar.slice';
import Settings from 'redux/slices/setting/setting.slice';
import ConfigOptions from 'redux/slices/configOption/options.slice';
import GridsListSlice from 'redux/slices/dataGrid/gridsDataSlice';
import { combineReducers } from 'redux';
import localStorage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

// we use nested persist to persist menu in session storage
const persistMenu = {
    key: 'menu',
    storage: storageSession,
};

// we use nested persist to persist menu in session storage
const persistToken = {
    key: 'token',
    storage: localStorage,
};

export const rootReducer = combineReducers({
    ThemeReducer,
    permissions: persistReducer(persistToken, permissions),
    MenuReducer: persistReducer(persistMenu, MenuReducer),
    ManagePopup,
    ActionBar,
    ScreenPopup,
    GridsListSlice,
    Settings,
    ConfigOptions,
});
