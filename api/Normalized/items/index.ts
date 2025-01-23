import { deleteProps } from 'utils/utils';

const get = (data: any) => {
    return {
        ...data,
        ...(data?.item_type.toString().toLowerCase() ===
            'Purchased'.toLowerCase() && {
            item_vendors: !!data?.item_vendors?.length
                ? data?.item_vendors.map((item: any) => ({
                      ...item,
                      ...item.vendor,
                      backendId: item.vendor?.id,
                  }))
                : [],
        }),
        customer_discount_based_on_types: !!data
            .customer_discount_based_on_types.length
            ? data.customer_discount_based_on_types.map((item: any) => {
                  return {
                      ...item.customer_type,
                      ...item,
                      row_id: item.id,
                      customer_type_id: item.customer_type.id,
                  };
              })
            : [],
        unchangedResponse: { ...data },
    };
};
const insert = (data: any, id?: number) => {
    const {
        customer_types,
        code,
        category,
        department,
        min_quantity,
        price,
        color,
        division,
        quantity_per_box,
        quantity_per_case,
        quantity_per_pallet,
        customer_discount_based_on_types,
        class_obj,
        ...restData
    } = data;

    return {
        ...restData,
        code: code?.toString()?.toUpperCase(),
        department: department?.id || null,
        color: color?.id || color,
        division: division?.id,
        category: category || null,
        min_quantity: min_quantity || null,
        price: price || null,
        class_obj: class_obj?.id || null,
        quantity_per_box: quantity_per_box || null,
        quantity_per_case: quantity_per_case || null,
        quantity_per_pallet: quantity_per_pallet || null,
        ...(data?.item_type.toString().toLowerCase() ===
            'Purchased'.toLowerCase() && {
            item_vendors: !!data?.item_vendors?.length
                ? data?.item_vendors.map((item: any) => ({
                      ...item,
                      item: item.vendor_item_code || null,
                      vendor: item?.backendId || item?.id || null,
                      vendor_item_upc: +item.vendor_item_upc,
                      id: item?.backendId || item?.id || null,
                  }))
                : [],
        }),
        customer_discount_based_on_types:
            !!customer_discount_based_on_types?.length
                ? customer_discount_based_on_types.map(
                      ({
                          id,
                          index,
                          code,
                          discount_percentage,
                          backendId,
                          customer_type_id,
                          row_id,
                          rowId,
                          ...rest
                      }: any) => {
                          return {
                              ...rest,
                              id: row_id,
                              customer_type: backendId || customer_type_id,
                              discount: discount_percentage,
                          };
                      },
                  )
                : [],
    };
};

const detail = (data: any) => {
    return {
        ...data,
        ...(data?.item_type.toString().toLowerCase() ===
            'Purchased'.toLowerCase() && {
            item_vendors: !!data?.item_vendors?.length
                ? data?.item_vendors.map((item: any) => ({
                      ...item,
                      ...item.vendor,
                      backendId: item.vendor?.id,
                  }))
                : [],
        }),
        customer_discount_based_on_types: !!data
            .customer_discount_based_on_types.length
            ? data.customer_discount_based_on_types.map((item: any) => {
                  return {
                      ...item.customer_type,
                      ...item,
                      row_id: item.id,
                      customer_type_id: item.customer_type.id,
                  };
              })
            : [],
    };
};

const items = {
    get,
    insert,
    detail,
};

export { items };
