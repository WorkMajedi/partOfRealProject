import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageActionBar } from 'redux/slices/actionBar/actionBar.slice';
import ListPageWrapper from 'component/PagesComponents/ListPageWrapper';
import ActionBar from 'component/ActionBar';
import { overrideFields } from '../../../../core/utils/overWrite';

export default function ListRowMaterial({ screenDesign }: any) {
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
                goToAdd={() => navigate(`/manufacture/raw-material/add`)}
            />
        </ListPageWrapper>
    );
}
