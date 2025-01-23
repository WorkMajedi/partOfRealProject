interface Permission {
    key: string;
    rowId: number;
    id: number;
    module: string;
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
    print: boolean;
    permission_details: PermissionDetail[];
}

interface PermissionDetail {
    key: string;
    rowId: number;
    id: number;
    sub_module: string;
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
    print: boolean;
}

interface MyObject {
    id: number;
    code: string;
    description: string;
    permissions: Permission[];
}
function mergePermissions(
    obj1: MyObject | any,
    obj2: MyObject | any,
): MyObject {
    const objWithOutPermissions: MyObject | any = { ...obj2 };
    delete objWithOutPermissions.permissions;
    const updatedObj: MyObject | any = { ...obj1, ...objWithOutPermissions };

    for (const permission2 of obj2.permissions) {
        const matchingPermission1 = updatedObj.permissions.find(
            (permission1: { key: any }) => permission1.key === permission2.key,
        );
        if (matchingPermission1) {
            matchingPermission1.view = permission2.view;
            matchingPermission1.add = permission2.add;
            matchingPermission1.edit = permission2.edit;
            matchingPermission1.delete = permission2.delete;
            matchingPermission1.print = permission2.print;
        }
        if (matchingPermission1) {
            matchingPermission1.permission_details = mergePermissionDetails(
                matchingPermission1.permission_details,
                permission2.permission_details,
            );
        }
    }

    return updatedObj;
}

function mergePermissionDetails(
    details1: PermissionDetail[],
    details2: PermissionDetail[],
): PermissionDetail[] {
    const mergedDetails: PermissionDetail[] = [];
    for (const detail1 of details1) {
        const matchingDetail2 = details2.find(
            detail2 => detail2.key === detail1.key,
        );
        if (matchingDetail2) {
            mergedDetails.push({ ...detail1, ...matchingDetail2 });
        } else {
            mergedDetails.push(detail1);
        }
    }
    return mergedDetails;
}
export { mergePermissions, mergePermissionDetails };
