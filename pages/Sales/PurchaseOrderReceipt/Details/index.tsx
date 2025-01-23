import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function DetailsPurchaseOrderReceipt({ screenDesign }: any) {
    const { id } = useParams();

    const {
        data: listData,
        isLoading,
        isError,
        error,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['details_PurchaseOrderReceipt', id],
        queryFn: () => Api.sales.getPurchaseOrderReceipt(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    const overWriteListData = useMemo(() => {
        if (!listData) return null;
        return {
            ...listData.data,
            purchase_receipt_lines: !!listData.data?.purchase_receipt_lines
                ?.length
                ? listData.data?.purchase_receipt_lines
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
            navigateUrl={`/sales/purchaseOrder/receipt/${id}`}
            printURL={`/api/purchase_orders/generate_pdf_po_receipt/${id}`}
        />
    );
}
