import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useCallback, useMemo } from 'react';
import { normalized } from 'api/Normalized';
import { overrideFields } from 'core/utils/overWrite';
import { useDispatch } from 'react-redux';
import { openPopup } from 'redux/slices/managePopup/managePopupSlice';
import { toast } from 'react-toastify';
import printJS from 'print-js';
import { WrapperLoading } from '../../../../component/common';

export default function DetailsProduction({ screenDesign }: any) {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        data: listData,
        isLoading,
        isError,
        error,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['details', id],
        queryFn: () => Api.manufacture.getProduction(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    const {
        data: costlistData,
        isLoading: isCostLoading,
        // isCostError,
        // Costerror,
        refetch,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['production_cost', id],
        queryFn: () => Api.manufacture.getProductionCost(id),
        enabled: !!id && listData?.data?.status?.toLocaleLowerCase() === 'done',
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    // btn_production_cost

    const overWriteListData = useMemo(() => {
        if (!listData) return null;
        const response = listData?.data;
        return normalized.production.details(response);
    }, [listData]);
    //-------------- handle button Print Label for qa -------
    const urlPrintLabelQa = '/api/manufacture/qa_label_print';
    const handleGeneratorPDF = useMutation({
        mutationFn: (url: string) =>
            Api.print.GeneratorLinkPrint(`${url}/${id}`),
        onSuccess: ({ data }) => {
            toast.success('print successfully');
            printJS({
                printable: data.file,
                type: 'pdf',
                base64: true,
            });
        },
        onError: (error: any) => {
            if (!!error?.response?.status)
                toast.error(`The ${error?.response?.status} error indicates`);
        },
    });
    //--------------- end ------
    const screenDesignFields = useCallback(() => {
        return overrideFields(screenDesign?.fields, [
            {
                name: 'btn_production_cost',
                related_modal: false,
                disable:
                    isCostLoading ||
                    listData?.data?.status?.toLocaleLowerCase() !== 'done',
                onClick: () => {
                    dispatch(
                        openPopup({
                            name: 'production_cost',
                            isOpen: true,
                            inModal: true,
                            extraDataForModal: costlistData?.data,
                        }),
                    );
                },
            },
            {
                name: 'qa_label_print',
                isLoadingButton: handleGeneratorPDF.isLoading,
                onClick: () => {
                    if (!!id) {
                        return handleGeneratorPDF.mutateAsync(urlPrintLabelQa);
                    }
                },
            },
        ]);
    }, [screenDesign?.fields, costlistData?.data, isCostLoading]);

    return (
        <WrapperLoading
            isLoading={handleGeneratorPDF.isLoading}
            isError={false}
            type="circular"
        >
            <DetailPageWrapper
                modalFields={screenDesign?.modals}
                screenFields={screenDesignFields()}
                actionbar={
                    !handleGeneratorPDF.isLoading && screenDesign?.actionbar
                }
                printURL={
                    id
                        ? `/api/manufacture/get_production_excel_report/${id}`
                        : ''
                }
                label={screenDesign?.label}
                isLoading={isLoading}
                isError={isError}
                error={error}
                listData={overWriteListData}
                navigateUrl={`/manufacture/production/${id}`}
            />
        </WrapperLoading>
    );
}
