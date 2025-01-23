import dayjs from 'dayjs';
import { Flip, toast } from 'react-toastify';
import printJS from 'print-js';
import { Api } from '../api';
import { useSelector } from 'react-redux';
import { store } from '../redux/store';
import {
    drawerWidth,
    drawerWidthClose,
} from '../layouts/DashBoard/component/DashBoard.styles';

export const generatorOptions = (
    arr: string[] | { label: any; value: any }[],
) => {
    if (!!arr?.length && !!(arr[0] as { [key: string]: unknown })?.label) {
        return arr;
    }

    return arr?.map(item => ({
        label: item,
        value: item,
    }));
};

export function isEmptyObject(obj: any) {
    return Object.keys(obj).length === 0;
}

export const focusNextInput = (currentInput: HTMLElement) => {
    const nextInput = currentInput
        .closest('.MuiGrid-item')
        ?.querySelector(
            'input:not([disabled]):not([readonly]),input[data-skip-in-navigation="false"],div[data-skip-in-navigation="false"]',
        );

    if (nextInput) {
        // @ts-ignore
        nextInput?.focus();
    } else {
        const nextSibling =
            currentInput.closest('.MuiGrid-item')?.nextElementSibling;
        if (nextSibling) {
            focusNextInput(nextSibling as HTMLElement);
        }
    }
};
export const FindStepFristPath = (pathname: string) => {
    if (typeof pathname === 'string') {
        return pathname.slice(pathname.indexOf('/'), pathname.lastIndexOf('/'));
    }
    return '';
};
export const handleRedirectPathCopy = (pathname: string) => {
    if (typeof pathname === 'string') {
        if (pathname.includes('/detail')) {
            const url = pathname.replace('/list/detail/', '/add');
            return url.slice(url.indexOf('/'), url.lastIndexOf('/'));
        }
    }
    return '';
};
export const FindNameFromRelated_modal = (RM: string) => {
    if (typeof RM === 'string') {
        return RM.slice(RM.lastIndexOf('.')).replace('.', '');
    }
    return '';
};
export function extractNameAppFromURL(inputString: string) {
    const parts = inputString.split('/');
    const lastPart: any = parts[parts.length - 1];

    if (!isNaN(lastPart)) {
        const lastIndex = inputString.lastIndexOf(lastPart);
        const textBeforeNumber = inputString.substring(0, lastIndex - 1);
        const partsBeforeNumber = textBeforeNumber.split('/');
        return partsBeforeNumber[partsBeforeNumber.length - 1]
            .split('-')
            .map((word, index) =>
                index === 0
                    ? word
                    : word.charAt(0).toUpperCase() + word.slice(1),
            )
            .join('');
    }
    return lastPart;
}

export function deleteProps(obj: any, prop: any[]) {
    for (const p of prop) {
        delete obj[p];
    }
}

export function calculateEndDate(startDate: any, numberOfDays: any) {
    const oneDayInMillis = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    const startDateInMillis = startDate.getTime(); // Convert start date to milliseconds
    // eslint-disable-next-line max-len
    const endDateInMillis = startDateInMillis + numberOfDays * oneDayInMillis; // Calculate end date in milliseconds

    const expireDate = new Date(endDateInMillis);
    // Create a new Date object for the end date
    return dayjs(expireDate).format('YYYY-MM-DD');
}
// Helper function to flatten nested error messages into readable strings
// Update flattenMessages to accept a titleMap parameter
export const flattenMessages = (
    messages: any,
    prefix = '',
    titleMap: Record<string, string> = {},
): string => {
    if (Array.isArray(messages)) {
        return messages
            .map((message, index) => {
                if (
                    typeof message === 'object' &&
                    message !== null &&
                    Object.keys(message).length === 0
                ) {
                    return ''; // Skip empty objects
                }

                return flattenMessages(
                    message,
                    `${prefix}[row ${index + 1}]`,
                    titleMap,
                );
            })
            .filter(Boolean)
            .join('\n');
    } else if (typeof messages === 'object' && messages !== null) {
        return Object.entries(messages)
            .map(([key, value]) => {
                const mappedKey = titleMap[key] || key; // Use titleMap to replace key name if available
                if (
                    typeof value === 'object' &&
                    value !== null &&
                    Object.keys(value).length === 0
                ) {
                    return ''; // Skip empty objects
                }
                return flattenMessages(
                    value,
                    `${prefix ? `${prefix}.` : ''}${mappedKey}`,
                    titleMap,
                );
            })
            .filter(Boolean)
            .join('\n');
    } else {
        console.log(prefix, '--  prefix --');
        return `${prefix ? `${prefix}: ` : ''}${messages}`;
    }
};

