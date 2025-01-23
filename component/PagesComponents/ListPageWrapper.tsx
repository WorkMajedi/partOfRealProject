import FormProviderAuto from 'core/component/FormProviderAuto';
import SelectedComponent from 'core/component/selectedComponent/SelectedComponent';
import { Field } from 'types/type';
import { Grid } from '@mui/material';
import React, { ReactNode } from 'react';
import DialogPage from 'component/PagesComponents/DialogPage';
import ModalGeneration from 'core/component/ModalGeneration';

export default function ListPageWrapper({
    DataJSON = [],
    children,
    overWriteField,
    modalFields,
}: {
    DataJSON: Field[];
    children: ReactNode;
    overWriteField?: () => [];
    modalFields?: any[];
}) {
    return (
        <Grid container spacing={2.5}>
            <DialogPage />
            {children}
            <FormProviderAuto>
                {DataJSON?.map((field: Field, index: number) => {
                    return (
                        <SelectedComponent
                            key={index.toString()}
                            field={field}
                        />
                    );
                })}
                {overWriteField && (
                    <ModalGeneration modals={overWriteField()} />
                )}
            </FormProviderAuto>
            {modalFields && (
                <FormProviderAuto>
                    <ModalGeneration modals={modalFields} />
                </FormProviderAuto>
            )}
        </Grid>
    );
}
