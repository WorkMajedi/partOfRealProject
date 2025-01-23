import { instance, initCRUD } from '../../../config';

// ----------Formula Template Api Call---------
const FormulaTemplateBaseUrl = '/api/manufacture/product_template/';

const getFormulaTemplate = (id: string | number | undefined | null) =>
    instance.get(`${FormulaTemplateBaseUrl}${id}/`);

const insertFormulaTemplate = (data: any) =>
    instance.post(`${FormulaTemplateBaseUrl}`, data);

const updateFormulaTemplate = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${FormulaTemplateBaseUrl}${id}/`, data);

const getVersionCode = (code: string | null) =>
    instance.get(`/api/manufacture/get_next_product_template_version/${code}`);

const getFormulaInfo = (code: string | null) =>
    instance.get(`/api/manufacture/items_for_formula/${code}/`);

// =========================================

// ----------Production Api Call---------
const ProductionBaseUrl = '/api/manufacture/production/';

const getProduction = (id: string | number | undefined | null) =>
    instance.get(`${ProductionBaseUrl}${id}/`);

const getProductionCost = (id: string | number | undefined | null) =>
    instance.get(`${ProductionBaseUrl}${id}/costs/`);

const insertProduction = (data: any) =>
    instance.post(`${ProductionBaseUrl}`, data);

const updateProduction = (
    id: string | number | undefined | null,
    data: any,
    options?: any,
) => instance.patch(`${ProductionBaseUrl}${id}/`, data, options);

const getNextProductionId = () =>
    instance.get(`/api/manufacture/get_next_sequential/production/`);

// =========================================

// ----------Raw Material Api Call---------
const RawMaterialBaseUrl = 'api/manufacture/raw_material/';
const getManufactureRawMaterialDetails = (
    id: string | number | undefined | null,
) => instance.get(`${RawMaterialBaseUrl}${id}/`);

const insertManufactureRawMaterial = (data: any) =>
    instance.post(`${RawMaterialBaseUrl}`, data);

const updateManufactureRawMaterial = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${RawMaterialBaseUrl}${id}/`, data);

// =========================================

// ----------Packaging Material Api Call---------
const PackagingMaterialBaseUrl = '/api/manufacture/packaging_material/';
const getManufacturePackagingMaterialDetails = (
    id: string | number | undefined | null,
) => instance.get(`${PackagingMaterialBaseUrl}${id}/`);

const insertManufacturePackagingMaterial = (data: any) =>
    instance.post(`${PackagingMaterialBaseUrl}`, data);

const updateManufacturePackagingMaterial = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${PackagingMaterialBaseUrl}${id}/`, data);

// =========================================
// ----------Quality Assurance Api Call---------
const QualityAssuranceBaseUrl = '/api/manufacture/quality_assurance/';
const getManufactureQualityAssuranceDetails = (
    id: string | number | undefined | null,
) => instance.get(`${QualityAssuranceBaseUrl}${id}/`);

const insertManufactureQualityAssurance = (data: any) =>
    instance.post(`${QualityAssuranceBaseUrl}`, data);

const updateManufactureQualityAssurance = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${QualityAssuranceBaseUrl}${id}/`, data);

// =========================================

// ----------Packaging Material Api Call---------
const ItemsBaseUrl = '/api/manufacture/item/';
const getManufactureItemsDetails = (id: string | number | undefined | null) =>
    instance.get(`${ItemsBaseUrl}${id}/`);

const insertManufactureItems = (data: any) =>
    instance.post(`${ItemsBaseUrl}`, data);

const updateManufactureItems = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${ItemsBaseUrl}${id}/`, data);

// =========================================

// ----------Division Api Call---------
const DivisionBaseUrl = '/api/manufacture/division/';
const getDivisionDetails = (id: string | number | undefined | null) =>
    instance.get(`${DivisionBaseUrl}${id}/`);

const insertDivision = (data: any) => instance.post(`${DivisionBaseUrl}`, data);

const updateDivision = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${DivisionBaseUrl}${id}/`, data);

// =========================================

// ----------Department Api Call---------
const DepartmentBaseUrl = '/api/manufacture/department/';
const getDepartmentDetails = (id: string | number | undefined | null) =>
    instance.get(`${DepartmentBaseUrl}${id}/`);

const insertDepartment = (data: any) =>
    instance.post(`${DepartmentBaseUrl}`, data);

