/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-console */
import axios from 'axios';
import { toast } from 'react-toastify';
import { formatErrorMessage } from 'utils/utils';
import { store } from '../../redux/store';
import { logout } from '../../redux/slices/permissions/permissionsSlice';

// export const setToken = token => {
//     if (token) {
//         localStorage.setItem('auth-token', token);
//     } else {
//         localStorage.removeItem('auth-token');
//     }
// };
//
// export const getToken = () => localStorage.getItem('auth-token');
//
// export const setRefreshToken = token => {
//     if (token) {
//         localStorage.setItem('refresh-token', token);
//     } else {
//         localStorage.removeItem('refresh-token');
//     }
// };
//
// export const getRefreshToken = () => {
//     return localStorage.getItem('refresh-token');
// };

export const getToken = () => {
    const authToken = store.getState();
    return authToken.permissions.auth_token;
};
export const source = axios.CancelToken.source();
export const getRefreshToken = () => {
    const authToken = store.getState();
    return authToken.permissions.refresh_token;
};

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    cancelToken: source.token,
    // IGNORE_ERROR_RAISER: false
});
export const MockAPI = axios.create();
const refreshTokenApi = data => instance.post('/api/token/refresh/', data);

instance.interceptors.request.use(
    config => {
        const accessToken = getToken();
        if (accessToken) {
            config.headers.Authorization = `JWT ${accessToken}`;
            config.timeout = 800000;
        }

        if (process.env.REACT_APP_LOG_REQUEST) {
            console.groupCollapsed(
                `    🚀 [${config.method?.toLocaleUpperCase()}] ${config.url}`,
            );
            console.log(config);
            console.groupEnd();
        }
        if (window.performance) {
            config.metadata = {
                url: config.url?.replace(/\?.*/g, ''),
                method: config.method,
                time: performance.now(),
            };
        }
        return config;
    },
    error => {
        if (process.env.REACT_APP_LOG_REQUEST) {
            console.groupCollapsed(
                `%c${error.request.status
                } ❌ [${error.request.config.method?.toLocaleUpperCase()}] ${error.request.config.url
                }`,
                'color:#e94048;',
            );
        }
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    response => {
        if (process.env.REACT_APP_LOG_RESPONSE) {
            // toast.success('it is ok');

            if (window.performance) {
                // @ts-ignore
                const { metadata } = response.config;
                console.groupCollapsed(
                    `%c${response.status
                    } ✅ [${response.config.method?.toLocaleUpperCase()}] ${response.config.url
                    } ${Math.round(performance.now() - metadata.time)}ms`,
                    'color:#4caf50;',
                );
            } else {
                console.groupCollapsed(
                    `%c${response.status
                    } ✅ [${response.config.method?.toLocaleUpperCase()}] ${response.config.url
                    }`,
                    'color:#4caf50;',
                );
            }
            console.log(response);
            console.groupEnd();
        }
        return response;
    },
    error => {
        const { config } = error;
        const originalRequest = config;
        // Handle network errors
        if (!error.response) {
            if (error.code === 'ERR_CONNECTION_CLOSED') {
                toast.error(
                    'Connection closed by the server. Please try again later.',
                    {
                        hideProgressBar: true,
                    },
                );
            } else {
                toast.error('Network error. Please check your connection.', {
                    hideProgressBar: true,
                });
            }

            console.groupCollapsed('%cNetwork Error 🚨', 'color:#e94048;');
            console.log(error);
            console.groupEnd();

            return Promise.reject({
                ...error,
                status: -1,
                message: 'Network Error',
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-redeclare
        const { response: { status, data } = {} } = error;

        if (status === 401) {
            const refresh = getRefreshToken();
            const state = store.getState();
            // localStorage.removeItem('userData');
            // localStorage.removeItem('auth-token');
            // localStorage.removeItem('refresh-token');
            const attemptedUrl = window.location.pathname; // Get current URL
            localStorage.setItem('lastAttemptedUrl', attemptedUrl); // Save to localStorage
            if (window.location.pathname !== '/login') {
                if (state.permissions) {
                    store.dispatch(logout());
                }

                window.location.href = '/login';
            }
            if (refresh) {
                return refreshTokenApi({ refresh }).then(res => {
                    if (res.status === 200) {
                        // setToken(res.data.access);
                        state.permissions.auth_token = res.data.access;
                        originalRequest.headers.Authorization = `JWT ${res.data.access}`;
                        return instance(originalRequest);
                    }
                    // localStorage.removeItem('userData');
                    state.permissions.userData = null;
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                    return {
                        res: { status: 401, data: {} },
                    };
                });
            }
            // return {
            //     res: { status: 401, data: {} },
            // };
        }
        if (originalRequest?.IGNORE_ERROR_RAISER !== true && status !== 404) {
            toast.error(data?.message?.[0], {
                hideProgressBar: true,
            });
        }
        if (axios.isCancel(error)) {
            if (process.env.REACT_APP_LOG_RESPONSE) {
                console.log('%cRequest canceled ⛔️', 'color:#ffae00;');
            }
            return { status: -1, message: 'Request canceled' };
        }
        if (process.env.REACT_APP_LOG_RESPONSE) {
            if (error.response) {
                console.groupCollapsed(
                    `%c${error.request.status
                    } 🚧 [${error.response.config.method?.toLocaleUpperCase()}] ${error.response.config.url
                    }`,
                    'color:#e94048;',
                );
                console.log(error.response);
                console.groupEnd();
            } else {
                console.groupCollapsed(
                    `%c${error.request.status.toString().padStart(3, '0')} 🚧 ${error.request.responseURL
                    }`,
                    'color:#e94048;',
                );
                console.log(error);
                console.groupEnd();
            }
        }
        console.log(error, '-- 123error  --');
        if (
            originalRequest?.IGNORE_ERROR_RAISER !== true &&
            status !== 404 &&
            status !== 500
        ) {
            toast.error(formatErrorMessage(data));
        }
        if (status !== 403 && status !== 404 && status !== 400) {
            toast.error(`we have error: ${status}`);
        }

        const err = {
            ...error,
            status: error.request.status,
            code: error.code,
            message: data,
            response: error.response,
        };
        return Promise.reject(err);
    },
);
