import { generateRandomId } from 'utils/utils';

import async from 'component/Async/Async';
import TestPage from '../pages/TestPage';
import CustomerPaymentsSummary from '../pages/reports/CustomerPaymentsSummary/CustomerSummary';
import SequentialNumbers from '../pages/Setting/SequentialNumbers';

// FormulaTemplateScreen
const AddFormulaTemplateScreenPage = async(
    () => import('pages/manufacture/FormulaTemplate/Add'),
);
const ListFormulaTemplateScreenPage = async(
    () => import('pages/manufacture/FormulaTemplate/List'),
);
const DetailsFormulaTemplateScreenPage = async(
    () => import('pages/manufacture/FormulaTemplate/Details'),
);
const QualityAssuranceTemplateScreenPage = async(
    () => import('pages/manufacture/FormulaTemplate/QualityAssurance'),
);
// ------------------

// ProductionScreen
const AddProductionScreenPage = async(
    () => import('pages/manufacture/Production/Add'),
);
const ListProductionScreenPage = async(
    () => import('pages/manufacture/Production/List'),
);
const DetailsProductionScreenPage = async(
    () => import('pages/manufacture/Production/Details'),
);
const QAProductionScreen = async(
    () => import('pages/manufacture/Production/ScreenQa'),
);
const PackageProductionScreen = async(
    () => import('pages/manufacture/Production/Packages'),
);
// ------------------

// ItemsScreen
const AddItemsScreenPage = async(() => import('pages/manufacture/Items/Add'));
const ListItemsScreenPage = async(() => import('pages/manufacture/Items/List'));
const DetailsItemsScreenPage = async(
    () => import('pages/manufacture/Items/Details'),
);
// ------------------

// RawMaterialScreen
const AddRawMaterialScreenPage = async(
    () => import('pages/manufacture/RawMaterial/Add'),
);
const ListRawMaterialScreenPage = async(
    () => import('pages/manufacture/RawMaterial/List'),
);
const DetailRawMaterialScreenPage = async(
    () => import('pages/manufacture/RawMaterial/Details'),
);
// ------------------

// PackagingMaterialScreen
const AddPackagingMaterialScreenPage = async(
    () => import('pages/manufacture/PackagingMaterial/Add'),
);
const ListPackagingMaterialScreenPage = async(
    () => import('pages/manufacture/PackagingMaterial/List'),
);
const DetailPackagingMaterialScreenPage = async(
    () => import('pages/manufacture/PackagingMaterial/Details'),
);
// ------------------

// Hierarchy Screen
const DivisionScreen = async(
    () => import('pages/manufacture/Hierarchy/Division'),
);

const DepartmentScreen = async(
    () => import('pages/manufacture/Hierarchy/Department'),
);

const ClassScreen = async(() => import('pages/manufacture/Hierarchy/Class'));

const HierarchyManagementScreen = async(
    () => import('pages/manufacture/Hierarchy/HierarchyManagement'),
);

const HierarchyListScreen = async(
    () => import('pages/manufacture/Hierarchy/HierarchyManagement'),
);
// ------------------

// MachineScreen
const MachineScreen = async(() => import('pages/manufacture/Machine'));
// ------------------

// PhaseScreen
const PhaseScreen = async(() => import('pages/manufacture/Phase'));
// ------------------

// UserScreen
const AddUserScreenPage = async(() => import('pages/Setting/User/Add'));
const ListUserScreenPage = async(() => import('pages/Setting/User/List'));
const DetailsUserScreenPage = async(() => import('pages/Setting/User/Details'));
// ------------------

// RoleScreen
const AddRoleScreenPage = async(() => import('pages/Setting/Role/Add'));
const ListRoleScreenPage = async(() => import('pages/Setting/Role/List'));
const DetailsRoleScreenPage = async(() => import('pages/Setting/Role/Details'));
// ------------------

// CustomerScreen
const AddCustomerScreenPage = async(() => import('pages/Partner/Customer/Add'));
const ListCustomerScreenPage = async(
    () => import('pages/Partner/Customer/List'),
);
const DetailsCustomerScreenPage = async(
    () => import('pages/Partner/Customer/Details'),
);
const TermsCustomerScreenPage = async(
    () => import('pages/Partner/Customer/Terms'),
);
const TypeCustomerScreenPage = async(
    () => import('pages/Partner/Customer/Type'),
);
const CategoriesCustomerScreenPage = async(
    () => import('pages/Partner/Customer/Categories'),
);
// ------------------

// VendorScreen
const AddVendorScreenPage = async(() => import('pages/Partner/Vendor/Add'));
const ListVendorScreenPage = async(() => import('pages/Partner/Vendor/List'));
const TermsVendorScreenPage = async(() => import('pages/Partner/Vendor/Terms'));
const CategoryVendorScreenPage = async(
    () => import('pages/Partner/Vendor/Categories'),
);
const DetailsVendorScreenPage = async(
    () => import('pages/Partner/Vendor/Details'),
);
// ------------------

// SalesPersonScreen
const AddSalesPersonScreenPage = async(
    () => import('pages/Partner/SalesPerson/Add'),
);
const ListSalesPersonScreenPage = async(
    () => import('pages/Partner/SalesPerson/List'),
);
const DetailsSalesPersonScreenPage = async(
    () => import('pages/Partner/SalesPerson/Details'),
);
// ------------------

