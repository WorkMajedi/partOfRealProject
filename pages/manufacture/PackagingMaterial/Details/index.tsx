import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';
import { normalized } from '../../../../api/Normalized';

export default function DetailsPackagingMaterial({ screenDesign }: any) {
    const { id } = useParams();

    const {
        data: listData,
        isLoading,
        isError,
        error,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['details_packagingMaterial', id],
        queryFn: () =>
            Api.manufacture.getManufacturePackagingMaterialDetails(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    const overWriteListData = useMemo(() => {
        if (!listData) return null;
        const initialValues = normalized.packagingMaterial.detail(
            listData?.data,
        );
        return initialValues;
    }, [listData]);

    return (
        <DetailPageWrapper
            modalFields={screenDesign?.modals}
            screenFields={screenDesign?.fields}
            actionbar={screenDesign?.actionbar}
            label={screenDesign?.label}
            isLoading={isLoading}
            isError={isError}
            error={error}
            listData={overWriteListData}
            navigateUrl={`/manufacture/packaging-material/${id}`}
        />
    );
}
