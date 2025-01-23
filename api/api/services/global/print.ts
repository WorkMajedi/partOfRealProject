import { AxiosRequestConfig } from 'axios';
import { instance, initCRUD } from '../../../config';

interface IStructure {}

const GeneratorLinkPrint = (url: string) => instance.get(`${url}`);
const GeneratorExcelFile = (url: string) =>
    instance.get(`${url}`, { responseType: 'blob' });

export default {
    ...initCRUD<IStructure | any>('Structure'),
    GeneratorLinkPrint,
    GeneratorExcelFile,
};
