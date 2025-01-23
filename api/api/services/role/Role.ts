import { instance, initCRUD } from '../../../config';

// ----------Role Api Call---------
const RoleBaseUrl = '/api/auth/role/';
const getRoleDetails = (id: string | number | undefined | null) =>
    instance.get(`${RoleBaseUrl}${id}/`);

const insertRole = (data: any) => instance.post(`${RoleBaseUrl}`, data);

const updateRole = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${RoleBaseUrl}${id}/`, data);

// =========================================
const getDefaultPermissions = () => instance.get(`/api/auth/default_perms/`);

interface IStructure {}

export default {
    ...initCRUD<IStructure>('Structure'),
    getDefaultPermissions,
    getRoleDetails,
    insertRole,
    updateRole,
};
