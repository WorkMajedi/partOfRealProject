import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function DetailsInvoice({ screenDesign }: any) {
    const { id } = useParams();

    const {
        data: listData,
        isLoading,
        isError,
        error,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['details_invoice', id],
        queryFn: () => Api.sales.getInvoice(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    const overWriteListData = useMemo(() => {
        if (!listData) return null;
        return {
            ...listData.data,
            term: listData.data?.customer_term,
            address_zip_code: listData?.data?.address_zip_code,
            invoice_items: !!listData.data?.invoice_items?.length
                ? listData.data?.invoice_items.map((order: any) => ({
                      ...order.item,
                      ...order,
                      extension: Number(
                          (order?.price * order?.invoice_qty).toFixed(3),
                      ),
                      open_qty:
                          Number(order?.order_qty || 0) -
                          Number(order?.invoiced_qty || 0) -
                          Number(order?.adjusted_qty || 0),
                      item_comment: order?.comment,
                      item_remark: order?.remark,
                      order_qty_uom: order?.invoice_qty_uom,

                      invoice_item_lots: !!order?.invoice_item_lots?.length
                          ? order.invoice_item_lots.map((invc: any) => ({
                                ...invc,
                                ...invc.item_lot,
                            }))
                          : [],
                  }))
                : [],
            cash_applications_list:
                !!listData.data?.cash_apps?.length && listData.data?.cash_apps,
            order_salespersons: !!listData.data?.order?.order_salespersons
                ?.length
                ? listData.data?.order?.order_salespersons.map((slp: any) => ({
                      ...slp,
                      code: slp?.salesperson?.code,
                      commission_rate: slp?.commission_rate,
                      name: slp?.salesperson?.name || '',
                  }))
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
            navigateUrl={`/sales/invoice/${id}`}
            printURL={id ? `/api/invoices/generate_pdf_invoice/${id}` : ''}
        />
    );
}
