import { useCallback, useEffect, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import { useDispatch } from 'react-redux';
import { setPageActionBar } from 'redux/slices/actionBar/actionBar.slice';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import GitInfo from 'react-git-info/macro';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { Api } from '../../../../api';
import FormGeneration from './component/FormGeneration';

export default function ConfigOptions({ screenDesign }: any) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            setPageActionBar({
                actionBar: screenDesign?.actionbar,
                pageTitle: screenDesign?.label,
            }),
        );
    }, [dispatch, screenDesign]);

    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({
        release_code: GitInfo().commit.shortHash,
        user_agent: navigator.userAgent,
    });

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['credit', id],
        queryFn: () => Api.bug.getReport(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues({
                ...data,
            });
        },
    });

    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals || [], []);
    }, [screenDesign]);

    return (
        <AddPageWrapper
            loading={isLoading}
            defaultValues={defaultValues}
            overWriteField={overWriteFieldModal}
        >
            <FormGeneration
                fields={screenDesign?.fields}
                listData={defaultValues}
            />
        </AddPageWrapper>
    );
}