export function formatErrorMessage(
    errorObj: any,
    includeParentKey: boolean = false,
): string {
    function processErrorObject(obj: any, parentKey: string = ''): string {
        let errorString = '';
        for (const key in obj) {
            const currentKey = parentKey ? `${parentKey}.${key}` : key;

            if (
                Array.isArray(obj[key]) &&
                obj[key].length > 0 &&
                typeof obj[key][0] === 'object'
            ) {
                errorString += `${
                    includeParentKey ? currentKey : key
                }: ${processErrorObject(obj[key][0], currentKey)}\n`;
            } else {
                const errorMessage =
                    typeof obj[key] === 'string' ? obj[key] : obj[key][0];
                errorString +=
                    ' [ ' +
                    `${
                        includeParentKey ? currentKey : key
                    }: ${errorMessage}\n` +
                    ']';
            }
        }
        return errorString;
    }

    return errorObj ? processErrorObject(errorObj) : '';
}

export const consoleLog = (key: any, value?: any, color?: any) => {
    console.log(
        `%c ${key}`,
        `font-weight: bold; color: ${
            color || '#00FFFF'
        }; font-family:sans-serif; font-size: 16px`,
        value,
    );
};

// generates random id;
export const generateRandomId = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return `${s4()}-${s4()}-${s4()}-${s4()}-${s4()}`;
};

export const truncateString = (string: string, length: number): string => {
    return string.length > length
        ? `${string.substring(0, length)} . . .`
        : string;
};
const storeRedux = store.getState();
export const handelError = (
    err: any,
    setError: any,
    ignoreError: any[] = [],
    showToast?: boolean,
    titleMap: { [key: string]: string } = {}, // New titleMap parameter
) => {
    const error = err?.response?.data;
    const open = storeRedux?.MenuReducer?.toggleBtn;

    if (error && typeof error === 'object') {
        Object.keys(error).forEach(field => {
            const messages = error[field];
            const isErrorIgnored = ignoreError && ignoreError.includes(field);
            if (true) {
                if (showToast) {
                    const combinedMessages = Array.isArray(messages)
                        ? flattenMessages(messages, field, titleMap)
                        : `${field}: ${messages}`;

                    toast.error(combinedMessages, {
                        position: 'top-center',
                        style: {
                            color: '#fff',
                            top: 70,
                            right: 70,
                            whiteSpace: 'pre-line',
                            width: `50vw`,
                        },
                        hideProgressBar: true,
                        autoClose: false,
                        theme: 'colored',
                        transition: Flip,
                    });
                } else {
                    if (
                        Array.isArray(messages) &&
                        messages.length > 0 &&
                        typeof messages[0] === 'string'
                    ) {
                        const combinedMessages = flattenMessages(
                            messages,
                            field,
                            titleMap,
                        );
                        setError(`root.${field}`, {
                            type: 'manual',
                            message: combinedMessages,
                            listError: messages,
                            shouldFocus: true,
                        });
                    } else if (
                        Array.isArray(messages) &&
                        messages.length > 0 &&
                        typeof messages[0] === 'object'
                    ) {
                        const combinedMessages = flattenMessages(
                            messages,
                            field,
                            titleMap,
                        );
                        setError(`root.${field}`, {
                            type: 'manual',
                            message: combinedMessages,
                            listError: messages,
                            shouldFocus: true,
                        });
                    }
                }
            }
        });
    }
};

type ParamsType = Record<string, any>;
export function buildUrlFromParams(
    baseURL: string,
    keys: string[],
    data: ParamsType,
) {
    if (!baseURL) {
        console.error('Base URL is not defined or invalid.');
        return;
    }
    const params: ParamsType = {};

    keys.forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
            params[key] = data[key];
        }
    });

    // create valid query string
    const url: any = new URL(baseURL);
    Object.keys(params).forEach(key => {
        const value = params[key];
        url.searchParams.append(key, String(value));
    });

    return url.toString();
}
export const fetchGeneratorLinkPrint = async (
    url: string,
    id?: string | number,
) => {
    return Api.print
        .GeneratorLinkPrint(id ? `${url}/${id}/` : `${url}`)
        .then(response => {
            toast.success('print successfully');
            printJS({
                printable: response.data.file,
                type: 'pdf',
                base64: true,
            });
        })
        .catch(() => {});
};
export const fetchGeneratorExcelFile = async (
    url: string,
    id?: string | number,
) => {
    return Api.print
        .GeneratorExcelFile(id ? `${url}/${id}/` : `${url}`)
        .then(response => {
            const getNameFile = response.headers?.[`content-disposition`];
            const fileName: string | null =
                getNameFile && typeof getNameFile === 'string'
                    ? getNameFile.replace('filename=', '').replace('.xlsx', '')
                    : null;
            toast.success('Excel has been downloaded successfully');
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                fileName ? `${fileName}.xlsx` : 'report.xlsx',
            ); // نام فایل اکسل
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error downloading the Excel file:', error);
        });
};

