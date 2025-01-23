import { initCRUD, instance } from 'api/config';

interface IStructure {
    email: string;
    password: string;
}

const AllScreens = () => instance.get(`/api/cores/screens/all_screen/`);
const hash = () => instance.get(`/api/cores/screens/hash/`);

export default {
    ...initCRUD<IStructure | any>('Structure'),
    AllScreens,
    hash,
};
