// add normalized

const add = (data: any, isCopy = false) => {
    return {
        ...data,
        rowId: data?.id,
        color: data?.color.id,
        approved_by: data?.approved_by?.username,
        product_template_critical_path:
            !!data?.product_template_critical_path?.length &&
            data.product_template_critical_path.map((item: any) => {
                const {
                    phase: { id, ...restPhase },
                    product_template_raw_material,
                    ...restItem
                } = item;
                return {
                    ...restPhase,
                    ...restItem,
                    ptcId: !isCopy && item.id,
                    phase_Id: id,
                    product_template_raw_material:
                        !!product_template_raw_material?.length &&
                        product_template_raw_material.map((rwaM: any) => {
                            return {
                                ...rwaM,
                                ...rwaM?.inventory,
                                rwaMId: !isCopy && rwaM?.id,
                                backendId: rwaM?.inventory?.id,
                            };
                        }),
                };
            }),
        qa:
            data?.qa &&
            data?.qa?.map((item: any) => {
                return {
                    ...item,
                    ...item?.quality_assurance,
                    qaId: !isCopy && item.id,
                    quality_assurance: item?.quality_assurance?.id,
                };
            }),
        unchangeddata: data,
    };
};
const insert = (data: any, id: number) => {
    return {
        ...data,
        division: data?.division?.id,
        department: data?.department?.id,
        class_obj: data?.class_obj?.id,
        code: data?.code,
        color: +data?.color,

        product_template_critical_path: !!data?.product_template_critical_path
            ?.length
            ? data?.product_template_critical_path?.map(
                  ({
                      details,
                      id,
                      backendId,
                      phase_Id,
                      index,
                      rowId,
                      ptcId,
                      code,
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
                                        rwaMId,
                                        backendId,
                                        ...restRaw
                                    }: any) => ({
                                        ...restRaw,
                                        ...(!!rwaMId ? { id: rwaMId } : {}),
                                        // raw_material: backendId,
                                        obj_id: backendId,
                                    }),
                                )
                              : [];
                      return {
                          ...rest,
                          ...details,
                          ...(!!ptcId ? { id: ptcId } : {}),

                          phase: backendId || phase_Id,
                          phase_code: code,

                          product_template_raw_material: formatRawMaterials,
                      };
                  },
              )
            : [],
        qa: !!data?.qa?.length
            ? data?.qa?.map(({ id, qaId, ...restQa }: any) => {
                  return {
                      ...restQa,
                      id: qaId || null,
                      quality_assurance:
                          restQa?.quality_assurance ||
                          restQa?.quality_assurance?.id ||
                          restQa?.id ||
                          restQa?.backendId ||
                          '',
                      update_on: restQa.update_on,
                      created_on: restQa.created_on,
                      status: '',
                      actual_value: '',
                  };
              })
            : [],
    };
};

const detail = (data: any) => {
    return {
        ...data.data,
        product_template_critical_path:
            data.data?.product_template_critical_path?.map((i: any) => {
                return {
                    ...i,
                    rowId: i.guid,
                    phase_code: i?.phase.phase_code,
                    phase_description: i?.phase.phase_description,
                    product_template_raw_material:
                        i?.product_template_raw_material?.map((ptrm: any) => {
                            return {
                                ...ptrm,
                                ...ptrm?.inventory,
                                rowId: ptrm.guid,
                            };
                        }),
                };
            }),
        qa:
            data.data?.qa &&
            data.data?.qa?.map((item: any) => {
                return {
                    ...item,
                    ...item?.quality_assurance,
                };
            }),
        unchangedResponse: data?.data,
    };
};

const template = {
    add,
    insert,
    detail,
};

export { template };
