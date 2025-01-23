import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageActionBar } from 'redux/slices/actionBar/actionBar.slice';
import ListPageWrapper from 'component/PagesComponents/ListPageWrapper';
import ActionBar from 'component/ActionBar';
import { overrideFields } from 'core/utils/overWrite';

export default function ListCostAdjustment({ screenDesign }: any) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            setPageActionBar({
                actionBar: screenDesign?.actionbar,
                pageTitle: screenDesign?.label,
            }),
        );
    }, [dispatch, screenDesign]);

    const overWriteField: any = useCallback(() => {
        return overrideFields(screenDesign?.fields, [
            {
                name: 'adjustment_list',
                asyncDelete: true,
            },
        ]);
    }, [screenDesign?.fields]);

    return (
        <ListPageWrapper DataJSON={overWriteField()}>
            <ActionBar goToAdd={() => navigate(`/sales/adjustment/add`)} />
        </ListPageWrapper>
    );
}
