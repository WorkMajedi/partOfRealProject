import { useCallback } from 'react';

export const overrideFields = (
    fields: any[],
    newFields: any[],
    name: string = 'name',
) => {
    if (!Array.isArray(fields)) {
        throw new Error('The "fields" parameter must be an array.');
    } else {
        const nmf = [...fields];
        for (let i = 0; i < newFields.length; i++) {
            const nField = newFields[i];
            const fIndex = nmf.findIndex(
                x => x[`${name}`] === nField[`${name}`],
            );
            if (fIndex !== -1) {
                nmf[fIndex] = {
                    ...nmf[fIndex],
                    ...nField,
                    args: {
                        ...(!nField?.args
                            ? { ...nmf[fIndex]?.args }
                            : {
                                  ...nmf[fIndex]?.args,
                                  ...nField?.args,
                                  grid_data: {
                                      ...nmf[fIndex]?.args?.grid_data,
                                      ...nField?.args?.grid_data,
                                      gridcolumns: !!nField?.args?.grid_data
                                          ?.gridcolumns?.length
                                          ? overrideFields2(
                                                nmf[fIndex]?.args?.grid_data
                                                    ?.gridcolumns || [],

                                                nField?.args?.grid_data
                                                    ?.gridcolumns || [],
                                            )
                                          : nmf[fIndex]?.args?.grid_data
                                                ?.gridcolumns,
                                  },
                              }),
                    },
                };
            } else {
                nmf.push(nField);
            }
        }
        return nmf;
    }
};
export const updateModals = (
    modals: any[],
    updates: { modalName: string; fields: any[] }[],
) => {
    const updatedModals = [...modals];
    updates.forEach(update => {
        const { modalName, fields } = update;
        const modalIndex = updatedModals.findIndex(
            modal => modal[modalName] !== undefined,
        );
        if (modalIndex !== -1) {
            updatedModals[modalIndex][modalName].fields = overrideFields(
                updatedModals[modalIndex][modalName].fields,
                fields,
            );
        } else {
            console.error(`Modal ${modalName} not found`);
        }
    });
    return updatedModals;
};
/// ///////////////////////////////////////////////////////////// new function   getModal
interface Field {
    name: string;
    label?: string;
    type?: string;
    width?: string;
    component_type?: string;
    required?: boolean;
    editable?: boolean;
    is_show?: boolean;
    skip_in_navigation?: boolean;
    disable?: boolean;
    error_possibles?: any[];
    special_validation?: any[];
    on_focus_functions?: any[];
    on_change_functions?: any[];
    on_exit_functions?: any[];
    args?: { [key: string]: any };
    source_field?: any;
    related_modal?: any;
    default_value?: string;
    order_number?: number;
    id?: string;
    fields?: any;
}

interface Modal {
    name: string;
    fields: Field[];
}

function deepCopy(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(deepCopy);
    }
    const newObj: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = deepCopy(obj[key]);
        }
    }
    return newObj;
}

export const overrideFields2 = (
    fields: Field[],
    newFields: Field[],
): Field[] => {
    const copiedFields = fields.map(deepCopy);
    for (const newField of newFields) {
        const existingFieldIndex = copiedFields.findIndex(
            field => field.name === newField.name,
        );
        if (existingFieldIndex !== -1) {
            copiedFields[existingFieldIndex] = {
                ...copiedFields[existingFieldIndex],
                ...newField,
            };
        } else {
            copiedFields.push(newField);
        }
    }
    return copiedFields;
};

export const updateModals2 = (
    modals: any[],
    updates: { modalName: string; fields: Field[] }[],
): Modal[] => {
    const updatedModals = [...modals];
    for (const update of updates) {
        const { modalName, fields } = update;
        const modalIndex = updatedModals.findIndex(
            modal => modal[modalName] !== undefined,
        );
        if (modalIndex !== -1) {
            updatedModals[modalIndex].fields = overrideFields2(
                updatedModals[modalIndex].fields,
                fields,
            );
        } else {
            console.error(`Modal ${modalName} not found`);
        }
    }
    return updatedModals;
};
