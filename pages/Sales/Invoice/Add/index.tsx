import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';

export default function InvoiceOrder({ screenDesign }: any) {
    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({});

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['invoice', id],
        queryFn: () => Api.sales.getInvoice(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues({
                ...data,
                extra_charge: data?.order?.extra_charge || '0.00',
                discount_amount: data?.order?.discount_amount || '0.00',
                tax_amount: data?.order?.tax_amount || '0.00',
                shipment_charge: data?.order?.shipment_charge || '0.00',
                clerk: `${data?.clerk?.first_name || ''} ${
                    data?.clerk?.last_name || ''
                }`,
                term: data?.customer_term?.id || '',
                ship_to_address: data?.ship_to_address?.id || '',
                freight_method: data?.freight_method?.id || '',
                invoice_items: !!data?.invoice_items?.length
                    ? data?.invoice_items.map((pick: any) => ({
                          ...pick?.item,
                          ...pick,
                          invoice_item_lots: !!pick?.invoice_item_lots?.length
                              ? pick?.invoice_item_lots.map(
                                    ({ item_lot, ...restInvc }: any) => ({
                                        ...restInvc,
                                        ...item_lot,
                                    }),
                                )
                              : [],
                          itemId: pick?.item?.id,
                          pickId: pick?.id,
                          extension: Number(
                              (pick?.price * pick?.invoice_qty).toFixed(3),
                          ),
                          open_qty:
                              Number(pick?.order_qty || 0) -
                              Number(pick?.invoiced_qty || 0) -
                              Number(pick?.adjusted_qty || 0),
                          item_comment: pick?.item?.comment,
                          item_remark: pick?.item?.remark,
                          order_qty_uom: pick?.invoice_qty_uom,
                      }))
                    : [],
                order_salespersons: !!data?.order?.order_salespersons.length
                    ? data?.order?.order_salespersons.map((item: any) => ({
                          ...item,
                          backendId: item?.salesperson?.id || '',
                          salespersonId: item?.salesperson?.id || '',
                          code: item?.salesperson?.code,
                          name: item?.salesperson?.name || '',
                      }))
                    : [],
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
