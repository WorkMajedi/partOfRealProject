import { alertTitleClasses, Grid } from '@mui/material';
import ActionBarComponent from 'core/component/ActionBarComponent';
import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    fetchGeneratorExcelFile,
    fetchGeneratorLinkPrint,
    FindStepFristPath,
    handleRedirectPathCopy,
} from 'utils/utils';
import { Helmet } from 'react-helmet';
import { useKeyPress } from 'ahooks';
import { ABStyles } from './AB.styles';
import PageTitle from '../PagesComponents/PageTitle';
import { useFormContext } from 'react-hook-form';
import Loader from '../common/Loader';

export default function ActionBar({
    save,
    reset,
    goToAdd,
    goToEdit,
    printURL,
    baseUrlReport,
    isLoadingActionBar,
}: any) {
    const open = useSelector((store: any) => store?.MenuReducer?.toggleBtn);
    const pageTitle = useSelector((state: any) => state?.ActionBar?.pageTitle);
    const actionBarLoading = useSelector(
        (state: any) => state?.ActionBar?.isLoadingFetched,
    );
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { watch }: any = pathname.includes('detail')
        ? useFormContext()
        : () => {};
    const actionBar = useSelector((state: any) => {
        if (typeof state?.ActionBar?.actionBar === 'function') {
            return state?.ActionBar?.actionBar();
        }
        return state?.ActionBar?.actionBar;
    });

    const generatorPDF = async (
        printURL: string,
        isReport: boolean = false,
    ) => {
        if (printURL) {
            if (!isReport) {
                await fetchGeneratorLinkPrint(printURL);
            } else {
                // console.log(printURL.indexOf('?'), '--   pdf aaa--');
                const url =
                    printURL.indexOf('?') !== -1
                        ? printURL.concat('&as_pdf=true')
                        : printURL.concat('/?as_pdf=true');
                await fetchGeneratorLinkPrint(url);
            }
        }
    };
    const generatorExcel = async (printURL: string) => {
        //console.log(printURL, '-- baseUrlReport  --');
        if (printURL) {
            //console.log(!!baseUrlReport.indexOf('?'), '-- excel   aaaaa--');
            const url =
                baseUrlReport.indexOf('?') !== -1
                    ? printURL.concat('&as_excel=true')
                    : printURL.concat('/?as_excel=true');
            await fetchGeneratorExcelFile(url);
        }
    };
    const handleDuplicateDataInAdd = () => {
        const watchAllData = watch?.();
        const data = watchAllData?.unchangedResponse
            ? watchAllData?.unchangedResponse
            : watchAllData;
        const path = handleRedirectPathCopy(pathname);
        if (data) {
            if (!!path) {
                navigate(`${path}/add`, { state: { ...data } });
            }
        }
    };
    // --------------------------- handle actions f9 --------------------
    useKeyPress(['f9'], () => {
        if (save) {
            save?.();
        }
    });
    //---------------------------
    const backToList = () => {
        const path = FindStepFristPath(pathname);
        if (path) {
            if (path.includes('detail')) {
                const modifiedUrl = path.replace(/\/detail/g, '');
                navigate(`${modifiedUrl}`);
            } else {
                navigate(`${path}/list`);
            }
        }
    };
    const handleActionBtn = (action: string, field: any) => {
        switch (action) {
            case 'save':
                return () => save?.();
            case 'back':
                return () => backToList?.();
            case 'reset':
                return () => reset?.();
            case 'new':
                return () => goToAdd();
            case 'edit':
                return () => goToEdit();
            case 'copy':
                return () => handleDuplicateDataInAdd?.();
            case 'export-pdf':
                if (baseUrlReport) {
                    return () => generatorPDF(baseUrlReport, true);
                } else {
                    return () => generatorPDF(printURL, false);
                }
            case 'export-excel':
                return () => generatorExcel(baseUrlReport);
            default:
                return null;
        }
    };
    useKeyPress(['esc'], () => {
        reset?.();
    });
    const handleRenderActionBar = useMemo(
        () => () => {
            const actionKey = Object.keys(actionBar).toString();
            return actionBar[actionKey]?.fields?.map(
                (field: any, index: number) => {
                    let newField: object = {};
                    const action = field?.args?.action;
                    if (field.component_type.includes('Button')) {
                        const path = FindStepFristPath(pathname);

                        if (field.name === 'back' && !path.includes('detail'))
                            return;

                        newField = {
                            ...field,
                            ...(!!field.onClick
                                ? {
                                      onClick: field.onClick,
                                  }
                                : !!handleActionBtn(action, field)
                                ? {
                                      onClick: handleActionBtn(action, field),
                                  }
                                : {}),
                        };
                    } else if (field.component_type === 'LabelSimple') {
                        newField = {
                            ...field,
                            pageTitle,
                        };
                    } else {
                        newField = field;
                    }
                    return (
                        <ActionBarComponent
                            key={index.toString()}
                            field={newField}
                        />
                    );
                },
            );
        },
        [actionBar, baseUrlReport],
    );
    if (actionBarLoading) {
        return null;
    }

    return (
        <>
            {/*@ts-ignore*/}
            <Helmet>
                <title>{pageTitle ? `ASC | ${pageTitle}` : 'No title'}</title>
            </Helmet>
            {isLoadingActionBar && <Loader />}
            <ABStyles open={open}>
                <Grid container spacing={2}>
                    {!!actionBar && !!Object.keys(actionBar).length ? (
                        handleRenderActionBar()
                    ) : (
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
                    )}
                </Grid>
            </ABStyles>
        </>
    );
}
