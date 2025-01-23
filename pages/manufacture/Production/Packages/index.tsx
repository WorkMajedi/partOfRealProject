import React, { FunctionComponent, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import { normalized } from 'api/Normalized';
import FormGeneration from './component/FormGeneration';

const ProductionPackage: FunctionComponent = ({ screenDesign }: any) => {
    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );
    const [searchParams] = useSearchParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({
        volume: 100,
        production_volume_uom: defaultOption?.default_volume_unit,
    });

    const paramsId = searchParams.get('template');
    const production_code = searchParams.get('production_code');

    const { isLoading: isLoadingProduction } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['production-packaging', production_code],
        queryFn: () => Api.manufacture.getProduction(production_code),
        enabled: !!production_code,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            const DefaultVal = normalized.production.getPackage(data);
            setDefaultValues(DefaultVal);
        },
    });

    const { isLoading: isLoadingFormulaTemplate } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['production-packaging', paramsId],
        queryFn: () => Api.manufacture.getFormulaTemplate(paramsId),
        enabled: !!paramsId,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            const DefaultVal = normalized.production.getDefine(data, false);
            setDefaultValues(DefaultVal);
        },
    });

    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals, []);
    }, [screenDesign]);

    return (
        <AddPageWrapper
            loading={isLoadingProduction || isLoadingFormulaTemplate}
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
};

export default ProductionPackage;
