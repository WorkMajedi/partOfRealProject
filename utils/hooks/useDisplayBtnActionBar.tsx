import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { displayBtn } from 'redux/slices/actionBar/actionBar.slice';

export default function UseDisplayBtnActionBar(id: any, btnName: string) {
    const dispatch = useDispatch();
    const handleShowBtnActionBar = useCallback(
        (name: string, isShow: boolean) => {
            dispatch(
                displayBtn({
                    isShow,
                    name,
                }),
            );
        },
        [dispatch],
    );
    useEffect(() => {
        if (!!id) {
            handleShowBtnActionBar(btnName, true);
        } else {
            handleShowBtnActionBar(btnName, false);
        }
        return () => handleShowBtnActionBar(btnName, true);
    }, [handleShowBtnActionBar, id, btnName]);
}
