import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function DetailsPickTicket({ screenDesign }: any) {
    const { id } = useParams();

    const {
        data: listData,
        isLoading,
        isError,
        error,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['details_PickTicket', id],
        queryFn: () => Api.sales.getPickTicket(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    const overWriteListData = useMemo(() => {
        if (!listData) return null;
        return {
            ...listData.data,
            term: listData?.data?.customer_term,
            address_zip_code: listData?.data?.address_zip_code,
            items_list: !!listData?.data?.pick_ticket_items.length
                ? listData?.data?.pick_ticket_items.map((pick: any) => ({
                      ...pick,
                      ...pick?.item,
                      open_qty:
                          Number(pick?.order_qty || 0) -
                          Number(pick?.invoiced_qty || 0) -
                          Number(pick?.adjusted_qty || 0),
                      item_comment: pick?.item?.comment,
                      item_remark: pick?.item?.remark,

                      pick_ticket_item_lots: pick?.pick_ticket_item_lots?.length
                          ? pick?.pick_ticket_item_lots.map((pk: any) => ({
                                ...pk,
                                ...pk.item_lot,
                            }))
                          : [],
                  }))
                : [],
            invoices_list: listData.data?.invoices_for_pick_ticket,
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
            navigateUrl={`/sales/pick_ticket/${id}`}
            printURL={
                id ? `/api/pick_ticket/generate_pdf_pick_ticket/${id}` : ''
            }
        />
    );
}