// handle promise in user page
type PermissionType = {
    [key: string]: {
        label: string;
        permissions: string[];
        child: PermissionType;
    };
};
export const handlePreparePermissions = (data: PermissionType) => {
    const dataType = Object.prototype.toString.call(data);
    const keys = dataType === '[object Object]' && Object.keys(data);
    if (keys)
        return keys.map((key, index) => {
            const childKeys = Object.keys(data[key]?.child);
            return {
                key,
                rowId: index,
                id: index,
                module: data[key].label,
                view: data[key].permissions.includes('view'),
                add: data[key].permissions.includes('add'),
                edit: data[key].permissions.includes('edit'),
                delete: data[key].permissions.includes('delete'),
                print: data[key].permissions.includes('print'),
                permission_details: childKeys.map((keyChild, i) => {
                    return {
                        key: keyChild,
                        rowId: i,
                        id: i,
                        sub_module: data[key].child[keyChild].label,
                        view: data[key].child[keyChild].permissions.includes(
                            'view',
                        ),
                        add: data[key].child[keyChild].permissions.includes(
                            'add',
                        ),
                        edit: data[key].child[keyChild].permissions.includes(
                            'edit',
                        ),
                        delete: data[key].child[keyChild].permissions.includes(
                            'delete',
                        ),
                        print: data[key].child[keyChild].permissions.includes(
                            'print',
                        ),
                    };
                }),
            };
        });
    return null;
};

type PermissionListType = {
    [key: string]: any;
};
export const handlePermissionList = (
    list: PermissionListType[],
): PermissionType =>
    list.reduce((newList: any, item: any) => {
        const label = item.module ?? item.sub_module;
        newList[item.key] = {
            label,
            permissions: Object.keys(item).reduce(
                (p: string[], key: string) => (
                    item[key] === true && p.push(key), p
                ),
                [],
            ),
            ...(item.permission_details
                ? { child: handlePermissionList(item.permission_details) }
                : {}),
        };

        return newList;
    }, {});

export const updateArrayAllGranted: any = (arr: [], value: boolean) => {
    return (
        !!arr?.length &&
        arr.map((item: any) => {
            const newItems = Object.keys(item).reduce(
                (k: { [key: string]: unknown }, key: string) => {
                    const valueType = Object.prototype.toString.call(item[key]);
                    if (valueType === '[object Boolean]') {
                        item[key] = value;
                        k = {
                            ...item,
                        };
                    }
                    return k;
                },
                {},
            );

            return {
                ...newItems,
                permission_details: updateArrayAllGranted(
                    item.permission_details,
                    value,
                ),
            };
        })
    );
};
//= ====================

export function getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
export function getRandomColorEachEmployee(count: number | string) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(getRandomColor());
    }
    return data;
}

//= ================= find input next filed valid for navigation

export const findNextInput = (e: any, ref: any) => {
    // Get all input fields that are not disabled
    const inputFields = Array.from(
        document.querySelectorAll('input:not(:disabled)'),
    ).filter((el: any) => {
        const skipInNavigation = el.getAttribute('data-skip-in-navigation');
        const parentSkipInNavigation = el?.parentElement.getAttribute(
            'data-skip-in-navigation',
        );
        const parentParentSkipInNavigation =
            el?.parentElement?.parentElement.getAttribute(
                'data-skip-in-navigation',
            );

        return (
            skipInNavigation !== 'true' &&
            parentSkipInNavigation !== 'true' &&
            parentParentSkipInNavigation !== 'true'
        );
    });
    // Find the index of the current input field
    const currentIndex = inputFields.indexOf(
        ref.current?.querySelector('input'),
    );

    // Find the next input field that is not disabled
    const nextInput = inputFields[currentIndex + 1];
    return nextInput;
};
//

// ----------------- start --------------------- use in the modal packaging material in production
export const getValueQuantityUom = (type: any) => {
    switch (type) {
        case 'Each':
            return 1;
        case 'Dozen':
            return 12;
        case 'Gross':
            return 144;
        default:
            return 1;
    }
};
