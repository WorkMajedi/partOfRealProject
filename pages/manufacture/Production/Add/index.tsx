import { useCallback, useEffect, useState } from 'react';
import { updateModals } from 'core/utils/overWrite';
import { useSelector } from 'react-redux';
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import { normalized } from 'api/Normalized';
import useSocketBlock from 'utils/hooks/socket/socket';
import FormGeneration from './component/FormGeneration';

export default function AddProduction({ screenDesign }: any) {
    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { id: itemId } = useParams();
    const [searchParams] = useSearchParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({
        volume: 100,
        production_volume_uom: defaultOption?.default_volume_unit,
    });

    const template = searchParams.get('template');
    const production_code = searchParams.get('production_code');

    const passDataToQuery = useCallback(
        (str: string) => {
            // @ts-ignore
            const query = Object.fromEntries([...searchParams]);
            navigate({
                pathname,
                search: createSearchParams({
                    ...query,
                }).toString(),
            });
        },
        [navigate, pathname, searchParams],
    );
    useEffect(() => {
        if (!production_code && itemId) {
            navigate({
                pathname: '/manufacture/production/define',
                // @ts-ignore
                search: createSearchParams({
                    production_code: itemId,
                }).toString(),
            });
        }
    }, [production_code, itemId, navigate]);

    const { isLoading: isLoadingProduction } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['production', production_code],
        queryFn: () => Api.manufacture.getProduction(production_code),
        enabled: !!production_code,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            if (data.status === 'Ready for QA') {
                return navigate(
                    `/manufacture/production/qa?production_code=${production_code}`,
                );
            }
            if (
                data.status === 'Ready for Packaging' ||
                data.status === 'Done'
            ) {
                return navigate(
                    `/manufacture/production/packaging?production_code=${production_code}`,
                );
            }
            const res = data?.product_template;
            passDataToQuery(res?.division?.code);
            const DefaultVal = normalized.production.getDefine(data, true);
            setDefaultValues(prv => ({
                ...prv,
                ...DefaultVal,
            }));
        },
    });

    const { isLoading: isLoadingFormulaTemplate } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['production', template],
        queryFn: () => Api.manufacture.getFormulaTemplate(template),
        enabled: !!template,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            passDataToQuery(data?.division?.code);
            const DefaultVal = normalized.production.getDefine(data, false);
            setDefaultValues(prv => ({
                ...prv,
                ...DefaultVal,
            }));
        },
    });
    const [batchNumber, setBatchNumber] = useState();
    const {
        isLoading: isLoadingNextProductionId,
        refetch: reGenerateBatchNumber,
        isRefetching,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['next_code_production'],
        queryFn: () => Api.manufacture.getNextProductionId(),
        enabled: !production_code,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            if (isRefetching) {
                setBatchNumber(data.value);
            }
            if (!production_code) {
                setDefaultValues(prv => ({
                    ...prv,
                    production_code: data.value,
                }));
                // setPrCode(data.value);
                // setLotNumber(prevState => ({
                //     ...prevState,
                //     code: data.value,
                //     startDate: dayjs().format('YYYY-MM-DD').replace(/-/g, ''),
                // }));
            }
        },
    });
    const overWriteFieldModal: any = useCallback(() => {
        return updateModals(screenDesign?.modals, [
            {
                modalName: 'production_define_packaging',
                fields: [
                    {
                        name: 'production_define_packaging',
                        is_show: !(defaultValues?.status === 'In Progress'),
                    },
                ],
            },
            {
                modalName: 'production_define_packaging',
                fields: [
                    {
                        name: 'production_define_packaging_for_inprogress_status',
                        is_show: defaultValues?.status === 'In Progress',
                    },
                ],
            },
        ]);
    }, [screenDesign, defaultValues?.status]);

    //= Socket Block: block user  in some page👇
    const { type, isBlock, closeConnectionSocket } = useSocketBlock({
        type: 'item',
        id: production_code,
        location,
        disBlocking: () => {
            navigate('/manufacture/production/define');
            setTimeout(() => {
                navigate(0);
            });
        },
    });
    //= ===================end=============👆

    return (
        <AddPageWrapper
            loading={
                isLoadingProduction ||
                isLoadingNextProductionId ||
                isLoadingFormulaTemplate
            }
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
