import { instance } from '../../../config';

const uploadFiles = (apiUrl: string, data: any, options: any) => {
    return instance
        .post(apiUrl, data, {
            ...options,
        })
        .then(res => res);
};

export default {
    uploadFiles,
};
