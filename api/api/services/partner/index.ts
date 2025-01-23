import { instance, initCRUD } from '../../../config';

// ----------Customer Api Call---------
const CustomerBaseUrl = '/api/customers/customer/';
const insertCustomer = (data: any) => instance.post(CustomerBaseUrl, data);
const updateCustomer = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${CustomerBaseUrl}${id}/`, data);
const getCustomer = (id: string | number | undefined | null) =>
    instance.get(`${CustomerBaseUrl}${id}/`);

// =========================================

// ----------CustomerTerms Api Call---------
const CustomerTermsBaseUrl = '/api/customers/customer_term/';
const insertCustomerTerms = (data: any) =>
    instance.post(CustomerTermsBaseUrl, data);
const updateCustomerTerms = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${CustomerTermsBaseUrl}${id}/`, data);
const getCustomerTerms = (id: string | number | undefined | null) =>
    instance.get(`${CustomerTermsBaseUrl}${id}/`);

// =========================================

// ----------CustomerType Api Call---------
const CustomerTypeBaseUrl = '/api/customers/customer_type/';
const insertCustomerType = (data: any) =>
    instance.post(CustomerTypeBaseUrl, data);
const updateCustomerType = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${CustomerTypeBaseUrl}${id}/`, data);
const getCustomerType = (id: string | number | undefined | null) =>
    instance.get(`${CustomerTypeBaseUrl}${id}/`);

// =========================================

// ----------CustomerCategory Api Call---------
const CustomerCategoryBaseUrl = '/api/customers/customer_category/';
const insertCustomerCategory = (data: any) =>
    instance.post(CustomerCategoryBaseUrl, data);
const updateCustomerCategory = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${CustomerCategoryBaseUrl}${id}/`, data);
const getCustomerCategory = (id: string | number | undefined | null) =>
    instance.get(`${CustomerCategoryBaseUrl}${id}/`);

// =========================================

// ----------Vendor Api Call---------
const VendorBaseUrl = '/api/manufacture/vendor/';
const insertVendor = (data: any) => instance.post(VendorBaseUrl, data);
const updateVendor = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${VendorBaseUrl}${id}/`, data);
const getVendor = (id: string | number | undefined | null) =>
    instance.get(`${VendorBaseUrl}${id}/`);

// =========================================

// ----------VendorTerms Api Call---------
const VendorTermBaseUrl = 'api/manufacture/vendor-term/';
const insertVendorTerm = (data: any) => instance.post(VendorTermBaseUrl, data);
const updateVendorTerm = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${VendorTermBaseUrl}${id}/`, data);
const getVendorTerm = (id: string | number | undefined | null) =>
    instance.get(`${VendorTermBaseUrl}${id}/`);

// =========================================

// ----------VendorCategory Api Call---------
const VendorCategoryBaseUrl = '/api/manufacture/vendor-category/';
const insertVendorCategory = (data: any) =>
    instance.post(VendorCategoryBaseUrl, data);
const updateVendorCategory = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${VendorCategoryBaseUrl}${id}/`, data);
const getVendorCategory = (id: string | number | undefined | null) =>
    instance.get(`${VendorCategoryBaseUrl}${id}/`);

// =========================================

// ----------SalesPerson Api Call---------
const SalesPersonBaseUrl = '/api/customers/salesperson/';
const insertSalesPerson = (data: any) =>
    instance.post(SalesPersonBaseUrl, data);
const updateSalesPerson = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${SalesPersonBaseUrl}${id}/`, data);
const getSalesPerson = (id: string | number | undefined | null) =>
    instance.get(`${SalesPersonBaseUrl}${id}/`);

// =========================================

interface IStructure {
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

export default {
    ...initCRUD<IStructure>('Structure'),
    insertCustomer,
    updateCustomer,
    getCustomer,
    insertCustomerTerms,
    updateCustomerTerms,
    getCustomerTerms,
    insertCustomerType,
    updateCustomerType,
    getCustomerType,
    insertCustomerCategory,
    updateCustomerCategory,
    getCustomerCategory,
    insertVendor,
    updateVendor,
    getVendor,
    insertVendorTerm,
    updateVendorTerm,
    getVendorTerm,
    insertVendorCategory,
    updateVendorCategory,
    getVendorCategory,
    insertSalesPerson,
    updateSalesPerson,
    getSalesPerson,
};
