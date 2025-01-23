export interface Field {
    name: string;
    id?: string;
    label: string;
    type: string;
    width: number;
    onClick: any;
    component_type: string;
    required: boolean;
    editable: boolean;
    is_show: boolean;
    isLoadingButton: boolean;
    skip_in_navigation: boolean;
    disable: boolean;
    error_possibles: any[];
    special_validation: any[];
    on_focus_functions: any[];
    on_change_functions: any[];
    on_exit_functions: any[];
    args: FieldArgs;
    source_field: FieldSourceField;
    default_value: string;
    initialFetch: string | boolean;
    order_number: number;
    onFocus: any;
    onChange: any;
    onBlur: any;
    defaultRows: any[];
    navigateToEdit?: (id: number) => void;
}

export interface FieldArgs {
    [x: string]: any;
    search_url?: string;
    base_url?: string;
    choices?: string[];
    upload_url?: string;
    grid_data?: Costs;
}

export interface ModalfieldArgs {
    grid_data?: Costs;
}

export interface Modalfield {
    owner: Owner;
    on_change_functions: any[];
    source_field: detailsourceField;
    editable: boolean;
    order_number: number;
    default_value: string;
    special_validation: any[];
    label: string;
    type: string;
    is_show: boolean;
    required: boolean;
    on_exit_functions: any[];
    args: ModalfieldArgs;
    skip_in_navigation: boolean;
    width: string;
    name: string;
    on_focus_functions: any[];
    FID: string;
}

export interface Costs {
    owner: Owner;
    name: string;
    type: string;
    gridcolumns?: Gridcolumn[];
    FID: string;
    details?: Modalfield[];
}

export enum Owner {
    The61RyuIRARURkKFigWSlJFLPHZzJ3 = '61ryuIRARURkKFigWSlJFlPHZzJ3',
}

export interface detailsourceField {
    args?: string;
    owner?: Owner;
    tmp_id?: string;
    order_number?: string;
    name?: string;
    label?: string;
    type: string;
    FID?: string;
    reference?: string;
    id?: string;
}

export interface Gridcolumn {
    name: string;
    label: string;
    type: ComponentTypeEnum;
    width: string;
    component_type: ComponentTypeEnum;
    required: boolean;
    editable: boolean;
    is_show: boolean;
    skip_in_navigation: boolean;
    disable: boolean;
    error_possibles: any[];
    special_validation: any[];
    on_focus_functions: any[];
    on_change_functions: any[];
    on_exit_functions: any[];
    args: GridcolumnArgs;
    source_field: GridcolumnSourceField;
    default_value: string;
    order_number: number;
    enter_for_add_row: boolean;
    pined: boolean;
    sorted: boolean;
    FID: string;
}

export interface GridcolumnArgs {
    actions?: string[];
    choices?: string[];
    search_url?: string;
}

export enum ComponentTypeEnum {
    GridAction = 'GridAction',
    GridAutoComplete = 'GridAutoComplete',
    GridDropDown = 'GridDropDown',
    GridRadio = 'GridRadio',
    GridSimple = 'GridSimple',
}

export interface GridcolumnSourceField {
    reference?: string;
    id?: string;
    type?: SourceFieldType;
}

export enum SourceFieldType {
    Field = 'field',
    Grid = 'grid',
}

export interface FieldSourceField {
    args?: string;
    owner?: Owner;
    tmp_id?: string;
    order_number?: number | string;
    name?: string;
    label?: string;
    type: string;
    FID?: string;
    onChange_functions?: any[];
    hidden?: boolean;
    width?: number;
    special_validation?: any[];
    onExit_functions?: any[];
    reference?: string;
    id?: string;
}
export interface IRoute {
    id: string;
    path: string;
    name: string;
    screenDesignKey?: string;
    screenPermissionKey?: string;
    icon?: string;
    hideInMenu?: boolean;
    hideChildrenInMenu?: boolean;
    tagPermissions?: string[];
    element?: React.ReactNode; // React component or JSX
    children?: IRoute[];
}
