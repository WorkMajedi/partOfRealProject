import { createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
    pageTitle: string;
    actionBar: {} | null;
    isLoadingFetched: boolean;
    showBtn: { isShow: boolean; name: string } | {};
}

const initialState: InitialStateType = {
    pageTitle: '',
    actionBar: null,
    isLoadingFetched: false,
    showBtn: {},
};

const ActionBarReducer = createSlice({
    name: 'actionBar',
    initialState,
    reducers: {
        setPageActionBar: (state, action) => {
            return {
                ...state,
                actionBar: action.payload.actionBar,
                pageTitle: action.payload.pageTitle,
                isLoadingFetched: !!action?.payload?.isLoadingFetched,
            };
        },
        //= show btn in action bar in some page👇
        displayBtn: (state, action) => {
            return {
                ...state,
                showBtn: {
                    isShow: action.payload.isShow,
                    name: action.payload.name,
                },
            };
        },
    },
});

export const { setPageActionBar, displayBtn } = ActionBarReducer.actions;

export default ActionBarReducer.reducer;
