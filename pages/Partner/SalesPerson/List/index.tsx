import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageActionBar } from 'redux/slices/actionBar/actionBar.slice';
import ListPageWrapper from 'component/PagesComponents/ListPageWrapper';
import ActionBar from 'component/ActionBar';

export default function ListSalesPerson({ screenDesign }: any) {
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

    return (
        <ListPageWrapper DataJSON={screenDesign?.fields}>
            <ActionBar goToAdd={() => navigate(`/partner/salesperson/add`)} />
        </ListPageWrapper>
    );
}
