import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageActionBar } from '../../../../redux/slices/actionBar/actionBar.slice';
import { instance } from '../../../../api/config';
import { toast } from 'react-toastify';
import printJS from 'print-js';
import { overrideFields } from '../../../../core/utils/overWrite';
import { openPopup } from '../../../../redux/slices/managePopup/managePopupSlice';
import { WrapperLoading } from '../../../../component/common';

export default function DetailsOrder({ screenDesign }: any) {
    const { id } = useParams();

    const {
        data: listData,
        isLoading,
        isError,
        error,
    } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
        queryKey: ['details_order', id],
        queryFn: () => Api.sales.getOrder(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });
    const [actionBarObj, setActionBarObj] = useState<any>();
    const navigate = useNavigate();
    const handleGeneratePickTicket = useMutation({
        mutationFn: () =>
            instance.post(
                `api/pick_ticket/create_pick_ticket_from_order/${id}/`,
            ),
        onSuccess: ({ data }) => {
            toast.success('Generated pick ticket successfully.');
            navigate(`/sales/pick_ticket/${data.id}`);
        },
        onError: (error: any) => {
            if (!!error?.response?.status)
                toast.error(`The ${error?.response?.status} error indicates`);
        },
    });
    useEffect(() => {
        const oldFields = screenDesign?.actionbar?.details_copy?.fields;
        let newFields: any;
        if (!!id && listData?.data?.status === 'Approved') {
            const GeneratePickBtn = {
                args: {
                    action: 'generate',
                    short_key: 'F10',
                    size: 'medium',
                    icon: 'generate',
                },
                component_type: 'ButtonSecondary',
                default_value: '',
                disable: false, // pick ticket === open
                // disable:true, //  approved && pick ticket !== open && status one of item in grid === open
                is_show: true,
                label: 'Generate Pick Ticket',
                name: 'generate_pick_ticket',
                type: 'ButtonSecondary',
                width: '1',
                onClick: async () => {
                    await handleGeneratePickTicket.mutateAsync();
                },
            };
            const indexId =
                screenDesign.actionbar?.details_copy?.fields.findIndex(
                    (item: any) =>
                        item.label.toString().toLowerCase() === 'pdf',
                ) + 1;
            newFields = [
                ...oldFields.slice(0, indexId),
                GeneratePickBtn,
                ...oldFields.slice(indexId),
            ];
        } else {
            newFields = oldFields;
        }

        setActionBarObj({
            details: {
                ...screenDesign?.actionbar?.details_copy,
                fields: newFields,
            },
        });
    }, [screenDesign, id, isLoading]);

    const overWriteListData = useMemo(() => {
        if (!listData) return null;
        return {
            ...listData.data,
            term: listData.data?.customer_term,
            address_zip_code: listData?.data?.address_zip_code,
            order_items: !!listData.data?.order_items.length
                ? listData.data?.order_items.map((order: any) => ({
                      ...order.item,
                      ...order,
                      open_qty:
                          Number(order?.order_qty || 0) -
                          Number(order?.invoiced_qty || 0) -
                          Number(order?.adjusted_qty || 0),
                      item_comment: order.comment,
                      item_remark: order.remark,
                  }))
                : [],
            order_salespersons: !!listData.data?.order_salespersons.length
                ? listData.data?.order_salespersons.map((slp: any) => ({
                      ...slp,
                      ...slp?.salesperson,
                      code: slp?.salesperson?.code,
                      commission_rate: slp?.commission_rate,
                      name: slp?.salesperson?.name || '',
                  }))
                : [],
            pick_tickets_list: listData?.data?.pick_tickets || [],
            invoices_list: listData?.data?.invoices || [],
            unchangedResponse: listData?.data,
        };
    }, [listData]);

    console.log(screenDesign, 'screenDesign');

    //-------------- handle button generate pdf pick_ticket -------
    const urlGeneratePdfPickTicket = '/api/order/order_pick_list';
    const handleGeneratePdfPickTicket = useMutation({
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
                name: 'print_order_pick_list',
                isLoadingButton: handleGeneratePdfPickTicket.isLoading,
                onClick: () => {
                    if (!!id) {
                        return handleGeneratePdfPickTicket.mutateAsync(
                            urlGeneratePdfPickTicket,
                        );
                    }
                },
            },
        ]);
    }, [screenDesign?.fields]);

    return (
        <WrapperLoading
            isLoading={handleGeneratePdfPickTicket.isLoading}
            isError={false}
            type="circular"
        >
            <DetailPageWrapper
                modalFields={screenDesign?.modals}
                screenFields={screenDesignFields()}
                actionbar={
                    !handleGeneratePdfPickTicket.isLoading && actionBarObj
                }
                label={screenDesign?.label}
                isLoading={isLoading}
                isError={isError}
                error={error}
                listData={overWriteListData}
                navigateUrl={`/sales/order/${id}`}
                printURL={`/api/order/generate_pdf_order/${id}`}
            />
        </WrapperLoading>
    );
}
