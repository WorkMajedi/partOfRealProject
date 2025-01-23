import { instance } from '../../../config';

// ----------Employee Api Call---------
const EmployeeBaseUrl = '/api/personnel/employee/';
const employeeCreate = (data: any) => instance.post(`${EmployeeBaseUrl}`, data);

const updateEmployee = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${EmployeeBaseUrl}${id}/`, data);

const getEmployee = (id: string | number | undefined | null) =>
    instance.get(`${EmployeeBaseUrl}${id}/`);
// =========================================

export default {
    employeeCreate,
    updateEmployee,
    getEmployee,
};
