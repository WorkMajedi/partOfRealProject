// useMockAPI.ts
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import sharedMock from './sharedMock'; // فایلی که mock مشترک در آن تعریف شده است
import { MockAPI } from '../../api/config/instance';

const useMockAPI = <T,>(url: string, mockData: T, delay: number = 400) => {
    const [data, setData] = useState<T>(mockData);
    let timeoutId: NodeJS.Timeout;

    useEffect(() => {
        sharedMock.onGet(url).reply(() => {
            return new Promise(resolve => {
                timeoutId = setTimeout(() => {
                    resolve([200, mockData]);
                }, delay);
            });
        });

        return () => {
            sharedMock.reset();
            clearTimeout(timeoutId);
        };
    }, [url, mockData]);

    const fetchData = async (): Promise<T | null> => {
        try {
            const response: AxiosResponse<T> = await MockAPI.get(url);
            setData(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    return { data, fetchData };
};

export default useMockAPI;
