import { useCallback, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';

export default function ConfigOptions({ screenDesign }: any) {
    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({});

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['config'],
        queryFn: () => Api.option.getConfig(),
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            setDefaultValues({
                ...data.results[0],
            });
        },
    });

    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals || [], []);
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
