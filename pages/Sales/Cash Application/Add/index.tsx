import { useParams } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';

export const handleDefaultValue = (data: any) => {
    return {
        ...data,
        invoices_list:
            !!data?.invoices_list?.length &&
            data?.invoices_list.map((item: any) => {
                return {
                    ...item,
                    ...item.invoice,
                    cashId: item?.id,
                    invoiceId: item?.invoice?.id,
                };
            }),
    };
};
export default function CashApplication({ screenDesign }: any) {
    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({
        amount: 0,
        total_applied_credit: 0,
        invoices_list: [],
    });
    const [batchNumber, setBatchNumber] = useState();

    const {
        isLoading: isLoadingNextOrderId,
        refetch: reGenerateBatchNumber,
        isRefetching,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['Next Cash Application Id'],
        queryFn: () => Api.sales.getNextBatchNumberId(),
        enabled: !id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            if (isRefetching) {
                setBatchNumber(data.value);
            }
            setDefaultValues({
                batch_number: data.value,
                available_credit_to_apply: 0,
                available_cash_to_apply: 0,
                total_applied_cash: 0,
                total_applied_credit: 0,
            });
        },
    });
    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['cashApplication', id],
        queryFn: () => Api.sales.getCashApplication(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues(handleDefaultValue(data));
        },
    });

    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals, []);
    }, [screenDesign]);

    return (
        <AddPageWrapper
            loading={isLoading || isLoadingNextOrderId}
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
                setDefaultValues={setDefaultValues}
                reGenerateBatchNumber={reGenerateBatchNumber}
                batchNumber={batchNumber}
            />
        </AddPageWrapper>
    );
}
