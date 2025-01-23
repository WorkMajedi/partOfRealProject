import React, { useCallback, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import { consoleLog } from 'utils/utils';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import FormGeneration from './component/FormGeneration';

export default function RawMaterialReport({ screenDesign }: any) {
    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
    }>({});

    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals, []);
    }, [screenDesign]);
    consoleLog('screen design', screenDesign, '#fcc');
    return (
        <AddPageWrapper
            loading={false}
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
