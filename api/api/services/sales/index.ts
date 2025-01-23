import { instance } from 'api/config';

// ----------Order Api Call---------
const OrderBaseUrl = '/api/order/orders/';
const insertOrder = (data: any) => instance.post(OrderBaseUrl, data);
const updateOrder = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${OrderBaseUrl}${id}/`, data);
const getOrder = (id: string | number | undefined | null) =>
    instance.get(`${OrderBaseUrl}${id}/`);

const getNextOrderId = () =>
    instance.get(`/api/manufacture/get_next_sequential/order/`);
// =========================================

// ----------ShipVia Api Call---------
const ShipBaseUrl = '/api/shipping/ship_via/';
const insertShip = (data: any) => instance.post(ShipBaseUrl, data);
const updateShip = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${ShipBaseUrl}${id}/`, data);
const getShip = (id: string | number | undefined | null) =>
    instance.get(`${ShipBaseUrl}${id}/`);
// =========================================

// ----------PickTicket Api Call---------
const PickTicketBaseUrl = '/api/pick_ticket/pick_ticket/';
const insertPickTicket = (data: any) => instance.post(PickTicketBaseUrl, data);
const updatePickTicket = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${PickTicketBaseUrl}${id}/`, data);
const getPickTicket = (id: string | number | undefined | null) =>
    instance.get(`${PickTicketBaseUrl}${id}/`);
// =========================================

// ----------Invoice Api Call---------
const InvoiceBaseUrl = '/api/invoices/invoice/';
const insertInvoice = (data: any) => instance.post(InvoiceBaseUrl, data);
const updateInvoice = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${InvoiceBaseUrl}${id}/`, data);
const getInvoice = (id: string | number | undefined | null) =>
    instance.get(`${InvoiceBaseUrl}${id}/`);
// =========================================

// ----------Credit Api Call---------
const CreditBaseUrl = '/api/customers/credits/';
const insertCredit = (data: any) => instance.post(CreditBaseUrl, data);
const updateCredit = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${CreditBaseUrl}${id}/`, data);
const getCredit = (id: string | number | undefined | null) =>
    instance.get(`${CreditBaseUrl}${id}/`);
// =========================================
// ----------Cash Application Api Call---------
const CashApplicationBaseUrl = '/api/sales/accounting/cash_application/';
const insertCashApplication = (data: any) =>
    instance.post(CashApplicationBaseUrl, data);
const updateCashApplication = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${CashApplicationBaseUrl}${id}/`, data);
const getCashApplication = (id: string | number | undefined | null) =>
    instance.get(`${CashApplicationBaseUrl}${id}/`);
const getInvoicesActive = (id: string | number) =>
    instance.get(`${InvoiceBaseUrl}?customer__id__iexact=${id}`);
const getNextBatchNumberId = () =>
    instance.get(`/api/manufacture/get_next_sequential/cash_application/`);
// =========================================

// ----------PurchaseOrder Api Call---------
const PurchaseOrderBaseUrl = '/api/purchase_orders/purchase_order/';
const insertPurchaseOrder = (data: any) =>
    instance.post(PurchaseOrderBaseUrl, data);
const updatePurchaseOrder = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${PurchaseOrderBaseUrl}${id}/`, data);
const getPurchaseOrder = (id: string | number | undefined | null) =>
    instance.get(`${PurchaseOrderBaseUrl}${id}/`);

const getNextPurchaseId = () =>
    instance.get(`/api/manufacture/get_next_sequential/purchase_order/`);
// =========================================

// ----------PurchaseOrder Api Call---------
const PurchaseOrderReceiptBaseUrl = '/api/purchase_orders/po_receipt/';
const insertPurchaseOrderReceipt = (data: any) =>
    instance.post(PurchaseOrderReceiptBaseUrl, data);
const updatePurchaseOrderReceipt = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${PurchaseOrderReceiptBaseUrl}${id}/`, data);
const getPurchaseOrderReceipt = (id: string | number | undefined | null) =>
    instance.get(`${PurchaseOrderReceiptBaseUrl}${id}/`);

const getNextPurchaseReceiptId = () =>
    instance.get(`/api/manufacture/get_next_sequential/po_receipt/`);
// =========================================

// ----------Adjustment Api Call---------
const AdjustmentBaseUrl = 'api/sales/adjustments/adjustment/';
const insertAdjustment = (data: any) => instance.post(AdjustmentBaseUrl, data);
const updateAdjustment = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${AdjustmentBaseUrl}${id}/`, data);
const getAdjustment = (id: string | number | undefined | null) =>
    instance.get(`${AdjustmentBaseUrl}${id}/`);
const getNextAdjustmentId = () =>
    instance.get(`/api/manufacture/get_next_sequential/adjustment/`);
// =========================================

// ----------Cost Adjustment Api Call---------
const CostAdjustmentBaseUrl = 'api/sales/adjustments/cost_adjustment/';
const insertCostAdjustment = (data: any) =>
    instance.post(CostAdjustmentBaseUrl, data);
const updateCostAdjustment = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${CostAdjustmentBaseUrl}${id}/`, data);
const getCostAdjustment = (id: string | number | undefined | null) =>
    instance.get(`${CostAdjustmentBaseUrl}${id}/`);
const getNextCostAdjustmentId = () =>
    instance.get(`/api/manufacture/get_next_sequential/cost_adjustment/`);
// =========================================
// "/api/sales/adjustment/?search="
// /api/sales/adjustment/?search
export default {
    insertCostAdjustment,
    updateCostAdjustment,
    getCostAdjustment,
    getNextCostAdjustmentId,
    getCashApplication,
    updateCashApplication,
    insertCashApplication,
    getInvoicesActive,
    getNextBatchNumberId,
    getNextOrderId,
    insertOrder,
    updateOrder,
    getOrder,
    insertShip,
    updateShip,
    getShip,
    insertPickTicket,
    updatePickTicket,
    getPickTicket,
    insertInvoice,
    updateInvoice,
    getInvoice,
    insertCredit,
    updateCredit,
    getCredit,
    insertPurchaseOrder,
    updatePurchaseOrder,
    getPurchaseOrder,
    getNextPurchaseId,
    insertPurchaseOrderReceipt,
    updatePurchaseOrderReceipt,
    getPurchaseOrderReceipt,
    getNextPurchaseReceiptId,
    insertAdjustment,
    updateAdjustment,
    getAdjustment,
    getNextAdjustmentId,
};
