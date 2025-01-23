import { useParams } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import { useSelector } from 'react-redux';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import { normalized } from 'api/Normalized';
import FormGeneration from './component/FormGeneration';

export default function AddPackagingMaterial({ screenDesign }: any) {
    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );

    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({
        volume: 100,
        packaging_volume_uom: defaultOption?.default_volume_unit,
        packaging_volume: null,
    });

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['packaging_material', id],
        queryFn: () =>
            Api.manufacture.getManufacturePackagingMaterialDetails(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            const initialValues = normalized.packagingMaterial.get(data);
            setDefaultValues(initialValues);
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
