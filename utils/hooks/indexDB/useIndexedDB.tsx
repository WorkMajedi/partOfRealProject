import { useState, useEffect } from 'react';
import axios from 'axios';
import { openDB } from 'idb';

interface ScreenData {
    accounts: {};
    customer: {
        owner: string;
        models: {};
        tmp_id: string;
        name: string;
        grids: {};
        screens: {};
        modals: {};
        FID: string;
    };
    invoice: {};
}

interface ApiResponse {
    status: string;
    code: string;
    message: string[];
    data: {
        project_hash: string;
        screen_generator_data: ScreenData;
    };
}

interface MyDB extends IDBDatabase {
    getData: IDBObjectStore;
}

export function useScreenData() {
    const [screenData, setScreenData] = useState<ScreenData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            // باز کردن دیتابیس
            const db = await openDB<MyDB>('my-screen-data', 1, {
                upgrade(db) {
                    db.createObjectStore('getData');
                },
            });

            // گرفتن آخرین hash از API
            const hashUrl =
                'https://asc-api-rc.paradigmdigital.agency/api/cores/screens/hash/';
            const { data: hashData } = await axios.get<{
                data: { project_hash: string };
            }>(hashUrl);
            const latestHash = hashData.data.project_hash;

            // دریافت اطلاعات از IndexedDB
            const tx = db.transaction('getData', 'readonly');
            const store = tx.objectStore('getData');
            const localData = await store.get('data');

            // مقایسه hash از سمت سرور و هش‌های قبلی
            const previousHash = localData ? localData.hash : '';
            if (latestHash === previousHash) {
                setScreenData(localData ? localData.data : null);
                setIsLoading(false);
                return;
            }
            // دریافت اطلاعات از API
            const apiUrl =
                'https://asc-api-rc.paradigmdigital.agency/api/cores/screens/all_screen/';
            const { data } = await axios.get<ApiResponse>(apiUrl);
            // ذخیره اطلاعات جدید در IndexedDB
            const newData = {
                hash: latestHash,
                data: data?.data?.screen_generator_data,
            };
            const putTx = db.transaction('getData', 'readwrite');
            putTx.objectStore('getData').put(newData, 'data');
            await putTx?.oncomplete;

            setScreenData(newData.data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return { screenData, isLoading };
}
