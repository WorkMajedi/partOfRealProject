import { instance } from '../../../config';

// ----------Bug Api Call---------
const BugReportBaseUrl = '/api/cores/bug_report/';
const reportCreate = (data: any) => instance.post(`${BugReportBaseUrl}`, data);

const updateReport = (id: string | number | undefined | null, data: any) =>
    instance.patch(`${BugReportBaseUrl}${id}/`, data);

const getReport = (id: string | number | undefined | null) =>
    instance.get(`${BugReportBaseUrl}${id}/`);
// =========================================

export default {
    reportCreate,
    updateReport,
    getReport,
};
