import { useParams } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import { useSelector } from 'react-redux';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import { normalized } from 'api/Normalized';
import FormGeneration from './component/FormGeneration';

export default function AddItems({ screenDesign }: any) {
    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );

    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({
        item_volume: 100,
        item_volume_uom: defaultOption?.default_volume_unit,
        min_quantity: null,
        price: null,
        quantity_per_box: null,
        quantity_per_case: null,
        quantity_per_pallet: null,
    });

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['items', id],
        queryFn: () => Api.manufacture.getManufactureItemsDetails(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            const initialValues: any = normalized.items.get(data);
            setDefaultValues(initialValues);
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
