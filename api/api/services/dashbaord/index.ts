import { instance, initCRUD } from '../../../config';

interface IDASHBOARD {
    id: number;
    customer: string;
    cart_number: number;
    created_on: Date;
    shift: { title: string };
    cart_jid: { cart_jid: string };
    lost_and_found: string;
    quantity: number;
    color: string;
}

const getChartTotalDiscountsVariety = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/charts/total_discounts_and_variety/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );
const getDataTotalInvoice = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/data/total_invoice_and_due/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );
const getDataPC_LB = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/data/pc_lb_counter/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );

const getChartSystematicControl = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/charts/systematic_control/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );

const getChartTotalsNetOutPM = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/charts/total_net_out_for_am_pm/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );
const getChartTotalsNetOutIn = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/charts/total_net_out_in/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );
const getDataNotManifestedTickets = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/data/not_manifested_tickets_and_unpaid_invoicing/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );
const getDataLatePaidCustomers = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/data/late_paid_customers/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );
const getDataTableTopItems = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/data/top_8_items/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );
const getCartsInformation = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/data/carts_information/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );
const getLastPayment = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/data/last_5_payment/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );
const getTopCustomers = (qs: string, moduleID?: number) =>
    instance.get(
        `/api/v1/dashboard/data/top_5_customers/${
            qs ? `?${qs}&module_id=${moduleID}` : `?module_id=${moduleID}`
        }`,
    );

export default {
    ...initCRUD<IDASHBOARD>('DASHBOARD'),
    getChartTotalDiscountsVariety,
    getChartTotalsNetOutPM,
    getChartTotalsNetOutIn,
    getChartSystematicControl,
    getDataTotalInvoice,
    getDataPC_LB,
    getDataNotManifestedTickets,
    getDataLatePaidCustomers,
    getDataTableTopItems,
    getCartsInformation,
    getLastPayment,
    getTopCustomers,
};
