import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageActionBar } from 'redux/slices/actionBar/actionBar.slice';
import { useNavigate } from 'react-router-dom';
import ActionBar from 'component/ActionBar';
import ListPageWrapper from 'component/PagesComponents/ListPageWrapper';

export default function HierarchyItems({ screenDesign }: any) {
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
            <ActionBar
                goToAdd={() =>
                    navigate(`/manufacture/hierarchy/hierarchy-management`)
                }
            />
        </ListPageWrapper>
    );
}
