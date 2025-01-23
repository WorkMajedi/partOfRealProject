import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function DetailsCostAdjustment({ screenDesign }: any) {
    const { id } = useParams();

    const {
        data: listData,
        isLoading,
        isError,
        error,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['details_adjustment', id],
        queryFn: () => Api.sales.getCostAdjustment(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    const overWriteListData = useMemo(() => {
        if (!listData) return null;
        return {
            ...listData.data,
            adjustment_add_from: !!listData.data?.from_rows?.length
                ? listData.data?.from_rows.map(({ id, ...rest }: any) => {
                      return {
                          ...rest,
                          row_id: id,
                      };
                  })
                : [],
            adjustment_add_to: !!listData.data?.to_rows?.length
                ? listData.data?.to_rows.map(({ id, ...rest }: any) => {
                      return {
                          ...rest,
                          row_id: id,
                      };
                  })
                : [],
        };
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
            navigateUrl={`/sales/adjustment/${id}`}
        />
    );
}
