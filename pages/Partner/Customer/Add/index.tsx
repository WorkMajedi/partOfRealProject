import { useParams } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';

export default function AddCustomer({ screenDesign }: any) {
    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({});

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['customer', id],
        queryFn: () => Api.partner.getCustomer(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues({
                ...data,
                term: data?.term?.id || null,
                type: data?.type?.id || '',
                category: data?.category?.id || '',
                ship_to_addresses: !!data?.ship_to_address?.length
                    ? data?.ship_to_address?.map((item: any) => ({
                          ...item,
                          backendId: item?.id,
                      }))
                    : [],
                item_price_list: data?.customer_items?.length
                    ? data?.customer_items?.map((item: any) => ({
                          ...(item?.item ?? {}),
                          ...item,
                          itemId: item?.item?.id,
                          backendId: item?.id,
                      }))
                    : [],
                phones: !!data?.phones?.length
                    ? data?.phones?.map((item: any) => ({
                          ...item,
                          backendId: item?.id,
                      }))
                    : [],
                order_recipients: !!data?.order_recipients?.length
                    ? data?.order_recipients?.map((item: any) => ({
                          ...item,
                          backendId: item?.id,
                      }))
                    : [],
                statement_recipients: !!data?.statement_recipients?.length
                    ? data?.statement_recipients?.map((item: any) => ({
                          ...item,
                          backendId: item?.id,
                      }))
                    : [],
                invoice_recipients: !!data?.invoice_recipients?.length
                    ? data?.invoice_recipients?.map((item: any) => ({
                          ...item,
                          backendId: item?.id,
                      }))
                    : [],
                authorize_persons: !!data?.authorize_persons?.length
                    ? data?.authorize_persons?.map((item: any) => ({
                          ...item,
                          backendId: item?.id,
                      }))
                    : [],
                salespersons: !!data?.customer_salespersons?.length
                    ? data?.customer_salespersons.map((item: any) => ({
                          ...item,
                          ...item?.salesperson,
                          backendId: item?.id,
                          salespersonId: item?.salesperson?.id,
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
