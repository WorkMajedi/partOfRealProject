import { Grid } from '@mui/material';
import React, { FC } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

interface IWrapperProps {
    children: JSX.Element | React.ComponentClass<any> | any;
    defaultValues?: any;
}

const FormProviderAuto: FC<IWrapperProps> = ({
    children,
    defaultValues = {},
}) => {
    const methods = useForm({
        mode: 'onChange',
        defaultValues,
        reValidateMode: 'onChange',
        shouldFocusError: true,
        // resolver: yupResolver(schema),
    });
    return (
        <Grid
            container
            spacing={2.5}
            // TODO: critical delete syntax comment
            // direction="column"
            sx={{
                backgroundColor: t => t.palette.background.paper,
                padding: 5,
                '& form': {
                    width: '100%'
                }
            }}
        >
            <FormProvider {...methods}>{children}</FormProvider>
        </Grid>
    );
};
export default FormProviderAuto;
