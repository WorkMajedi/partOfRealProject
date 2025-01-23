import { useParams } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';

export default function CategoryVendor({ screenDesign }: any) {
    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({});

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['vendor-category', id],
        queryFn: () => Api.partner.getVendorCategory(id),
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
