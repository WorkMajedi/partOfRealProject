import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPageActionBar } from 'redux/slices/actionBar/actionBar.slice';
import ListPageWrapper from 'component/PagesComponents/ListPageWrapper';
import ActionBar from 'component/ActionBar';
import { overrideFields } from '../../../../core/utils/overWrite';

export default function ListPackagingMaterial({ screenDesign }: any) {
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
    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals, []);
    }, [screenDesign]);
    return (
        <ListPageWrapper
            DataJSON={screenDesign?.fields}
            overWriteField={overWriteFieldModal}
        >
            <ActionBar
                goToAdd={() => navigate(`/manufacture/packaging-material/add`)}
            />
        </ListPageWrapper>
    );
}
