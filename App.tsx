/* eslint-disable consistent-return */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
import createTheme from 'Theme/index';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenerateRoutes from 'routes/Routes';
import { LicenseInfo } from '@mui/x-license-pro';
import './styles/index.css';
import { Box, Button, CssBaseline, Typography } from '@mui/material';
import PwaLuncher from 'component/PwaLuncher';
import { ScreenDataProvider } from './utils/hooks/ScreenDataProvider';
import * as Sentry from '@sentry/react';

const App = () => {
    const theme = useSelector((state: any) => state.ThemeReducer);
    const themeConfig = createTheme(theme.currentTheme, 'en');
    
    LicenseInfo.setLicenseKey(
        'a0adf9c8e624f2c734b47f57732c6bbeTz0xMDI3MzAsRT0xNzY0MzQ2Njk5MDAwLFM9cHJvLExNPXN1YnNjcmlwdGlvbixQVj1pbml0aWFsLEtWPTI=',
    );

    useLayoutEffect(() => {
        document.body.setAttribute('dir', themeConfig.direction);
    }, [themeConfig.direction]);

    const force_Refresh = useSelector(
        (state: any) => state.permissions.force_Refresh,
    );
    function beforeunload(event: any) {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave?';
        if (event.defaultPrevented) {
            return (event.returnValue = '');
        }
    }

    useEffect(() => {
        if (!force_Refresh) {
            window.addEventListener('beforeunload', beforeunload, {
                capture: true,
            });
        } else {
            window.removeEventListener('beforeunload', beforeunload, {
                capture: true,
            });
        }
        return () =>
            window.removeEventListener('beforeunload', beforeunload, {
                capture: true,
            });
    }, [force_Refresh]);
    // const { data: DataJSON, loading }: { data: Data | any; loading: boolean } =
    //     useFetchStructure(URL.STRUCTURE.ALL);

    // get permission from redux store
    // const { permissions, isLoading } = usePermissions({});
    // if (isLoading) {
    //     return null;
    // }

    return (
        <MuiThemeProvider theme={themeConfig}>
            <ThemeProvider theme={themeConfig}>
                <ScreenDataProvider>
                    <CssBaseline />
                    <GenerateRoutes />
                    <PwaLuncher />
                    <ToastContainer
                        position="top-center"
                        theme="colored"
                        transition={Slide}
                        autoClose={2000}
                    />
                </ScreenDataProvider>
            </ThemeProvider>
        </MuiThemeProvider>
    );
};
export default Sentry.withProfiler(App);
