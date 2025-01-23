import { useQuery } from 'react-query';
import { instance } from '../../api/config';
import { useEffect, useState } from 'react';

// Custom Hook using React Query
const useFetchDataWithReactQuery = (
    data: any[] | null = null,
    nameGenerator: string = `item.id`,
    baseUrl: string,
    queryParamName: string = 'id__in',
    optionalParams?: { [key: string]: any },
    requestDynamic?: 'dynamic',
) => {
    const [stringArray, setStringArray] = useState<string[]>([]);
    const [dynamicURL, setDynamicURL] = useState<string | null>(null);
    const name = nameGenerator.split('.');
    // Generate the list of IDs (stringArray) based on data input
    useEffect(() => {
        if (!!data?.length) {
            const getListString = data.reduce((acc: any, obj: any) => {
                console.log(obj.nameGenerator, '-- namegen  --');
                if (obj && obj?.[name[0]]?.[name[1]]) {
                    acc.push(obj?.[name[0]]?.[name[1]]);
                } else if (obj && obj?.[name[0]]) {
                    acc.push(obj?.[name[0]]);
                }
                return acc;
            }, []);
            console.log(getListString, '--getListString--');
            setStringArray(getListString);
        }
    }, [data, nameGenerator]);

    // Create a single query to fetch all data with id__in parameter
    const {
        data: fetchedData,
        isLoading,
        error,
    } = useQuery(
        [baseUrl, stringArray], // Unique queryKey for this request
        async () => {
            if (!stringArray.length) return [];
            let url = `${baseUrl}?${queryParamName}=${encodeURIComponent(
                stringArray.join(','),
            )}`;

            // If optionalParams is provided, append them as query parameters
            if (optionalParams) {
                Object.entries(optionalParams).forEach(([key, value]) => {
                    url += `&${key}=${encodeURIComponent(value)}`;
                });
            }

            // Perform the GET request using axios
            const response = await instance.get(url);
            if (response.status === 200) {
                return response.data.results; // Return the data from API response
            }
        },
        {
            enabled: !!stringArray.length, // Enable query only if stringArray has values
        },
    );

    return { listData: fetchedData || [], isLoading, error }; // Returns the fetched data, loading state, and error if any
};

export default useFetchDataWithReactQuery;
