import { instance } from '../../../config';
import SequentialNumbers from '../../../../pages/Setting/SequentialNumbers';

// ----------Role Api Call---------
const ConfigBaseUrl = '/api/settings/general-settings';
const getConfig = () => instance.get(`${ConfigBaseUrl}/`);

const insertConfig = (data: any) => instance.patch(`${ConfigBaseUrl}/1/`, data);

// =========================================
// ----------Tax Rate Api Call---------
const TaxRateBaseUrl = '/api/settings/tax_rate_config/';
// const getTaxRate= () => instance.get(`${ConfigBaseUrl}/`);
const insertTaxRate = (data: any) => instance.post(TaxRateBaseUrl, data);
const updateTaxRate = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${TaxRateBaseUrl}${id}/`, data);
const getTaxRate = (id: string | number | undefined | null) =>
    instance.get(`${TaxRateBaseUrl}${id}/`);
const searchTaxRate = (qoury: string) =>
    instance.get(`${TaxRateBaseUrl}?search=${qoury}`);
// =========================================
// ----------Tax Rate Api Call---------
const SequentialNumbersUrl = '/api/manufacture/sequential_number/';
// const getTaxRate= () => instance.get(`${ConfigBaseUrl}/`);
const getSequentialNumbers = (id: string | number | undefined | null) =>
    instance.get(`${SequentialNumbersUrl}${id}/`);
const updateSequentialNumbers = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${SequentialNumbersUrl}${id}/`, data);

// =========================================

export default {
    getConfig,
    insertConfig,
    getTaxRate,
    updateTaxRate,
    insertTaxRate,
    getSequentialNumbers,
    updateSequentialNumbers,
    searchTaxRate,
};
