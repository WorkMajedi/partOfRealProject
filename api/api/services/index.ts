import axios from 'axios';
import { initCRUD } from '../../config';
import items from './item/Items';
import manufacture from './manufacture/manufacture';
import partner from './partner';
import sales from './sales';
import user from './user/User';
import role from './role/Role';
import option from './option/Option';
import bug from './bug/inedx';
import personnel from './personnel/inedx';
import autoComplete from './global/autoComplate';
import autoCompletePostData from './global/autoComplate';
import print from './global/print';
import grid from './global/grid';
import upload from './global/upload';
import login from './auth/login';
import structure from './structureScrean';
import dashboard from './dashbaord';
import report from './report/report';

export const setToken = (token: string) =>
    localStorage.setItem('auth-token', token);

interface IItemType {
    code: string;
    description: string;
}
interface IItemCategory {
    code: string;
    description: string;
}

interface ICustomerTerm {
    code: string;
    description: string;
    number_of_date: number;
}

interface ICustomerType {
    code: string;
    description: string;
    discount: number;
}

// eslint-disable-next-line import/no-named-as-default-member
export const { CancelToken } = axios;

export default {
    customerTerms: initCRUD<ICustomerTerm>('CUSTOMER_TERMS'),
    customerTypes: initCRUD<ICustomerType>('CUSTOMER_TYPES'),
    itemType: initCRUD<IItemType>('ITEM_TYPES'),
    itemCategory: initCRUD<IItemCategory>('ITEM_CATEGORY'),
    items,
    user,
    role,
    option,
    bug,
    autoComplete,
    autoCompletePostData,
    manufacture,
    partner,
    sales,
    structure,
    print,
    grid,
    upload,
    dashboard,
    loginUser: login.loginUser,
    me: login.me,
    personnel,
    report,
};