// OrderScreen
const AddOrderScreenPage = async(() => import('pages/Sales/Order/Add'));
const ListOrderScreenPage = async(() => import('pages/Sales/Order/List'));
const DetailsOrderScreenPage = async(() => import('pages/Sales/Order/Details'));
// ------------------

// ShipViaScreen
const AddShipViaScreenPage = async(() => import('pages/Sales/ShipVia/Add'));
const ListShipViaScreenPage = async(() => import('pages/Sales/ShipVia/List'));
const DetailsShipViaScreenPage = async(
    () => import('pages/Sales/ShipVia/Details'),
);
// ------------------

// InvoiceScreen
const AddInvoiceScreenPage = async(() => import('pages/Sales/Invoice/Add'));
const ListInvoiceScreenPage = async(() => import('pages/Sales/Invoice/List'));
const DetailsInvoiceScreenPage = async(
    () => import('pages/Sales/Invoice/Details'),
);
// ------------------

// PickTicketScreen
const AddPickTicketScreenPage = async(
    () => import('pages/Sales/PickTicket/Add'),
);
const ListPickTicketScreenPage = async(
    () => import('pages/Sales/PickTicket/List'),
);
const DetailsPickTicketScreenPage = async(
    () => import('pages/Sales/PickTicket/Details'),
);
// ------------------

// CreditScreen
const AddCreditScreenPage = async(() => import('pages/Sales/Credit/Add'));
const ListCreditScreenPage = async(() => import('pages/Sales/Credit/List'));
const DetailsCreditScreenPage = async(
    () => import('pages/Sales/Credit/Details'),
);
// ------------------

// PurchaseOrderScreen
const AddPurchaseOrderScreenPage = async(
    () => import('pages/Sales/PurchaseOrder/Add'),
);
const ListPurchaseOrderScreenPage = async(
    () => import('pages/Sales/PurchaseOrder/List'),
);
const DetailsPurchaseOrderScreenPage = async(
    () => import('pages/Sales/PurchaseOrder/Details'),
);
// ------------------

// PurchaseOrderReceiptScreen
const AddPurchaseOrderReceiptScreenPage = async(
    () => import('pages/Sales/PurchaseOrderReceipt/Add'),
);
const ListPurchaseOrderReceiptScreenPage = async(
    () => import('pages/Sales/PurchaseOrderReceipt/List'),
);
const DetailsPurchaseOrderReceiptScreenPage = async(
    () => import('pages/Sales/PurchaseOrderReceipt/Details'),
);
// ------------------

// AdjustmentScreenPage
const AddAdjustmentScreenPage = async(
    () => import('pages/Sales/Adjustment/Add'),
);
const ListAdjustmentScreenPage = async(
    () => import('pages/Sales/Adjustment/List'),
);
const DetailsAdjustmentScreenPage = async(
    () => import('pages/Sales/Adjustment/Details'),
);
// ------------------

// ------------------

// CostAdjustmentScreenPage
const AddCostAdjustmentScreenPage = async(
    () => import('pages/Sales/CostAdjustment/Add'),
);
const ListCostAdjustmentScreenPage = async(
    () => import('pages/Sales/CostAdjustment/List'),
);
const DetailsCostAdjustmentScreenPage = async(
    () => import('pages/Sales/CostAdjustment/Details'),
);
// ------------------

// Cash Application

const AddCashApplicationScreenPage = async(
    () => import('pages/Sales/Cash Application/Add'),
);
const ListCashApplicationScreenPage = async(
    () => import('pages/Sales/Cash Application/List'),
);
const DetailsCashApplicationScreenPage = async(
    () => import('pages/Sales/Cash Application/Details'),
);

// ------------------
// RoleScreen
const ConfigOptionScreenPage = async(
    () => import('pages/Setting/ConfigOptions/Add'),
);
const ConfigTaxesRateScreenPage = async(
    () => import('pages/Setting/ConfigOptions/ConfigTaxesRate/Add'),
);
const ConfigSequentialNumbersScreenPage = async(
    () => import('pages/Setting/SequentialNumbers/index'),
);
// ------------------

// BugReportScreen
const AddBugReportScreenPage = async(
    () => import('pages/Setting/BugReport/Add'),
);
const ListBugReportScreenPage = async(
    () => import('pages/Setting/BugReport/List'),
);
const DetailsBugReportScreenPage = async(
    () => import('pages/Setting/BugReport/Details'),
);
// ------------------

// Personnel
const EmployeeScreen = async(() => import('pages/Setting/Employee'));

const Login = async(() => import('pages/auth/login'));

const NoAccessPage = async(() => import('pages/NoAccessPage'));

const ErrorsPage = async(() => import('pages/ErrorPage'));

// DashboardScreen
const DashboardPage = async(() => import('pages/dashboard/Home'));
// ---------------

