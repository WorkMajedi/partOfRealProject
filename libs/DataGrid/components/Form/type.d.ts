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
}
