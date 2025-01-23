import { deleteProps } from 'utils/utils';

const get = (data: any) => {
    return {
        ...data,
        raw_material_vendor: data?.raw_material_vendor?.map(
            ({ vendor: { guid, ...restVendor }, ...restItem }: any) => {
                return {
                    ...restItem,
                    ...restVendor,
                    id_row: restItem?.id,
                    vendorID: restVendor.id,
                    vendor: restVendor,
                };
            },
        ),
    };
};
const insert = (data: any, id?: number) => {
    return {
        ...data,
        code: data?.code?.toString()?.toUpperCase(),
        raw_material_vendor: !!data?.raw_material_vendor?.length
            ? data.raw_material_vendor.map(
                  ({
                      id,
                      index,
                      rowId,
                      vendor,
                      id_row,
                      vendorID,
                      backendId,
                      uom,
                      primary,
                  }: any) => {
                      return {
                          vendor: vendorID || backendId,
                          id: id_row,
                          uom,
                          primary: primary || false,
                      };
                  },
              )
            : [],
    };
};

const detail = (data: any) => {
    return {
        ...data,
        raw_material_vendor: data?.raw_material_vendor?.map(
            ({ vendor: { guid, ...restVendor }, ...restItem }: any) => {
                return {
                    ...restItem,
                    ...restVendor,
                    id_row: restItem?.id,
                    vendorID: restVendor?.id,
                    vendor: restVendor,
                };
            },
        ),
    };
};

const rawMaterial = {
    get,
    insert,
    detail,
};

export { rawMaterial };
