import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function DetailsCashApplication({ screenDesign }: any) {
    const { id } = useParams();

    const {
        data: listData,
        isLoading,
        isError,
        error,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['details_credit', id],
        queryFn: () => Api.sales.getCashApplication(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    const overWriteListData = useMemo(() => {
        if (!listData) return null;
        const { data } = listData;
        const TotalAppliedCredit =
            (!!data?.invoices_list?.length &&
                data?.invoices_list.reduce((sum: any, item: any) => {
                    const appliedCredit = Number(item?.applied_credit) || 0;
                    return sum + appliedCredit;
                }, 0)) ||
            0;
        return {
            ...data,
            total_applied_credit:
                TotalAppliedCredit && TotalAppliedCredit?.toFixed(3),
            invoices_list:
                !!data?.invoices_list?.length &&
                data?.invoices_list.map((item: any) => {
                    return {
                        ...item,
                        ...item.invoice,
                        applied_credits_list: !!item?.invoice?.applied_credits
                            ?.length
                            ? item?.invoice?.applied_credits
                            : [],
                    };
                }),
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
            navigateUrl={`/sales/accounting/CashApplication/${id}`}
        />
    );
}
