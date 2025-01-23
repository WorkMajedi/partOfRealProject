import { instance } from 'api/config';
import { bool } from 'yup';

// ----------Report Api Call---------
export const ReportBaseUrl = '/api/reports';
export interface IReportRawMaterial {
    all_objects?: boolean;
    as_excel?: boolean;
    as_pdf?: boolean;
    from_date?: string;
    obj_id?: number | string;
    to_date?: string;
}
const getReportRawMaterials = (url: string) => instance.get(url);

// =========================================

export interface IReportPackagingMaterials {
    id?: number;
    code?: string;
    description?: string;
    current_cost?: number | string;
    onhand_qty?: number | string;
    available_qty?: number | string;
    inventory_uom?: string;
}
export const getReportPackagingMaterials = (data: IReportPackagingMaterials) =>
    instance.get(`${ReportBaseUrl}/packaging_materials/`, { params: data });

// =========================================

export default { getReportRawMaterials, getReportPackagingMaterials };
