import { useParams } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';

export default function AddPurchaseOrderReceipt({ screenDesign }: any) {
    const { id } = useParams();
    const [batchNumber, setBatchNumber] = useState();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({});

    const {
        isLoading: isLoadingNextOrderId,
        refetch: reGenerateBatchNumber,
        isRefetching,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['Next PO Receipt Id'],
        queryFn: () => Api.sales.getNextPurchaseReceiptId(),
        enabled: !id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            if (isRefetching) {
                setBatchNumber(data.value);
            }
            setDefaultValues({
                po_receipt_number: data.value,
            });
        },
    });

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['PurchaseOrder', id],
        queryFn: () => Api.sales.getPurchaseOrderReceipt(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues({
                ...data,
                po_number: data?.purchase_order,
                purchase_receipt_lines: !!data?.purchase_receipt_lines?.length
                    ? data.purchase_receipt_lines.map(
                          ({ id, purchase_order_line, ...po }: any) => {
                              return {
                                  ...po,
                                  row_id: id,
                                  line_id: purchase_order_line,
                              };
                          },
                      )
                    : [],
            });
        },
    });

    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals, []);
    }, [screenDesign]);

    return (
        <AddPageWrapper
            loading={isLoadingNextOrderId || isLoading}
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
                reGenerateBatchNumber={reGenerateBatchNumber}
                batchNumber={batchNumber}
            />
        </AddPageWrapper>
    );
}
