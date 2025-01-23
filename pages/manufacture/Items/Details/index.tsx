import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useCallback, useMemo } from 'react';
import { normalized } from 'api/Normalized';
import { updateModals } from '../../../../core/utils/overWrite';

export default function DetailsItems({ screenDesign }: any) {
    const { id } = useParams();

    const {
        data: listData,
        isLoading,
        isError,
        error,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['details_item', id],
        queryFn: () => Api.manufacture.getManufactureItemsDetails(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    const overWriteListData = useMemo(() => {
        if (!listData) return null;
        const initialValues: any = normalized.items.detail(listData.data);
        return initialValues;
    }, [listData]);

    const overWriteField: any = useCallback(() => {
        if (!listData) return null;
        const x = screenDesign?.fields.filter(
            (filed: any) => filed.name === 'lot_numbers_list',
        );
        if (!!x?.length) {
            x[0].args = {
                ...x[0].args,
                query_params_modal: {
                    item_code__iexact: listData?.data?.code,
                    onhand_qty__gt: 0,
                },
                addParamsToQuery: ['lot_id'],
            };
            const index = screenDesign?.fields.findIndex(
                (filed: any) => filed.name === 'lot_numbers_list',
            );
            screenDesign.fields[index] = x[0];
        }
        return screenDesign.fields;
    }, [screenDesign?.fields, listData]);
    const overWriteFieldModal2: any = useCallback(() => {
        if (!listData) return null;
        const overWriteModal = updateModals(
            [...screenDesign?.modals],
            [
                {
                    modalName: 'item_details_lot_log_histories_list',
                    fields: [
                        {
                            name: 'log_history_list',
                            args: {
                                addParamsToQuery: ['lot_id'],
                            },
                        },
                    ],
                },
            ],
        );
        return overWriteModal;
    }, [screenDesign?.modals, listData]);

    return (
        <DetailPageWrapper
            modalFields={screenDesign?.modals}
            screenFields={overWriteField()}
            actionbar={screenDesign?.actionbar}
            label={screenDesign?.label}
            isLoading={isLoading}
            isError={isError}
            error={error}
            listData={overWriteListData}
            navigateUrl={`/manufacture/items/${id}`}
        />
    );
}
