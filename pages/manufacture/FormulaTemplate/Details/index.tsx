import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';
import { normalized } from '../../../../api/Normalized';

export default function DetailsFormulaTemplate({ screenDesign }: any) {
    const { id } = useParams();

    const {
        data: listData,
        isLoading,
        isError,
        error,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['details', id],
        queryFn: () => Api.manufacture.getFormulaTemplate(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    const overWriteListData = useMemo(() => {
        if (!listData) return null;
        return normalized.template.detail(listData);
    }, [listData]);

    return (
        <DetailPageWrapper
            modalFields={screenDesign?.modals}
            screenFields={screenDesign?.fields}
            actionbar={screenDesign?.actionbar}
            printURL={`/api/manufacture/get_product_template_excel_report/${id}`}
            label={screenDesign?.label}
            isLoading={isLoading}
            isError={isError}
            error={error}
            listData={overWriteListData}
            navigateUrl={`/manufacture/template/${id}`}
        />
    );
}