const updateDepartment = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${DepartmentBaseUrl}${id}/`, data);

// =========================================

// ----------Class Api Call---------
const ClassBaseUrl = '/api/manufacture/class_obj/';
const getClassDetails = (id: string | number | undefined | null) =>
    instance.get(`${ClassBaseUrl}${id}/`);

const insertClass = (data: any) => instance.post(`${ClassBaseUrl}`, data);

const updateClass = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${ClassBaseUrl}${id}/`, data);

// =========================================

// ----------Hierarchy Management Api Call---------
const HierarchyManagementBaseUrl = '/api/manufacture/hire_archy/';
const getHierarchyManagementDetails = (
    id: string | number | undefined | null,
) => instance.get(`${HierarchyManagementBaseUrl}${id}`);

const insertHierarchyManagement = (data: any) =>
    instance.post(`${HierarchyManagementBaseUrl}`, data);

const updateHierarchyManagement = (
    id: string | number | undefined | null,
    data: any,
) => instance.patch(`${HierarchyManagementBaseUrl}${id}/`, data);

// =========================================

// ----------Machine Api Call---------
const MachineBaseUrl = '/api/manufacture/machine/';
const getMachineDetails = (id: string | number | undefined | null) =>
    instance.get(`${MachineBaseUrl}${id}/`);

const insertMachine = (data: any) => instance.post(`${MachineBaseUrl}`, data);

const updateMachine = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${MachineBaseUrl}${id}/`, data);

// =========================================

// ----------Phase Api Call---------
const PhaseBaseUrl = '/api/manufacture/phase/';
const getPhaseDetails = (id: string | number | undefined | null) =>
    instance.get(`${PhaseBaseUrl}${id}/`);

const insertPhase = (data: any) => instance.post(`${PhaseBaseUrl}`, data);

const updatePhase = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${PhaseBaseUrl}${id}/`, data);

// =========================================

const getReport = (url: string, id: string | number | undefined) =>
    instance.get(`${url}${id}/`);

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

const getStructure = () => instance.get(`/item.add_item/`);
const cloneManufactureTemp = (data: any) =>
    instance.post(`/api/manufacture/clone/`, data);
const getManufactureProductionExcelReport = (id: string | number | undefined) =>
    instance.get(`/api/manufacture/get_production_excel_report/${id}/`);
const deleteManufactureTemp = ({
    url,
    id,
}: {
    id?: string | number;
    url: string;
}) => instance.delete(url);

const getManufactureTempList = (url: string) => instance.get(url);

const getItemsListRows = ({
    pageSize,
    page,
    url,
}: {
    pageSize?: number;
    page?: number;
    url?: string;
}) => instance.get(`${url}?page_size=${pageSize || 10}&page=${page || 1}`);

const getItemsSortRows = ({
    ordering,
    url,
}: {
    ordering?: number | string;
    url: string;
}) => instance.get(`${url}?ordering=${ordering}`);

export default {
    ...initCRUD<IStructure>('Structure'),
    getStructure,
    getFormulaTemplate,
    insertFormulaTemplate,
    updateFormulaTemplate,
    getProduction,
    getProductionCost,
    insertProduction,
    updateProduction,
    getManufactureItemsDetails,
    insertManufactureItems,
    updateManufactureItems,
    insertManufactureRawMaterial,
    updateManufactureRawMaterial,
    getManufactureRawMaterialDetails,
    getManufacturePackagingMaterialDetails,
    insertManufacturePackagingMaterial,
    updateManufacturePackagingMaterial,
    getDivisionDetails,
    insertDivision,
    updateDivision,
    getDepartmentDetails,
    insertDepartment,
    updateDepartment,
    getClassDetails,
    insertClass,
    updateClass,
    getHierarchyManagementDetails,
    insertHierarchyManagement,
    updateHierarchyManagement,
    getMachineDetails,
    insertMachine,
    updateMachine,
    getPhaseDetails,
    insertPhase,
    updatePhase,
    deleteManufactureTemp,
    cloneManufactureTemp,
    getManufactureTempList,
    getItemsListRows,
    getItemsSortRows,
    getVersionCode,
    getFormulaInfo,
    getNextProductionId,
    getManufactureProductionExcelReport,
    getReport,
    getManufactureQualityAssuranceDetails,
    insertManufactureQualityAssurance,
    updateManufactureQualityAssurance,
};
