import { useParams } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';

export default function CostAdjustment({ screenDesign }: any) {
    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({});

    const { isLoading: isLoadingNextOrderId } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['Next Order Id'],
        queryFn: () => Api.sales.getNextCostAdjustmentId(),
        enabled: !id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues({
                cost_adjustment_number: data.value,
            });
        },
    });

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['cost_adjustment', id],
        queryFn: () => Api.sales.getCostAdjustment(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data: { from_rows, to_rows, ...resData } }) => {
            setDefaultValues({
                ...resData,
                adjustment_add_from: !!from_rows?.length
                    ? from_rows.map(({ id, ...rest }: any) => {
                        return {
                            ...rest,
                            row_id: id,
                        };
                    })
                    : [],
                adjustment_add_to: !!to_rows?.length
                    ? to_rows.map(({ id, ...rest }: any) => {
                        return {
                            ...rest,
                            row_id: id,
                        };
                    })
                    : [],
            });
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
            />
        </AddPageWrapper>
    );
}
