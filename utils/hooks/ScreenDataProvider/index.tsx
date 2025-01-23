import { createContext, useState, useEffect } from 'react';
import { openDB } from 'idb';
import { useDispatch } from 'react-redux';
import { forceRefresh } from 'redux/slices/permissions/permissionsSlice';
import Api from 'api/api/services';

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

interface MyDB extends IDBDatabase {
    getData: IDBObjectStore;
}

interface ScreenDataContextValue {
    screenData: ScreenData | null;
    isLoading: boolean;
}

export const ScreenDataContext = createContext<ScreenDataContextValue>({
    screenData: null,
    isLoading: false,
});

export const ScreenDataProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [screenData, setScreenData] = useState<ScreenData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newDataScreens, setNewDataScreens] = useState<any>(null);
    const [newHash, setNewHash] = useState<any>(null);
    const dispatch = useDispatch();
    const forceRefreshApp = () => {
        dispatch(forceRefresh(true));
    };
    const fetchScreens = async () => {
        setIsLoading(true);
        try {
            const response = await Api.structure.AllScreens();
            setNewDataScreens(response?.data);
            setIsLoading(false);
        } catch (error: any) {
            console.log(error, '-- err all screens  --');
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchHashCode = async () => {
        setIsLoading(true);
        try {
            const response = await Api.structure.hash();
            setNewHash(
                response?.data?.data?.project_hash ||
                    response?.data?.project_hash,
            );
        } catch (error: any) {
            console.log(error, '-- err all screens  --');
        }
    };
    useEffect(() => {
        // Getting the latest hash from the AP
        fetchHashCode();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // open db
            const db = await openDB<MyDB>('my-screen-data', 1, {
                upgrade(db) {
                    db.createObjectStore('getData');
                },
            });
            // get data from IndexedDB
            const tx = db.transaction('getData', 'readonly');
            const store = tx.objectStore('getData');
            const localData = await store.get('data');

            // Comparison of the hash from the server and previous hashes
            const previousHash = localData ? localData?.hash : null;
            if (previousHash && newHash === previousHash) {
                setScreenData(localData ? localData?.data : null);
                forceRefreshApp();
                return;
            }
            if (newHash) {
                fetchScreens();
            } else {
                setScreenData(localData.data);
            }
            // save data in IndexedDB
            if (newDataScreens) {
                const newData = {
                    hash: newHash || previousHash,
                    data:
                        newDataScreens &&
                        newDataScreens?.data?.screen_generator_data,
                };
                const putTx = db.transaction('getData', 'readwrite');
                putTx.objectStore('getData').put(newData, 'data');
                if (putTx?.oncomplete) {
                    // @ts-ignore
                    await putTx?.oncomplete();
                }

                setScreenData(newData.data);
                forceRefreshApp();
            } else {
                setScreenData(localData.data);
            }
        };

        fetchData();
    }, [newHash, newDataScreens]);

    if (!screenData) {
        return null;
    }
    return (
        <ScreenDataContext.Provider value={{ screenData, isLoading }}>
            {children}
        </ScreenDataContext.Provider>
    );
};
