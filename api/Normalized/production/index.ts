// add normalized
import { deleteProps } from 'utils/utils';

const getDefine = (data: any, isNotUseTemp: boolean = false) => {
    const res = data?.product_template;
    const {
        attachments,
        status,
        machine,
        description,
        comment,
        instruction,
        ...restData
    } = data;

    const productTemplateCriticalPath = isNotUseTemp
        ? restData?.final_product_template?.product_template_critical_path
        : restData?.product_template_critical_path;
    const product_template_critical_path = !!productTemplateCriticalPath
        ? productTemplateCriticalPath.map((item: any) => {
            return {
                ...item.phase,
                ...item,
                phaseId: item?.phase?.id,
                ...(isNotUseTemp ? { ptcpId: item.id } : {}),
                product_template_raw_material:
                    !!item?.product_template_raw_material?.length &&
                    item?.product_template_raw_material.map((rwaM: any) => {
                        return {
                            ...rwaM,
                            ...rwaM?.inventory,
                            backendId: rwaM?.inventory?.id,
                            ...(isNotUseTemp ? { itemId: rwaM?.id } : {}),
                        };
                    }),
            };
        })
        : [];
    const temp_product_template_critical_path = !!restData?.product_template
        ?.product_template_critical_path
        ? restData?.product_template?.product_template_critical_path.map(
            (item: any) => {
                return {
                    ...item.phase,
                    ...item,
                    phaseId: item?.phase?.id,
                    // ptcpId: item.id,
                    product_template_raw_material:
                        !!item?.product_template_raw_material?.length &&
                        item?.product_template_raw_material.map(
                            (rwaM: any) => {
                                return {
                                    ...rwaM,
                                    ...rwaM?.inventory,
                                    backendId: rwaM?.inventory?.id,
                                    // itemId: rwaM?.id,
                                    // backendId: rwaM?.raw_material?.id,
                                };
                            },
                        ),
                };
            },
        )
        : [];

    if (isNotUseTemp) {
        return {
            ...restData,
            ...res,
            description,
            comment,
            instruction,
            status,
            attachments,
            machine: machine?.id,
            machine_volume: machine?.machine_volume,
            template: res,
            temp_product_template_critical_path,
            production_define_packaging:
                restData?.packaging &&
                restData.packaging.map((pkg: any) => ({
                    ...pkg,
                    packageId: pkg?.id,
                })),
            product_template_critical_path,
            final_product_template: {
                ...(!!restData?.final_product_template?.id
                    ? { ...restData?.final_product_template }
                    : {}),
                product_template_critical_path,
                formula: data?.id,
            },
        };
    }

    return {
        ...restData,
        status,
        description,
        comment,
        instruction,
        template: restData,
        temp_product_template_critical_path,
        machine_volume: machine?.machine_volume,
        production_volume_uom:
            restData?.formula_volume_uom || restData?.production_volume_uom,
        product_template_critical_path:
            !!product_template_critical_path &&
            product_template_critical_path.map((item: any) => {
                return {
                    ...item.phase,
                    ...item,
                    phaseId: item?.phase?.id,
                    ...(isNotUseTemp ? { ptcpId: item.id } : {}),
                    product_template_raw_material:
                        !!item?.product_template_raw_material?.length &&
                        item?.product_template_raw_material.map((rwaM: any) => {
                            return {
                                ...rwaM,
                                ...rwaM?.inventory,
                                backendId: rwaM?.inventory?.id,
                                ...(isNotUseTemp ? { itemId: rwaM?.id } : {}),
                            };
                        }),
                };
            }),
    };
};
const getQa = (data: any) => {
    const {
        product_template: {
            qa,
            attachments: attachmentsTemplate,
            ...restTemplate
        },
        attachments,
        machine,
        customer,
        final_product_template,
        description,
        comment,
        instruction,
        ...resData
    } = data;
    const productQa = !!resData?.qa?.length
        ? resData?.qa
        : !!qa?.length
            ? qa
            : [];

    return {
        ...resData,
        ...restTemplate,
        template: restTemplate,
        description,
        comment,
        instruction,
        machine,
        machine_volume: machine?.machine_volume,
        customer: customer?.id,
        yield_field: resData?.yield_field === '0' ? null : resData?.yield_field,
        qa: productQa.map((item: any) => {
            return {
                ...item,
                ...item?.quality_assurance,
                qaId: item.id,
                backendId: item?.quality_assurance?.id,
            };
        }),
        product_template_critical_path:
            !!final_product_template?.product_template_critical_path?.length &&
            final_product_template.product_template_critical_path.map(
                (item: any) => {
                    return {
                        ...item.phase,
                        ...item,
                        phaseId: item?.phase?.id,
                        ptcpId: item.id,
                        product_template_raw_material:
                            !!item?.product_template_raw_material?.length &&
                            item?.product_template_raw_material.map(
                                (rwaM: any) => {
                                    return {
                                        ...rwaM,
                                        ...rwaM?.inventory,
                                        backendId: rwaM?.inventory?.id,
                                        itemId: rwaM?.id,
                                    };
                                },
                            ),
                    };
                },
            ),
        unchangedResponse: { ...data },
    };
};
const getPackage = (data: any) => {
    const {
        product_template: {
            qa,
            attachments: attachmentsTemplate,
            ...restTemplate
        },
        attachments,
        machine,
        customer,
        final_product_template,
        description,
        comment,
        instruction,
        ...resData
    } = data;

    const productQa = !!resData?.qa?.length
        ? resData?.qa
        : !!qa?.length
            ? qa
            : [];

    return {
        ...resData,
        ...restTemplate,
        template: restTemplate,
        description,
        comment,
        instruction,
        machine,
        machine_volume: machine?.machine_volume,
        customer: customer?.id,
        product_template_critical_path:
            !!final_product_template?.product_template_critical_path?.length &&
            final_product_template.product_template_critical_path.map(
                (item: any) => {
                    return {
                        ...item.phase,
                        ...item,
                        phaseId: item?.phase?.id,
                        ptcpId: item.id,
                        product_template_raw_material:
                            !!item?.product_template_raw_material?.length &&
                            item?.product_template_raw_material.map(
                                (rwaM: any) => {
                                    return {
                                        ...rwaM,
                                        ...rwaM?.inventory,
                                        backendId: rwaM?.inventory?.id,
                                        itemId: rwaM?.id,
                                    };
                                },
                            ),
                    };
                },
            ),
        qa: productQa.map((item: any) => {
            return {
                ...item,
                ...item?.quality_assurance,
                qaId: item.id,
                backendId: item?.quality_assurance?.id,
            };
        }),
        packaging: !!resData?.packaging.length
            ? resData.packaging.map((pkg: any) => ({
                ...pkg,
                packageId: pkg?.id,
            }))
            : [],
        unchangedResponse: { ...data },
    };
};
const insertDefine = (data: any, id: number) => {
    const { division, department, class_obj, color, template } = data;

    const product_template_critical_path =
        data?.product_template_critical_path?.map(
            ({
                details,
                id,
                backendId,
                index,
                rowId,
                ptcpId,
                phaseId,
                product_template_raw_material,
                ...rest
            }: any) => {
                const formatRawMaterials =
                    !!product_template_raw_material?.length
                        ? product_template_raw_material.map(
                            ({
                                id,
                                index,
                                rowId,
                                itemId,
                                backendId,
                                ...restRaw
                            }: any) => ({
                                ...restRaw,
                                ...(!!itemId ? { id: itemId } : { id: null }),
                                // raw_material: backendId,
                                obj_id: backendId,
                            }),
                        )
                        : [];
                console.log(ptcpId, '-- ptcpId  --');
                return {
                    ...rest,
                    ...details,
                    ...(!!ptcpId ? { id: ptcpId } : { id: null }),
                    phase: backendId || phaseId,
                    phase_actual_end_date: rest?.phase_actual_end_date || null,
                    phase_actual_start_date:
                        rest?.phase_actual_start_date || null,
                    phase_estimated_end_date:
                        rest?.phase_estimated_end_date || null,
                    phase_estimated_start_date:
                        rest?.phase_estimated_start_date || null,
                    product_template_raw_material: formatRawMaterials,
                };
            },
        );

    const packaging = data?.packaging?.map(
        ({ id, index, rowId, packageId, ...restItem }: any) => {
            return {
                ...restItem,
                ...(!!packageId ? { id: packageId } : {}),
                produced_qty: !!restItem.data?.produced_qty
                    ? Number(restItem.data?.produced_qty)
                    : null,
                requested_qty: !!restItem.data?.requested_qty
                    ? Number(restItem.data?.requested_qty)
                    : null,
            };
        },
    );

    const updateData: any = {
        ...data,
        division: division?.id,
        department: department?.id,
        class_obj: class_obj?.id,
        color: color?.id,
        template: template?.id,
        production_code:
            data?.production_code ||
            data?.production_code?.value ||
            data?.production_code?.id,
        approved_by: data?.approved_by?.username || '',
        product_template: data?.id,
        cancel_date: data?.cancel_date,
        product_template_critical_path,
        packaging,
        final_product_template: {
            ...(!!data?.final_product_template?.id
                ? { ...data?.final_product_template }
                : {}),
            product_template_critical_path,
            formula: data?.id,
        },
    };

    if (data?.customer) {
        updateData.customer =
            typeof data?.customer === 'string' ||
                typeof data?.customer === 'number'
                ? +data?.customer
                : data?.customer?.id || data?.customer;
    }

    deleteProps(updateData, [
        'production_define_packaging',
        'unchangedResponse',
        'approved_by',
        'qa',
        'temp_product_template_critical_path',
    ]);
    console.log(updateData, '-- updateDate  --');
    return updateData;
};
const insertQa = (data: any, id: number) => {
    const {
        division,
        department,
        class_obj,
        color,
        template,
        final_product_template,
        ...resData
    } = data;

    const product_template_critical_path =
        data?.product_template_critical_path?.map(
            ({
                details,
                id,
                backendId,
                index,
                rowId,
                ptcpId,
                phaseId,
                product_template_raw_material,
                ...rest
            }: any) => {
                const formatRawMaterials =
                    !!product_template_raw_material?.length
                        ? product_template_raw_material.map(
                            ({
                                id,
                                index,
                                rowId,
                                itemId,
                                backendId,
                                ...restRaw
                            }: any) => ({
                                ...restRaw,
                                ...(!!itemId ? { id: itemId } : {}),
                                // raw_material: backendId,
                                obj_id: backendId,
                            }),
                        )
                        : [];
                return {
                    ...rest,
                    ...details,
                    ...(!!ptcpId ? { id: ptcpId } : {}),
                    phase: backendId || phaseId,
                    product_template_raw_material: formatRawMaterials,
                };
            },
        );

    const qa = resData?.qa?.map(
        ({ id, index, rowId, backendId, qaId, ...rest }: any) => {
            return {
                ...(!!qaId ? { id: qaId } : {}),
                quality_assurance: backendId,
                update_on: rest.update_on,
                created_on: rest.created_on,
                status: rest.status || 'Approved',
                actual_value: rest.actual_value,
                production: data?.production_code?.id || id,
            };
        },
    );

    const updateData: any = {
        ...resData,
        division: division?.id,
        department: department?.id,
        class_obj: class_obj?.id,
        color: color?.id,
        template: template?.id,
        code: resData?.code?.value || resData?.code,
        approved_by: resData?.approved_by?.username || '',
        product_template: resData?.production_code?.id || resData?.id,
        machine: resData?.unchangedResponse?.machine?.id,
        cancel_date: resData?.cancel_date,
        product_template_critical_path,
        qa,
        final_product_template: {
            formula: resData?.production_code?.id || resData?.id,
            unchangedResponse: resData?.unchangedResponse,
            ...(!!final_product_template?.id
                ? { ...final_product_template }
                : {}),
            product_template_critical_path,
            qa,
        },
    };

    if (data?.customer) {
        updateData.customer =
            typeof data?.customer === 'string' ||
                typeof data?.customer === 'number'
                ? +data?.customer
                : data?.customer?.id || data?.customer;
    }

    deleteProps(updateData, [
        'unchangedResponse',
        'approved_by',
        'temp_product_template_critical_path',
    ]);
    return updateData;
};
const insertPackage = (data: any, id: number | string) => {
    const {
        division,
        department,
        class_obj,
        color,
        template,
        final_product_template,
        ...resData
    } = data;

    const product_template_critical_path =
        data?.product_template_critical_path?.map(
            ({
                details,
                id,
                backendId,
                index,
                rowId,
                ptcpId,
                phaseId,
                product_template_raw_material,
                ...rest
            }: any) => {
                const formatRawMaterials =
                    !!product_template_raw_material?.length
                        ? product_template_raw_material.map(
                            ({
                                id,
                                index,
                                rowId,
                                itemId,
                                backendId,
                                ...restRaw
                            }: any) => ({
                                ...restRaw,
                                ...(!!itemId ? { id: itemId } : {}),
                                // raw_material: backendId,
                                obj_id: backendId,
                            }),
                        )
                        : [];
                return {
                    ...rest,
                    ...details,
                    ...(!!ptcpId ? { id: ptcpId } : {}),
                    phase: backendId || phaseId,
                    product_template_raw_material: formatRawMaterials,
                };
            },
        );

    const packaging = data?.packaging?.map(
        ({ id, index, rowId, packageId, ...restItem }: any) => {
            return {
                ...restItem,
                ...(!!packageId ? { id: packageId } : {}),
                produced_qty: !!restItem.item_produced_qty
                    ? Number(restItem.item_produced_qty)
                    : 0,
                requested_qty: !!restItem.item_produced_qty
                    ? Number(restItem.item_requested_qty)
                    : 0,
            };
        },
    );

    const qa = data?.qa?.map(
        ({ id, index, rowId, backendId, qaId, ...rest }: any) => {
            return {
                ...(!!qaId ? { id: qaId } : {}),
                quality_assurance: backendId,
                update_on: rest.update_on,
                created_on: rest.created_on,
                status: rest.status || 'Approved',
                actual_value: rest.actual_value,
                production: data?.production_code?.id || id,
            };
        },
    );

    const updateData = {
        ...resData,
        division: division?.id,
        department: department?.id,
        class_obj: class_obj?.id,
        color: color?.id,
        code: resData?.code?.value || resData?.code,
        approved_by: resData?.approved_by?.username || '',
        product_template: resData?.id,
        machine: resData?.unchangedResponse?.machine?.id,
        cancel_date: resData?.cancel_date,
        product_template_critical_path,
        packaging,
        qa,
        final_product_template: {
            formula: resData?.production_code?.id || resData?.id,
            unchangedResponse: resData?.unchangedResponse,
            ...(!!final_product_template?.id
                ? { ...final_product_template }
                : {}),
            product_template_critical_path,
            qa,
        },
    };

    if (data?.customer) {
        updateData.customer =
            typeof data?.customer === 'string' ||
                typeof data?.customer === 'number'
                ? +data?.customer
                : data?.customer?.id || data?.customer;
    }

    deleteProps(updateData, [
        'unchangedResponse',
        'approved_by',
        'temp_product_template_critical_path',
    ]);
    return updateData || { ...data };
};

const details = (data: any) => {
    const res = data?.product_template;
    const defaultVal = {
        ...data,
        ...res,
        attachments: data.attachments,
        machine_volume: data?.machine?.machine_volume,
        template: res,
        qa: data?.qa?.map(({ quality_assurance, ...item }: any) => {
            return {
                ...item,
                ...quality_assurance,
            };
        }),
        product_template_critical_path:
            data?.final_product_template?.product_template_critical_path &&
            data.final_product_template?.product_template_critical_path.map(
                (item: any) => {
                    return {
                        ...item.phase,
                        ...item,
                        product_template_raw_material:
                            item?.product_template_raw_material &&
                            item?.product_template_raw_material?.map(
                                (i: any) => {
                                    return {
                                        ...i,
                                        ...(i.inventory
                                            ? {
                                                ...i?.inventory,
                                                rowId: i?.inventory?.id,
                                            }
                                            : []),
                                    };
                                },
                            ),
                    };
                },
            ),
    };
    return defaultVal;
};

const production = {
    getDefine,
    insertDefine,
    getQa,
    insertQa,
    getPackage,
    insertPackage,
    details,
};

export { production };