// Reports screen
const Report_Item_InventoryAndPricePage = async(
    () => import('pages/reports/ItemReports/InventoryAndPrice'),
);
const Report_raw_material_InventoryAndPricePage = async(
    () => import('pages/reports/RawMaterialReports/InventoryAndPrice'),
);
const Report_packaging_material_InventoryAndPricePage = async(
    () => import('pages/reports/PackagingMaterialReports/InventoryAndPrice'),
);
const Report_CustomerByReportPage = async(
    () => import('pages/reports/SalesReports/SalesByCustomer'),
);
const Report_CustomerPaymentsSummary = async(
    () => import('pages/reports/CustomerPaymentsSummary/CustomerSummary'),
);
// ----------------------------------------------------------------

export const routes = [
    {
        id: generateRandomId(),
        path: 'dashboard',
        name: 'Dashboard',
        screenDesignKey: 'dashboard',
        screenPermissionKey: 'dashboard',
        icon: 'DashboardSvg',
        hideInMenu: false,
        hideChildrenInMenu: false,
        tagPermissions: ['add', 'view'],
        children: [
            {
                id: generateRandomId(),
                parent: 'dashboard',
                path: 'advanced',
                name: 'Dashboard',
                screenDesignKey: 'advanced',
                element: DashboardPage,
                icon: 'HomeSvg',
                hideInMenu: false,
                tagPermissions: ['add', 'view'],
                screenPermissionKey: 'advanced',
            },
        ],
    },

    {
        id: generateRandomId(),
        path: 'manufacture',
        name: 'Manufacture',
        screenDesignKey: 'manufacture',
        screenPermissionKey: 'manufacture',
        icon: 'ManufactureSvg',
        hideInMenu: false,
        hideChildrenInMenu: false,
        children: [
            {
                id: generateRandomId(),
                parent: 'manufacture',
                path: 'template',
                name: 'Formula Template',
                screenDesignKey: 'manufacture',
                screenPermissionKey: 'template',
                icon: 'FormulaTemplateSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/template',
                        path: 'add',
                        name: 'Add/Edit Formula Template',
                        screenDesignKey: 'product_template_add',
                        element: AddFormulaTemplateScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/template',
                        path: 'list',
                        name: 'Formula Template List',
                        screenDesignKey: 'product_templates_list',
                        element: ListFormulaTemplateScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/template',
                        path: ':id',
                        name: 'Items edit',
                        screenDesignKey: 'product_template_add',
                        element: AddFormulaTemplateScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/template',
                        path: 'list/detail/:id',
                        name: 'Template Item Detail',
                        screenDesignKey: 'product_template_detail',
                        element: DetailsFormulaTemplateScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/template',
                        path: 'quality_assurance/add',
                        name: 'Quality Assurance',
                        screenDesignKey: 'qa_add',
                        element: QualityAssuranceTemplateScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/template',
                        path: 'quality_assurance/:id',
                        name: 'Quality Assurance',
                        screenDesignKey: 'qa_add',
                        element: QualityAssuranceTemplateScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['add'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'manufacture',
                path: 'production',
                name: 'Production',
                screenDesignKey: 'manufacture',
                screenPermissionKey: 'production',
                icon: 'ProductionSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/production',
                        path: 'define',
                        name: 'Add/Edit Production',
                        screenDesignKey: 'production_define',
                        element: AddProductionScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/production',
                        path: 'list',
                        name: 'Productions List',
                        screenDesignKey: 'productions_list',
                        element: ListProductionScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/production',
                        path: ':id',
                        name: 'Edit Production',
                        screenDesignKey: 'production_define',
                        element: AddProductionScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/production',
                        path: 'list/detail/:id',
                        name: 'Productions Item Detail',
                        screenDesignKey: 'production_details',
                        element: DetailsProductionScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/production',
                        path: 'qa',
                        name: 'production qa',
                        screenDesignKey: 'production_qa',
                        element: QAProductionScreen,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/production',
                        path: 'packaging',
                        name: 'production packaging',
                        screenDesignKey: 'production_packaging',
                        element: PackageProductionScreen,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'manufacture',
                path: 'items',
                name: 'Items',
                screenDesignKey: 'manufacture',
                screenPermissionKey: 'items',
                icon: 'ItemsSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/items',
                        path: 'add',
                        name: 'Add/Edit Item',
                        screenDesignKey: 'item_add',
                        element: AddItemsScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/items',
                        path: 'list',
                        name: 'Items List',
                        screenDesignKey: 'items_list',
                        element: ListItemsScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/items',
                        path: ':id',
                        name: 'Edit Item',
                        screenDesignKey: 'item_add',
                        element: AddItemsScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/items',
                        path: 'list/detail/:id',
                        name: 'Items Details',
                        screenDesignKey: 'item_details',
                        element: DetailsItemsScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'manufacture',
                path: 'raw-material',
                name: 'Raw Material',
                screenDesignKey: 'manufacture',
                screenPermissionKey: 'raw-material',
                icon: 'RawMaterialSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/raw-material',
                        path: 'add',
                        name: 'Add/Edit Raw Material',
                        screenDesignKey: 'raw_material_add',
                        element: AddRawMaterialScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/raw-material',
                        path: 'list',
                        name: 'Raw Materials List',
                        screenDesignKey: 'raw_materials_list',
                        element: ListRawMaterialScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/raw-material',
                        path: ':id',
                        name: 'Edit Raw Material',
                        screenDesignKey: 'raw_material_add',
                        element: AddRawMaterialScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/raw-material',
                        path: 'list/detail/:id',
                        name: 'Raw Material Details',
                        screenDesignKey: 'raw_material_details',
                        element: DetailRawMaterialScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'manufacture',
                path: 'packaging-material',
                name: 'Packaging Material',
                screenDesignKey: 'manufacture',
                screenPermissionKey: 'packaging-material',
                icon: 'PackagingMaterialSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/packaging-material',
                        path: 'add',
                        name: 'Add/Edit Packaging Material',
                        screenDesignKey: 'packaging_material_add',
                        element: AddPackagingMaterialScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/packaging-material',
                        path: 'list',
                        name: 'Packaging Materials List',
                        screenDesignKey: 'packaging_materials_list',
                        element: ListPackagingMaterialScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/packaging-material',
                        path: ':id',
                        name: 'Edit Packaging Material',
                        screenDesignKey: 'packaging_material_add',
                        element: AddPackagingMaterialScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/packaging-material',
                        path: 'list/detail/:id',
                        name: 'Packaging Materials Details',
                        screenDesignKey: 'packaging_material_details',
                        element: DetailPackagingMaterialScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'manufacture',
                path: 'hierarchy',
                name: 'Hierarchy',
                screenDesignKey: 'manufacture',
                screenPermissionKey: 'hierarchy',
                icon: 'DivisionSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/hierarchy',
                        path: 'division/add',
                        name: 'Division',
                        screenDesignKey: 'division_add',
                        icon: '',
                        element: DivisionScreen,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/hierarchy',
                        path: 'division/:id',
                        name: 'Division',
                        screenDesignKey: 'division_add',
                        icon: '',
                        element: DivisionScreen,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/hierarchy',
                        path: 'department/add',
                        name: 'Department',
                        screenDesignKey: 'department_add',
                        element: DepartmentScreen,
                        icon: '',
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/hierarchy',
                        path: 'department/:id',
                        name: 'Department',
                        screenDesignKey: 'department_add',
                        element: DepartmentScreen,
                        icon: '',
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/hierarchy',
                        path: 'class/add',
                        name: 'Class',
                        screenDesignKey: 'class_add',
                        element: ClassScreen,
                        icon: '',
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/hierarchy',
                        path: 'class/:id',
                        name: 'Class',
                        screenDesignKey: 'class_add',
                        element: ClassScreen,
                        icon: '',
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/hierarchy',
                        path: 'hierarchy-management',
                        name: 'Hierarchy Management',
                        screenDesignKey: 'hierarchy_management',
                        element: HierarchyManagementScreen,
                        icon: '',
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/hierarchy',
                        path: 'hierarchy-management/:id',
                        name: 'Hierarchy Management',
                        screenDesignKey: 'hierarchy_management',
                        element: HierarchyManagementScreen,
                        icon: '',
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'manufacture/hierarchy',
                        path: 'list',
                        name: 'Hierarchy List',
                        screenDesignKey: 'hierarchies_list',
                        element: HierarchyListScreen,
                        icon: '',
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'manufacture',
                path: 'machine/add',
                name: 'Machine',
                screenDesignKey: 'machine_add',
                screenPermissionKey: 'machine',
                element: MachineScreen,
                icon: 'MachineSvg',
                hideInMenu: false,
                tagPermissions: ['add'],
            },
            {
                id: generateRandomId(),
                parent: 'manufacture',
                path: 'machine/:id',
                name: 'Machine',
                screenDesignKey: 'machine_add',
                screenPermissionKey: 'machine',
                element: MachineScreen,
                icon: 'MachineSvg',
                hideInMenu: true,
                tagPermissions: ['add'],
            },
            {
                id: generateRandomId(),
                parent: 'manufacture',
                path: 'phase/add',
                name: 'Phase',
                screenDesignKey: 'phase_add',
                screenPermissionKey: 'phase',
                element: PhaseScreen,
                icon: 'PhaseSvg',
                hideInMenu: false,
                tagPermissions: ['add', 'view'],
            },
            {
                id: generateRandomId(),
                parent: 'manufacture',
                path: 'phase/:id',
                name: 'Phase',
                screenDesignKey: 'phase_add',
                screenPermissionKey: 'phase',
                element: PhaseScreen,
                icon: 'PhaseSvg',
                hideInMenu: true,
                tagPermissions: ['add', 'view'],
            },
        ],
    },

    {
        id: generateRandomId(),
        path: 'partner',
        name: 'Business Partners',
        screenDesignKey: 'partner',
        screenPermissionKey: 'partner',
        icon: 'PartnerSvg',
        hideInMenu: false,
        hideChildrenInMenu: false,
        children: [
            {
                id: generateRandomId(),
                parent: 'partner',
                path: 'customer',
                name: 'Customers',
                screenDesignKey: 'partner',
                screenPermissionKey: 'customer',
                icon: 'CustomerSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'partner/customer',
                        path: 'add',
                        name: 'Add/Edit Customer',
                        screenDesignKey: 'customer_add',
                        element: AddCustomerScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/customer',
                        path: 'list',
                        name: 'Customers List',
                        screenDesignKey: 'customers_list',
                        element: ListCustomerScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/customer',
                        path: ':id',
                        name: 'Customers Edit',
                        screenDesignKey: 'customer_add',
                        element: AddCustomerScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/customer',
                        path: 'list/detail/:id',
                        name: 'Customers Details',
                        screenDesignKey: 'customer_details',
                        element: DetailsCustomerScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/customer',
                        path: 'term/add',
                        name: 'Customer Terms',
                        screenDesignKey: 'customer_terms',
                        element: TermsCustomerScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/customer',
                        path: 'term/:id',
                        name: 'Customer Terms',
                        screenDesignKey: 'customer_terms',
                        element: TermsCustomerScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/customer',
                        path: 'type/add',
                        name: 'Customer Types',
                        screenDesignKey: 'customer_types',
                        element: TypeCustomerScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/customer',
                        path: 'type/:id',
                        name: 'Edit Customer Types',
                        screenDesignKey: 'customer_types',
                        element: TypeCustomerScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/customer',
                        path: 'category/add',
                        name: 'Customer Categories',
                        screenDesignKey: 'customer_categories',
                        element: CategoriesCustomerScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/customer',
                        path: 'category/:id',
                        name: 'Edit Customer Categories',
                        screenDesignKey: 'customer_categories',
                        element: CategoriesCustomerScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'partner',
                path: 'vendor',
                name: 'Vendor',
                screenDesignKey: 'partner',
                screenPermissionKey: 'vendor',
                icon: 'VendorSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'partner/vendor',
                        path: 'add',
                        name: 'Add/Edit Vendor',
                        screenDesignKey: 'vendor_add',
                        element: AddVendorScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/vendor',
                        path: 'list',
                        name: 'Vendor List',
                        screenDesignKey: 'vendors_list',
                        element: ListVendorScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/vendor',
                        path: ':id',
                        name: 'Vendor Edit',
                        screenDesignKey: 'vendor_add',
                        element: AddVendorScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/vendor',
                        path: 'term/add',
                        name: 'Vendor Terms',
                        screenDesignKey: 'vendor_terms',
                        element: TermsVendorScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/vendor',
                        path: 'term/:id',
                        name: 'Edit Vendor Terms',
                        screenDesignKey: 'vendor_terms',
                        element: TermsVendorScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/vendor',
                        path: 'category/add',
                        name: 'Vendor Category',
                        screenDesignKey: 'vendor_categories',
                        element: CategoryVendorScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/vendor',
                        path: 'category/:id',
                        name: 'Edit Vendor Categories',
                        screenDesignKey: 'vendor_categories',
                        element: CategoryVendorScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/vendor',
                        path: 'list/detail/:id',
                        name: 'Vendor Details',
                        screenDesignKey: 'vendor_details',
                        element: DetailsVendorScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },

            {
                id: generateRandomId(),
                parent: 'partner',
                path: 'salesperson',
                name: 'Salesperson',
                screenDesignKey: 'partner',
                screenPermissionKey: 'salesperson',
                icon: 'SalespersonSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'partner/salesperson',
                        path: 'add',
                        name: 'Add/Edit Salesperson',
                        screenDesignKey: 'salesperson_add',
                        element: AddSalesPersonScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'partner/salesperson',
                        path: ':id',
                        name: 'Salesperson Edit',
                        screenDesignKey: 'salesperson_add',
                        element: AddSalesPersonScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                ],
            },
        ],
    },

    {
        id: generateRandomId(),
        path: 'sales',
        name: 'Sales',
        screenDesignKey: 'sales',
        screenPermissionKey: 'sales',
        icon: 'SaleSvg',
        hideInMenu: false,
        hideChildrenInMenu: false,
        children: [
            {
                id: generateRandomId(),
                parent: 'sales',
                path: 'order',
                name: 'Order',
                screenDesignKey: 'sales',
                screenPermissionKey: 'order',
                icon: 'OrderSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'sales/order',
                        path: 'add',
                        name: 'Add/Edit Order',
                        screenDesignKey: 'order_add',
                        element: AddOrderScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/order',
                        path: 'list',
                        name: 'Order List',
                        screenDesignKey: 'orders_list',
                        element: ListOrderScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/order',
                        path: ':id',
                        name: 'Order Edit',
                        screenDesignKey: 'order_add',
                        element: AddOrderScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/order',
                        path: 'list/detail/:id',
                        name: 'Order Details',
                        screenDesignKey: 'order_details',
                        element: DetailsOrderScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'sales',
                path: 'pick_ticket',
                name: 'Pick Ticket',
                screenDesignKey: 'sales',
                screenPermissionKey: 'pick_ticket',
                icon: 'PickTicket',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'sales/pick_ticket',
                        path: 'add',
                        name: 'Edit Pick Ticket',
                        screenDesignKey: 'pick_ticket_add',
                        element: AddPickTicketScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/pick_ticket',
                        path: 'list',
                        name: 'Pick Ticket List',
                        screenDesignKey: 'pick_tickets_list',
                        element: ListPickTicketScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/pick_ticket',
                        path: ':id',
                        name: 'Pick Ticket Edit',
                        screenDesignKey: 'pick_ticket_add',
                        element: AddPickTicketScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/pick_ticket',
                        path: 'list/detail/:id',
                        name: 'Pick Ticket Details',
                        screenDesignKey: 'pick_ticket_details',
                        element: DetailsPickTicketScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'sales',
                path: 'invoice',
                name: 'Invoice',
                screenDesignKey: 'sales',
                screenPermissionKey: 'invoices',
                icon: 'InvoiceSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'sales/invoice',
                        path: 'add',
                        name: 'Add/Edit Invoice',
                        screenDesignKey: 'invoice_add',
                        element: AddInvoiceScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/invoice',
                        path: 'list',
                        name: 'Invoice List',
                        screenDesignKey: 'invoices_list',
                        element: ListInvoiceScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/invoice',
                        path: ':id',
                        name: 'Invoice Edit',
                        screenDesignKey: 'invoice_add',
                        element: AddInvoiceScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/invoice',
                        path: 'list/detail/:id',
                        name: 'Invoice Details',
                        screenDesignKey: 'invoice_details',
                        element: DetailsInvoiceScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'sales',
                path: 'ship',
                name: 'Ship Via',
                screenDesignKey: 'sales',
                screenPermissionKey: 'ship_via',
                icon: 'ShipVia',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'sales/ship',
                        path: 'add',
                        name: 'Add/Edit Ship Via',
                        screenDesignKey: 'ship_via_add',
                        element: AddShipViaScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/ship',
                        path: 'list',
                        name: 'Ship Via List',
                        screenDesignKey: 'ship_via_list',
                        element: ListShipViaScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/ship',
                        path: ':id',
                        name: 'Ship Via Edit',
                        screenDesignKey: 'ship_via_add',
                        element: AddShipViaScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/ship',
                        path: 'list/detail/:id',
                        name: 'Ship Via Details',
                        screenDesignKey: 'ship_via_details',
                        element: DetailsShipViaScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'sales',
                path: 'credits',
                name: 'Credit',
                screenDesignKey: 'sales',
                screenPermissionKey: 'credit',
                icon: 'CreditSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'sales/credits',
                        path: 'add',
                        name: 'Add/Edit Credit',
                        screenDesignKey: 'credit_add',
                        element: AddCreditScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/credits',
                        path: 'list',
                        name: 'Credit List',
                        screenDesignKey: 'credits_list',
                        element: ListCreditScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/credits',
                        path: ':id',
                        name: 'Credit Edit',
                        screenDesignKey: 'credit_add',
                        element: AddCreditScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/credits',
                        path: 'list/detail/:id',
                        name: 'Credit Details',
                        screenDesignKey: 'credit_details',
                        element: DetailsCreditScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'sales',
                path: 'purchaseOrder',
                name: 'Purchase Order',
                screenDesignKey: 'sales',
                screenPermissionKey: 'purchase_order',
                icon: 'PurchaseOrder',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'sales/PurchaseOrder',
                        path: 'add',
                        name: 'Add/Edit Purchase Order',
                        screenDesignKey: 'purchase_order_add',
                        element: AddPurchaseOrderScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/PurchaseOrder',
                        path: 'list',
                        name: 'Purchase Order List',
                        screenDesignKey: 'purchase_orders_list',
                        element: ListPurchaseOrderScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/PurchaseOrder',
                        path: 'receipt/add',
                        name: 'Add/Edit PO Receipt',
                        screenDesignKey: 'purchase_order_receipt',
                        element: AddPurchaseOrderReceiptScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/PurchaseOrder',
                        path: 'receipt/list',
                        name: 'PO Receipt List',
                        screenDesignKey: 'purchase_order_receipts_list',
                        element: ListPurchaseOrderReceiptScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/PurchaseOrder',
                        path: ':id',
                        name: 'Purchase Order Edit',
                        screenDesignKey: 'purchase_order_add',
                        element: AddPurchaseOrderScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/PurchaseOrder',
                        path: 'receipt/:id',
                        name: 'PO Receipt Edit',
                        screenDesignKey: 'purchase_order_receipt',
                        element: AddPurchaseOrderReceiptScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/PurchaseOrder',
                        path: 'list/detail/:id',
                        name: 'Purchase Order Details',
                        screenDesignKey: 'purchase_order_details',
                        element: DetailsPurchaseOrderScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/PurchaseOrder',
                        path: 'receipt/list/detail/:id',
                        name: 'PO Receipt Details',
                        screenDesignKey: 'purchase_order_receipt_details',
                        element: DetailsPurchaseOrderReceiptScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'sales',
                path: 'adjustment',
                name: 'Adjustment',
                screenDesignKey: 'sales',
                screenPermissionKey: 'adjustment',
                icon: 'AdjustmentSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'sales/adjustment',
                        path: 'add',
                        name: 'Add/Edit Adjustment',
                        screenDesignKey: 'adjustment_add',
                        element: AddAdjustmentScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/adjustment',
                        path: 'list',
                        name: 'Adjustment List',
                        screenDesignKey: 'adjustment_list',
                        element: ListAdjustmentScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/adjustment',
                        path: ':id',
                        name: 'Edit Adjustment',
                        screenDesignKey: 'adjustment_add',
                        element: AddAdjustmentScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/adjustment',
                        path: 'list/detail/:id',
                        name: 'Adjustment Details',
                        screenDesignKey: 'adjustment_details',
                        element: DetailsAdjustmentScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/adjustment',
                        path: 'cost_adjustment/add',
                        name: 'Add/Edit Cost Adjustment',
                        screenDesignKey: 'cost_adjustment_add',
                        element: AddCostAdjustmentScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/adjustment',
                        path: 'cost_adjustment/list',
                        name: 'Cost Adjustment List',
                        screenDesignKey: 'cost_adjustments_list',
                        element: ListCostAdjustmentScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/adjustment',
                        path: 'cost_adjustment/:id',
                        name: 'Edit Cost Adjustment',
                        screenDesignKey: 'cost_adjustment_add',
                        element: AddCostAdjustmentScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/adjustment',
                        path: 'cost_adjustment/list/detail/:id',
                        name: 'Cost Adjustment Details',
                        screenDesignKey: 'cost_adjustment_details',
                        element: DetailsCostAdjustmentScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'sales',
                path: 'accounting/CashApplication',
                name: 'Accounting',
                screenDesignKey: 'sales',
                screenPermissionKey: 'cash_application',
                icon: 'AccountingSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'sales/accounting/CashApplication',
                        path: 'add',
                        name: 'Add/Edit Cash Application',
                        screenDesignKey: 'cash_application_add',
                        element: AddCashApplicationScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/accounting/CashApplication',
                        path: 'list',
                        name: 'Payments List',
                        screenDesignKey: 'cash_application_list',
                        element: ListCashApplicationScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/accounting/CashApplication',
                        path: ':id',
                        name: 'Edit Cash Application',
                        screenDesignKey: 'cash_application_add',
                        element: AddCashApplicationScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'sales/accounting/CashApplication',
                        path: 'list/detail/:id',
                        name: 'Payments Details',
                        screenDesignKey: 'cash_application_details',
                        element: DetailsCashApplicationScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
        ],
    },
    {
        id: generateRandomId(),
        path: 'report',
        name: 'Reports',
        screenDesignKey: 'reports',
        screenPermissionKey: 'reports',
        icon: 'ReportSvg',
        hideInMenu: false,
        hideChildrenInMenu: false,
        children: [
            {
                id: generateRandomId(),
                parent: 'report',
                path: 'item',
                name: 'ItemReports',
                screenDesignKey: 'item_inventory_and_price',
                screenPermissionKey: 'item_inventory_and_price',
                icon: 'ReportItemSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'report/item',
                        path: 'inventory_and_price',
                        name: 'Inventory And Price',
                        screenDesignKey: 'item_inventory_and_price',
                        element: Report_Item_InventoryAndPricePage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'report',
                path: 'raw_material',
                name: 'Raw Material',
                screenDesignKey: 'raw_material_inventory_and_price',
                screenPermissionKey: 'item_inventory_and_price',
                icon: 'ReportRawMaterialSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'report/raw_material',
                        path: 'inventory_and_price',
                        name: 'Inventory And Price',
                        screenDesignKey: 'raw_material_inventory_and_price',
                        element: Report_raw_material_InventoryAndPricePage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'report',
                path: 'packaging_material',
                name: 'Packaging Material',
                screenDesignKey: 'packaging_material_inventory_and_price',
                screenPermissionKey: 'packaging_material_inventory_and_price',
                icon: 'ReportPackagingSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'report/packaging_material',
                        path: 'inventory_and_price',
                        name: 'Inventory And Price',
                        screenDesignKey:
                            'packaging_material_inventory_and_price',
                        element:
                            Report_packaging_material_InventoryAndPricePage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'report',
                path: 'sales',
                name: 'SalesReports',
                screenDesignKey: 'reports',
                screenPermissionKey: 'sales_by_customer',
                icon: 'ReportSalesSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'report/sales',
                        path: 'sales_by_customer',
                        name: 'Sales by Customer',
                        screenDesignKey: 'sales_by_customer',
                        element: Report_CustomerByReportPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'report/sales',
                        path: 'customer_payments_summary',
                        name: 'Customer Payments Summary',
                        screenDesignKey: 'customer_payments_summary',
                        element: Report_CustomerPaymentsSummary,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                ],
            },
        ],
    },
    // {
    //     id: generateRandomId(),
    //     path: 'shipping',
    //     name: 'Shipping',
    //     screenDesignKey: 'sales',
    //     screenPermissionKey: 'sales',
    //     icon: 'SaleSvg',
    //     hideInMenu: false,
    //     hideChildrenInMenu: false,
    //     children: [],
    // },

    {
        id: generateRandomId(),
        path: 'setting',
        name: 'Setting',
        screenDesignKey: 'setting',
        screenPermissionKey: 'setting',
        icon: 'SettingSvg',
        hideInMenu: false,
        hideChildrenInMenu: false,
        children: [
            {
                id: generateRandomId(),
                parent: 'setting',
                path: 'general-setting',
                name: 'General Setting',
                screenDesignKey: 'setting',
                screenPermissionKey: 'general_settings',
                icon: 'GeneralSettingSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'setting/general-setting',
                        path: 'config-options',
                        name: 'Config Options',
                        screenDesignKey: 'config_options',
                        element: ConfigOptionScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/general-setting',
                        path: 'config-tax-rate/add',
                        name: 'Add/Edit Config Taxes Rate',
                        screenDesignKey: 'config_taxes_rate',
                        element: ConfigTaxesRateScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/general-setting',
                        path: 'config-tax-rate/:id',
                        name: 'Config Taxes Rate Edit',
                        screenDesignKey: 'config_taxes_rate',
                        element: ConfigTaxesRateScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/general-setting',
                        path: 'config-sequential-numbers/add',
                        name: 'Set Sequential Numbers',
                        screenDesignKey: 'set_sequential_numbers',
                        element: ConfigSequentialNumbersScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/general-setting',
                        path: 'config-sequential-numbers/:id',
                        name: 'Set Sequential Numbers',
                        screenDesignKey: 'set_sequential_numbers',
                        element: ConfigSequentialNumbersScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'setting',
                path: 'user',
                name: 'User',
                screenDesignKey: 'setting',
                screenPermissionKey: 'user',
                icon: 'UserSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'setting/user',
                        path: 'add',
                        name: 'Add/Edit User',
                        screenDesignKey: 'user_add',
                        element: AddUserScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/user',
                        path: 'list',
                        name: 'Users List',
                        screenDesignKey: 'users_list',
                        element: ListUserScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/user',
                        path: ':id',
                        name: 'User Edit',
                        screenDesignKey: 'user_add',
                        element: AddUserScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/user',
                        path: 'list/detail/:id',
                        name: 'User Item Detail',
                        screenDesignKey: 'user_details',
                        element: DetailsUserScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'setting',
                path: 'role',
                name: 'Role',
                screenDesignKey: 'setting',
                screenPermissionKey: 'role',
                icon: 'RoleSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'setting/role',
                        path: 'add',
                        name: 'Add Role',
                        screenDesignKey: 'role_add',
                        element: AddRoleScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/role',
                        path: 'list',
                        name: 'Role List',
                        screenDesignKey: 'roles_list',
                        element: ListRoleScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/role',
                        path: ':id',
                        name: 'Role Edit',
                        screenDesignKey: 'role_add',
                        element: AddRoleScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/role',
                        path: 'list/detail/:id',
                        name: 'Role Item Detail',
                        screenDesignKey: 'role_details',
                        element: DetailsRoleScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'setting',
                path: 'BugReport',
                name: 'Bug Report',
                screenDesignKey: 'setting',
                screenPermissionKey: 'bug_report',
                icon: 'BugReportSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'setting/BugReport',
                        path: 'add',
                        name: 'Add Bug Report',
                        screenDesignKey: 'bug_report_add',
                        element: AddBugReportScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/BugReport',
                        path: ':id',
                        name: 'Edit Bug Report',
                        screenDesignKey: 'bug_report_add',
                        element: AddBugReportScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/BugReport',
                        path: 'list',
                        name: 'Bug Report List',
                        screenDesignKey: 'bug_report_list',
                        element: ListBugReportScreenPage,
                        hideInMenu: false,
                        tagPermissions: ['view'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/BugReport',
                        path: 'list/detail/:id',
                        name: 'Bug Report Detail',
                        screenDesignKey: 'bug_report_details',
                        element: DetailsBugReportScreenPage,
                        hideInMenu: true,
                        tagPermissions: ['view'],
                    },
                ],
            },
            {
                id: generateRandomId(),
                parent: 'setting',
                path: 'Personnel',
                name: 'Personnel',
                screenDesignKey: 'setting',
                screenPermissionKey: 'bug_report',
                icon: 'UserSvg',
                hideInMenu: false,
                hideChildrenInMenu: false,
                children: [
                    {
                        id: generateRandomId(),
                        parent: 'setting/Personnel',
                        path: 'add',
                        name: 'Add/Edit Employee',
                        screenDesignKey: 'employee_add',
                        element: EmployeeScreen,
                        hideInMenu: false,
                        tagPermissions: ['add'],
                    },
                    {
                        id: generateRandomId(),
                        parent: 'setting/Personnel',
                        path: ':id',
                        name: 'Add/Edit Employee',
                        screenDesignKey: 'employee_add',
                        element: EmployeeScreen,
                        hideInMenu: true,
                        tagPermissions: ['edit'],
                    },
                ],
            },
        ],
    },

    {
        path: '/test',
        name: 'TestPage',
        element: TestPage,
        hideInMenu: true,
        tagPermissions: ['add'],
    },

    {
        path: '/no-access',
        name: 'NoAccess',
        element: NoAccessPage,
        hideInMenu: true,
    },

    {
        path: '*',
        name: 'NotFound',
        element: ErrorsPage,
        hideInMenu: true,
    },
];

export const authRoutes = [
    {
        parent: 'auth',
        path: 'login',
        name: 'Login',
        element: Login,
        hideInMenu: false,
        hideChildrenInMenu: false,
    },
    {
        path: '*',
        name: 'NotFound',
        element: ErrorsPage,
        hideInMenu: true,
    },
];
