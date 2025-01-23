import React, { FC, useState, useEffect } from 'react';
import { instance } from 'api/config';

interface IData {}

const useFetchStructure: (url: string) => {
    data: any;
    error: any;
    loading: boolean;
} = (url: string) => {
    const [data, setData] = useState<IData | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                // @ts-ignore
                const response = await instance.get(url);
                if (response?.data?.data) {
                    setData(response?.data?.data);
                } else {
                    setData(response?.data);
                }
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    return { data, error, loading };
};
export default useFetchStructure;
