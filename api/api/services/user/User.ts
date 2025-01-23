import { instance, initCRUD } from '../../../config';

// ----------Role Api Call---------
const UserBaseUrl = '/api/auth/users/';
const insertUser = (data: any) => instance.post(UserBaseUrl, data);
const updateUser = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${UserBaseUrl}${id}/`, data);
const getUser = (id: string | number | undefined | null) =>
    instance.get(`${UserBaseUrl}${id}/`);
const me = () => instance.get(`${UserBaseUrl}me/`);

// =========================================

interface IStructure {
    id: number;
    customer: string;
    cart_number: number;
    created_on: Date;
    shift: { title: string };
    cart_jid: { cart_jid: string };
    lost_and_found: string;
    quantity: number;
    color: string;
}
const getInfoUserMe = () => instance.get('/api/auth/users/me/');

const getUserListRows = ({
    pageSize,
    page,
}: {
    pageSize?: number;
    page?: number;
}) =>
    instance.get(
        `/api/auth/users/?page_size=${pageSize || 10}&page=${page || 1}/`,
    );

const getUserSortRows = ({ ordering }: { ordering?: number | string }) =>
    instance.get(`/api/auth/users/?ordering=${ordering}/`);
const getPermissions = () => instance.get('/api/get_perms');

export default {
    ...initCRUD<IStructure>('Structure'),
    insertUser,
    updateUser,
    getUser,
    getUserListRows,
    getUserSortRows,
    getPermissions,
    getInfoUserMe,
    me,
};
