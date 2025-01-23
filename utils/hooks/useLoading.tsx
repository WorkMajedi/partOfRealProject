import { useState } from 'react';

type ReturnType = {
    load: Function;
    loading: boolean;
};
export default function useLoading(): ReturnType {
    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    return { load, loading };
}
