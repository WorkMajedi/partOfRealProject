import { Grid } from '@mui/material';
import FormProviderAuto from 'core/component/FormProviderAuto';
import ModalGeneration from 'core/component/ModalGeneration';
import React, { useEffect, useMemo } from 'react';
import WrapperLoading from 'component/common/WrapperLoading';
import { useDispatch, useSelector } from 'react-redux';
import DialogPage from './DialogPage';
import UserBlockWrapper from './UserBlockWrapper';
import { setPageActionBar } from '../../redux/slices/actionBar/actionBar.slice';
import PageTitle from './PageTitle';
import { ABStyles } from '../ActionBar/AB.styles';

interface PageWrapperProps {
    loading: boolean;
    defaultValues: object;
    dispatchActionBar?: { actionBar: any; pageTitle: any };
    overWriteField: () => [];
    children: JSX.Element | JSX.Element[];
}
export default function AddPageWrapper({
    loading,
    defaultValues,
    overWriteField,
    children,
    dispatchActionBar,
}: PageWrapperProps) {
    // -------------------------dispatchActionBar component ------------------------
    const open = useSelector((store: any) => store?.MenuReducer?.toggleBtn);
    const pageTitle = useSelector((state: any) => state?.ActionBar?.pageTitle);

    const dispatch = useDispatch();
    useEffect(() => {
        if (dispatchActionBar?.actionBar && dispatchActionBar?.pageTitle) {
            dispatch(
                setPageActionBar({
                    actionBar: dispatchActionBar?.actionBar,
                    pageTitle: dispatchActionBar?.pageTitle,
                    isLoadingFetched: loading,
                }),
            );
        }
    }, [dispatch, dispatchActionBar, loading]);
    // ------------------------- ENd dispatchActionBar component ------------------------
    const PageTitleBeforeLoad = useMemo(() => {
        if (
            loading &&
            dispatchActionBar?.actionBar &&
            dispatchActionBar?.pageTitle
        ) {
            return (
                <ABStyles open={open}>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={3}
                            padding={0}
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <PageTitle>{pageTitle}</PageTitle>
                        </Grid>
                    </Grid>
                </ABStyles>
            );
        }
        return null;
    }, [loading, dispatchActionBar]);
    return (
        <UserBlockWrapper>
            <>
                {PageTitleBeforeLoad}
                <WrapperLoading isLoading={loading} isError={false} type="page">
                    <>
                        <DialogPage />
                        <FormProviderAuto defaultValues={defaultValues}>
                            {children}
                        </FormProviderAuto>
                        <FormProviderAuto>
                            <ModalGeneration modals={overWriteField()} />
                        </FormProviderAuto>
                    </>
                </WrapperLoading>
            </>
        </UserBlockWrapper>
    );
}
