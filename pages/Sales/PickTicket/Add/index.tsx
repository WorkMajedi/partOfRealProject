import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';

export default function PickTicketOrder({ screenDesign }: any) {
    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({});

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['PickTicket', id],
        queryFn: () => Api.sales.getPickTicket(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues({
                ...data,
                term: data?.customer_term?.id || '',
                clerk: `${data?.clerk?.first_name || ''} ${
                    data?.clerk?.last_name || ''
                }`,
                ship_to_address: data?.ship_to_address?.id || '',
                freight_method: data?.freight_method?.id || '',
                pick_ticket_items: !!data?.pick_ticket_items.length
                    ? data?.pick_ticket_items.map((pick: any) => {
                          return {
                              ...pick?.item,
                              ...pick,
                              itemId: pick?.item?.id,
                              pickId: pick?.id,
                              open_qty:
                                  Number(pick?.order_qty || 0) -
                                  Number(pick?.invoiced_qty || 0) -
                                  Number(pick?.adjusted_qty || 0),
                              item_comment: pick?.item?.comment,
                              item_remark: pick?.item?.remark,

                              pick_ticket_item_lots: !!pick
                                  ?.pick_ticket_item_lots?.length
                                  ? pick?.pick_ticket_item_lots.map(
                                        (lot: any) => ({
                                            ...lot,
                                            lot_id: lot?.item_lot?.lot_id,
                                        }),
                                    )
                                  : [],
                          };
                      })
                    : [],
                invoices_list: data?.invoices_for_pick_ticket,
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
