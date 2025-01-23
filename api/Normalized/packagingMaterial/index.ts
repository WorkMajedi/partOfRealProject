import { deleteProps } from 'utils/utils';

const get = (data: any) => {
    return {
        ...data,
        ...(data?.package_type.toString().toLowerCase() === 'dependent' && {
            sub_packages: !!data?.sub_packages?.length
                ? data?.sub_packages.map((item: any) => ({
                      ...item,
                      ...item?.sub_package,
                  }))
                : [],
        }),
        packaging_material_vendor: data?.packaging_material_vendor?.map(
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
        ...(data?.package_type.toString().toLowerCase() === 'dependent' && {
            sub_packages: !!data?.sub_packages?.length
                ? data?.sub_packages.map((item: any) => ({
                      ...item,
                      id: item?.backendId || item?.id || null,
                      sub_package: item?.backendId || item?.id || null,
                  }))
                : [],
        }),
        package_type: data?.package_type.toString().toLowerCase(),
        code: data.code.toString().toUpperCase(),
        packaging_volume: data?.packaging_volume || null,
        packaging_material_vendor:
            data?.packaging_material_vendor &&
            data?.packaging_material_vendor?.map(
                ({ id_row, vendorID, backendId, uom, primary }: any) => {
                    return {
                        vendor: vendorID || backendId,
                        id: id_row,
                        uom,
                        primary: primary || false,
                    };
                },
            ),
    };
};

const detail = (data: any) => {
    return {
        ...data,
        ...(data?.package_type.toString().toLowerCase() === 'dependent' && {
            sub_packages: !!data?.sub_packages?.length
                ? data?.sub_packages.map((item: any) => ({
                    ...item,
                    ...item?.sub_package,
                }))
                : [],
        }),
        packaging_material_vendor: data.packaging_material_vendor.map(
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

const packagingMaterial = {
    get,
    insert,
    detail,
};

export { packagingMaterial };
