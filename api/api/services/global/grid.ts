import { instance, initCRUD } from '../../../config';

interface IStructure {}

const deleteRow = (url: string) => instance.delete(`${url}`);
const cloneRow = (url: string) => instance.post(`${url}`);

export default {
    ...initCRUD<IStructure | any>('Structure'),
    deleteRow,
    cloneRow,
};
