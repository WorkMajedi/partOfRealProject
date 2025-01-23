import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';

export default function DivisionScreen({ screenDesign }: any) {
    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({});

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['division', id],
        queryFn: () => Api.manufacture.getDivisionDetails(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues(data);
        },
    });

    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals, []);
    }, [screenDesign]);

    return (
        <AddPageWrapper
            loading={isLoading}
            defaultValues={defaultValues}
            overWriteField={overWriteFieldModal}
            dispatchActionBar={{
                actionBar: screenDesign?.actionbar,
                pageTitle: screenDesign?.label,
            }}
        >
            <FormGeneration
                fields={screenDesign?.fields}
                listData={defaultValues}
            />
        </AddPageWrapper>
    );
}
