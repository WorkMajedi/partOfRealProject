import { deleteProps } from 'utils/utils';

const get = (data: any) => {
    return {
        ...data,
        raw_material_vendor: data.raw_material_vendor.map((item: any) => {
            return {
                id: item.id,
                vendor: item.vendor,
                vendorID: item.vendor.id,
                name: item.vendor.name,
                code: item.vendor.code,
                uom: item.uom,
                primary: item.primary,
            };
        }),
    };
};
const insert = (data: any, id?: number) => {
    return {
        ...data,
        code: data.code.toString().toUpperCase(),
        raw_material_vendor: data.raw_material_vendor.map(
            ({ vendor, vendorID, uom, primary, ...rest }: any) => {
                return {
                    vendor: vendorID || parseInt(rest.backendId),
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
        raw_material_vendor: data.raw_material_vendor.map((item: any) => {
            return {
                id: item.id,
                vendor: item.vendor,
                vendorID: item.vendor.id,
                name: item.vendor.name,
                code: item.vendor.code,
                uom: item.uom,
                primary: item.primary,
            };
        }),
    };
};

const hierarchy = {
    get,
    insert,
    detail,
};

export { hierarchy };
