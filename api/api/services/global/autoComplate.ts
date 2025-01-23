import { AxiosRequestConfig } from 'axios';
import { instance, initCRUD } from '../../../config';

interface IStructure {}

const autoComplete = (url: string, config?: AxiosRequestConfig) =>
    instance.get(url, config);
const autoCompletePostData = (url: string, data: any) =>
    instance.post(url, data);

export default {
    ...initCRUD<IStructure | any>('Structure'),
    autoComplete,
    autoCompletePostData,
};
