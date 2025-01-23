import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';
import { deleteProps } from '../../../../utils/utils';
import useFetchDataWithReactQuery from '../../../../utils/hooks/ListRequest';
import _ from 'lodash';

export const handleDefaultValue = (
    data: any,
    isRegeneratedCopy: boolean = false,
) => {
    return {
        ...data,
        csr: `${data?.csr?.first_name} ${data?.csr?.last_name}`,
        clerk: `${data?.clerk?.first_name || ''} ${
            data?.clerk?.last_name || ''
        }`,
        ship_to_address: data?.ship_to_address?.id,
        // address_zip_code: data?.address_zip_code,
        // sales_tax: data?.sales_tax,
        freight_method: data?.freight_method?.id,
        term: data?.customer_term?.id,
        order_items: !!data?.order_items?.length
            ? data.order_items.map((order: any) => ({
                  ...order.item,
                  ...order,
                  itemId: order.item?.id,
                  orderId: order?.id,
                  open_qty: !isRegeneratedCopy
                      ? Number(order?.order_qty || 0) -
                        Number(order?.invoiced_qty || 0) -
                        Number(order?.adjusted_qty || 0)
                      : null,
                  order_qty: order?.order_qty || 0,

                  available_qty: !isRegeneratedCopy
                      ? order?.item?.available_qty || 0
                      : null,
                  onhand_qty: order?.item?.onhand_qty || 0,
                  inproduction_qty: order?.item?.inproduction_qty || 0,

                  item_comment: order.comment,
                  item_remark: order.remark,
              }))
            : [],
        order_salespersons: !!data?.order_salespersons?.length
            ? data?.order_salespersons.map((item: any) => ({
                  ...item,
                  ...item?.salesperson,
                  backendId: item?.salesperson?.id || '',
                  salespersonId: item?.salesperson?.id || '',
              }))
            : [],
        invoices_list: data?.invoices || [],
    };
};
export default function AddOrder({ screenDesign }: any) {
    const { id } = useParams();
    const [batchNumber, setBatchNumber] = useState();
    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    } | null>(null);

    const {
        isLoading: isLoadingNextOrderId,
        refetch: reGenerateBatchNumber,
        isRefetching,
        isFetched,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['Next Order Id'],
        queryFn: () => Api.sales.getNextOrderId(),
        enabled: !id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setBatchNumber(data.value);

            if (!state) {
                setDefaultValues({
                    order_number: data.value,
                    extra_charge: 0,
                    shipment_charge: 0,
                    discount_amount: 0,
                    end_date: null,
                });
            }
        },
    });

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['order', id],
        queryFn: () => Api.sales.getOrder(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues(handleDefaultValue(data));
        },
    });

    //--------------  handle copy from Order --------
    const { state } = useLocation();
    const { listData: data } =
        useFetchDataWithReactQuery(
            state?.order_items,
            'item.id',
            `api/manufacture/item/`,
            'id__in',
            {
                customer__iexact: state?.customer?.id,
            },
        ) || [];

    useEffect(() => {
        if (state && isFetched && !!data?.length) {
            const defaultValue = handleDefaultValue(state, true);
            console.log(defaultValue, '--defaultVal   --');
            const ignoreList = [
                'id',
                'guid',
                'start_date',
                'clerk',
                'order_number',
                'status',
                'financial_state',
                'order_date',
                'pick_tickets',
                'invoices',
                'invoices_list',
            ];
            deleteProps(defaultValue, ignoreList);
            console.log(defaultValue, '--defaultVal  after --');
            if (!!data?.length)
                setDefaultValues({
                    ...defaultValue,
                    order_number: batchNumber,
                    //ship_via: data?.ship_via?.id,
                    attachments: defaultValue?.attachments,
                    order_items: !!data?.length
                        ? data.map((item: any, index: number) => {
                              const orderQTY = defaultValue?.order_items.find(
                                  (e: any) => e.itemId === item.id,
                              )?.order_qty;
                              return {
                                  ...item,
                                  itemId: item?.id,
                                  open_qty: +orderQTY || 0,
                                  price: item?.price || item?.current_cost,
                                  order_qty_uom: item?.inventory_uom || '',
                                  order_qty: orderQTY,
                              };
                          })
                        : [],
                });
        }
    }, [state, data, batchNumber]);
    //----------------- end of copy from Order --------
    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals, []);
    }, [screenDesign]);
    if (!!state && _.isEmpty(defaultValues)) {
        return null;
    }
    return (
        <AddPageWrapper
            loading={isLoading}
            defaultValues={defaultValues || {}}
            overWriteField={overWriteFieldModal}
        >
            <FormGeneration
                fields={screenDesign?.fields}
                listData={defaultValues}
                screenDesign={screenDesign}
                setDefaultValues={setDefaultValues}
                loading={isLoading || isLoadingNextOrderId}
                reGenerateBatchNumber={reGenerateBatchNumber}
                batchNumber={batchNumber}
            />
        </AddPageWrapper>
    );
}
