import { instance, initCRUD } from '../../../config';

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

const getStructure = () => instance.get(`/item.add_item/`);
const insertItems = (data: any) => instance.post(`/api/items/item/`, data);
const updateItems = (id: string | number, data: any) =>
    instance.put(`/api/items/item/${id}/`, data);
const getItem = (id: string | number) => instance.get(`api/items/item/${id}/`);
const deleteItem = ({ url, id }: { id?: string | number; url: string }) =>
    instance.delete(url);
const getItemsList = (url: string) => instance.get(url);
const getItemSearch = ({
    code,
    customerID,
}: {
    code: string;
    customerID: number;
}) =>
    instance.get(`api/manufacture/item/?search=${code}&customer=${customerID}
`);
const getItemsListRows = ({
    pageSize,
    page,
    url,
}: {
    pageSize?: number;
    page?: number;
    url?: string;
}) => instance.get(`${url}?page_size=${pageSize || 10}&page=${page || 1}`);

const getItemsSortRows = ({
    ordering,
    url,
}: {
    ordering?: number | string;
    url: string;
}) => instance.get(`${url}?ordering=${ordering}`);

export default {
    ...initCRUD<IStructure>('Structure'),
    getStructure,
    insertItems,
    getItem,
    deleteItem,
    updateItems,
    getItemsList,
    getItemsListRows,
    getItemsSortRows,
    getItemSearch,
};
