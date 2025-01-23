import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { overrideFields } from 'core/utils/overWrite';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { normalized } from 'api/Normalized';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';
import { deleteProps } from '../../../../utils/utils';
import _ from 'lodash';

export default function AddFormulaTemplate({ screenDesign }: any) {
    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );
    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({});

    //--------------  handle copy from formula --------
    const { state } = useLocation();

    useEffect(() => {
        if (state) {
            const defaultVal = normalized.template.add(state, true);
            console.log(defaultVal, '--defaultVal   --');
            deleteProps(defaultVal, [
                'division',
                'department',
                'class_obj',
                'code',
            ]);
            console.log(defaultVal, '--defaultVal  after --');

            setDefaultValues({
                ...defaultVal,
                attachments: defaultVal?.attachments || null,
            });
        }
    }, [state]);
    //----------------- end of copy from formula --------

    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['formula_template', id],
        queryFn: () => Api.manufacture.getFormulaTemplate(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            const defaultVal = normalized.template.add(data);
            setDefaultValues(defaultVal);
        },
    });

    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals, []);
    }, [screenDesign]);
    // const overWriteFieldModal2 = updateModals(screenDesign?.modals, [
    //     {
    //         modalName: 'product_template_add_phase_details',
    //         fields: [{ name: 'phase_code', label: 'Code1010101010' }],
    //     },
    //     {
    //         modalName: 'qa_search',
    //         fields: [
    //             {
    //                 name: 'search_result',
    //                 label: 'Quality Assurances List ',
    //             },
    //         ],
    //     },
    // ]);
    if (!!state && _.isEmpty(defaultValues)) {
        return null;
    }
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
