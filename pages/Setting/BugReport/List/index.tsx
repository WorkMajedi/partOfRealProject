import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageActionBar } from 'redux/slices/actionBar/actionBar.slice';
import ListPageWrapper from 'component/PagesComponents/ListPageWrapper';
import ActionBar from 'component/ActionBar';
import { overrideFields } from '../../../../core/utils/overWrite';

export default function ListUser({ screenDesign }: any) {
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
                name: 'bug_report_list',
                asyncDelete: true,
            },
        ]);
    }, [screenDesign?.fields]);

    return (
        <ListPageWrapper DataJSON={overWriteField()}>
            <ActionBar goToAdd={() => navigate(`/setting/BugReport/add`)} />
        </ListPageWrapper>
    );
}
