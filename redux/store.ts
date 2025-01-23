import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistReducer,
    persistStore,
} from 'redux-persist';

import { rootReducer } from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        'counter',
        'ThemeReducer',
        'permissions',
        'MenuReducer',
        'ManagePopup',
        'ActionBar',
        'ScreenPopup',
        'GridsListSlice',
        'Settings',
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoredActions: [
    //                 FLUSH,
    //                 REHYDRATE,
    //                 PAUSE,
    //                 PERSIST,
    //                 PURGE,
    //                 REGISTER,
    //             ],
    //         },
    //     }),
});

export const persistor = persistStore(store);
