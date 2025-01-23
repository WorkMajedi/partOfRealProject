import { useDispatch } from 'react-redux';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { setPageActionBar } from 'redux/slices/actionBar/actionBar.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import FormProviderAuto from 'core/component/FormProviderAuto';
import ModalGeneration from 'core/component/ModalGeneration';
import { Field } from 'types/type';
import SelectedComponent from 'core/component/selectedComponent/SelectedComponent';
import { Box, CircularProgress, Grid } from '@mui/material';
import ErrorsPage from '../../pages/ErrorPage';
import ActionBar from '../ActionBar';
import DialogPage from './DialogPage';

export default function DetailPageWrapper({
    navigateUrl,
    modalFields,
    screenFields,
    actionbar,
    label,
    isLoading,
    isError,
    error,
    listData,
    printURL,
    inDialog,
}: {
    navigateUrl?: string;
    printURL?: string;
    modalFields?: any;
    screenFields?: any;
    actionbar?: any;
    label?: any;
    isLoading?: any;
    isError?: any;
    error?: any;
    listData?: any;
    inDialog?: boolean;
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const DivRef = useRef<HTMLDivElement>(null);
    // ------------------------------------- fix issue scrolling down when opening
    useLayoutEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
            if (DivRef.current) {
                DivRef.current.focus();
            }
        }, 150);
        window.scrollTo(0, 0);
        if (DivRef.current) {
            DivRef.current.focus();
        }
    }, [pathname, listData]);
    // -------------------------------------------end ---------------------------
    useEffect(() => {
        if (!!actionbar) {
            dispatch(
                setPageActionBar({
                    actionBar: actionbar,
                    pageTitle: label,
                }),
            );
        }
    }, [dispatch, actionbar, label]);
    if (isLoading) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress size={80} />
            </Box>
        );
    }

    if (isError && error?.status === 404) {
        return (
            <ErrorsPage
                // @ts-ignore
                message={error?.message?.detail}
                status={error?.status}
            />
        );
    }

    return (
        <>
            {!inDialog && (
                <div
                    ref={DivRef}
                    tabIndex={-1}
                    style={{
                        position: 'absolute',
                        top: '-1000px',
                        left: '-1000px',
                    }}
                />
            )}
            <DialogPage />
            <FormProviderAuto defaultValues={listData}>
                {actionbar && (
                    <ActionBar
                        goToEdit={() => navigate(`${navigateUrl}`)}
                        printURL={printURL}
                    />
                )}
                <Grid container>
                    {screenFields?.map((com: Field, index: number) => {
                        return (
                            <SelectedComponent
                                key={index.toString()}
                                field={com}
                                inDialog={inDialog}
                            />
                        );
                    })}
                </Grid>
            </FormProviderAuto>
            <FormProviderAuto defaultValues={listData}>
                <ModalGeneration modals={modalFields} />
            </FormProviderAuto>
        </>
    );
}
