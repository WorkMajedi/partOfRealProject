export const cleanObject = (obj: any) => {
    const cleanedObj: any = {};
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (typeof value === 'string') {
            cleanedObj[key] = '';
        } else if (typeof value === 'number') {
            cleanedObj[key] = null;
        } else if (typeof value === 'boolean') {
            cleanedObj[key] = false;
        } else if (Array.isArray(value)) {
            cleanedObj[key] = [];
        } else if (typeof value === 'object' && value !== null) {
            cleanedObj[key] = '';
        } else {
            cleanedObj[key] = value;
        }
    }
    return cleanedObj;
};
