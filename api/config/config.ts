import { AxiosRequestConfig } from 'axios';
import { instance } from './instance';

export const BASE_URL = {
    Structure: '/api/cores/screens',
    ITEM: '/api/v1/item/ItemTable',
};
declare module 'axios' {
    export interface AxiosRequestConfig {
        IGNORE_ERROR_RAISER?: boolean;
    }
}
export const initCRUD = <T>(nameOrUrl: keyof typeof BASE_URL | string) => {
    // @ts-ignore
    const base = BASE_URL[nameOrUrl] ? BASE_URL[nameOrUrl] : nameOrUrl;
    return {
        all: (qs?: string, config?: AxiosRequestConfig) =>
            instance.get(qs ? `${base}?${qs}` : `${base}`, config),
        get: (id: string, qs?: string, config?: AxiosRequestConfig) =>
            instance.get(
                qs != '' ? `${base}${id}/?${qs}` : `${base}${id}/`,
                config,
            ),
        delete: (id: string, config?: AxiosRequestConfig) =>
            instance.delete(`${base}${id}/`, config),
        insert: (data: T, config?: AxiosRequestConfig) =>
            instance.post(`${base}`, data, config),
        update: (id: string, data: Partial<T>, config?: AxiosRequestConfig) =>
            instance.patch(`${base}${id}/`, data, config),
    };
};
