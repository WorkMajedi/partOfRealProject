import { useLocation, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';
import useFetchDataWithReactQuery from '../../../../utils/hooks/ListRequest';
import { deleteProps } from '../../../../utils/utils';
import { useSelector } from 'react-redux';
import user from '../../../../api/api/services/user/User';

export default function AddPurchaseOrder({ screenDesign }: any) {
    const { userData } = useSelector((state: any) => state?.permissions);

    const { id } = useParams();
    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    } | null>(null);
    const [batchNumber, setBatchNumber] = useState();
    const {
        isLoading: isLoadingNextOrderId,
        refetch: reGenerateBatchNumber,
        isRefetching,
        isFetched,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['Next Order Id'],
        queryFn: () => Api.sales.getNextPurchaseId(),
        enabled: !id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            if (isRefetching) {
                setBatchNumber(data.value);
            } else if (!!state) {
                setBatchNumber(data.value);
            }
            if (!state) {
                setDefaultValues({
                    po_number: data.value,
                    misc_charge: 0,
                    extra_charge: 0,
                    received_amount: 0,
                    stop_date: null,
                    xfactory_date: null,
                    in_consolidate_date: null,
                    indc_date: null,
                    eta_date: null,
                    days_to_freight: null,
                    ship_email: userData?.email || '',
                });
            }
        },
    });

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['PurchaseOrder', id],
        queryFn: () => Api.sales.getPurchaseOrder(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues({
                ...data,
                freight_method: data?.freight_method?.id,
                inco_term: data?.inco_term?.id,
                vendor_term: data?.vendor_term?.id || null,
                ship_email: data?.email || userData?.email || '',
                pro_lines: !!data?.pro_lines?.length
                    ? data?.pro_lines.map(({ id, uom, ...po }: any) => {
                          return {
                              ...po,
                              poId: id,
                              inventory_uom: uom,
                              code_value: po.code,
                          };
                      })
                    : [],
                // receipts_list: [],
            });
        },
    });
    //--------------  handle copy from Order --------
    const { state } = useLocation();
    console.log(state?.pro_lines, '--  state --');
    const { listData: raw_material_pro_lines } =
        useFetchDataWithReactQuery(
            state?.pro_lines.filter(
                (item: any) => item.type === 'Raw Material',
            ),
            'inventory_data.id',
            `api/manufacture/raw_material/`,
            'id__in',
            {},
        ) || [];
    // const { listData: pro_lines, isLoading: loadingCopyData } =
    //     useFetchDataWithReactQuery(
    //         state?.pro_lines.filter(
    //             (item: any) => item.type === 'Packaging Material',
    //         ),
    //         'inventory_data.id',
    //         `api/manufacture/raw_material/`,
    //         'id__in',
    //         {},
    //     ) || [];
    useEffect(() => {
        if (state && isFetched && !!raw_material_pro_lines?.length) {
            console.log(raw_material_pro_lines, '--  data --');
            const ignoreList = ['id'];
            deleteProps(state, ignoreList);
            if (!!raw_material_pro_lines?.length)
                setDefaultValues({
                    ...state,
                    po_number: batchNumber,
                    //ship_via: data?.ship_via?.id,
                    freight_method: state?.freight_method?.id,
                    inco_term: state?.inco_term?.id,
                    vendor_term: state?.vendor_term?.id || null,
                    attachments: state?.attachments,
                    pro_lines: !!raw_material_pro_lines?.length
                        ? raw_material_pro_lines.map(
                              ({ id, uom, ...po }: any) => {
                                  return {
                                      ...po,
                                      poId: id,
                                      inventory_uom: uom,
                                      code_value: po.code,
                                      order_qty: state?.pro_lines.find(
                                          (e: any) => e.itemId === po.id,
                                      )?.order_qty,
                                      total_received_qty: 0,
                                      uom: state?.pro_lines.find(
                                          (e: any) => e.itemId === po.id,
                                      )?.uom,
                                      type: state?.pro_lines.find(
                                          (e: any) => e.itemId === po.id,
                                      )?.type,
                                  };
                              },
                          )
                        : [],
                });
        }
    }, [state, raw_material_pro_lines, batchNumber]);
    //----------------- end of copy from Order --------
    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals, []);
    }, [screenDesign]);
    if (!defaultValues) {
        return null;
    }

    return (
        <AddPageWrapper
            loading={isLoading}
            defaultValues={defaultValues || {}}
            overWriteField={overWriteFieldModal}
            dispatchActionBar={{
                actionBar: screenDesign?.actionbar,
                pageTitle: screenDesign?.label,
            }}
        >
            <FormGeneration
                fields={screenDesign?.fields}
                listData={defaultValues}
                reGenerateBatchNumber={reGenerateBatchNumber}
                batchNumber={batchNumber}
            />
        </AddPageWrapper>
    );
}
