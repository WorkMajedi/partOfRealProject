import { initCRUD, instance } from 'api/config';

interface IStructure {
    email: string;
    password: string;
}

const loginUser = (data: any) => instance.post(`/api/token/`, data);
const me = () => instance.get(`/api/auth/users/me/`);

export default {
    ...initCRUD<IStructure | any>('Structure'),
    loginUser,
    me,
};
