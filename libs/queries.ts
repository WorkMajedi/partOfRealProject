import { instance } from 'api/config';
import { useQuery } from 'react-query';

export const useFetchDataGridRows = ({
    url,
    name,
    pageSize,
    page,
    queryParams,
    ordering,
    filter,
    search,
    skipQueries = false,
}: {
    url: string;
    name: string;
    pageSize?: string;
    page?: string;
    ordering?: string;
    queryParams?: any;
    filter?: any;
    search?: string;
    skipQueries?: boolean;
}) => {
    const queryaramKeys = Object.keys(queryParams);
    const queryParamsKeys = queryaramKeys
        ?.map((key, index) => {
            return `${key}=${queryParams[key]}${
                index !== queryaramKeys.length - 1 ? '&' : ''
            }`;
        })
        ?.join('');

    const queryFn = () => {
        if (!queryParamsKeys && !skipQueries) return null;
        return instance.get(
            `${url}?ordering=${ordering}&page_size=${pageSize || 10}&page=${
                page || 1
            }${queryParamsKeys ? `&${queryParamsKeys}` : ''}${
                search ? `&search=${search}` : ''
            }${filter ? `&${filter}` : ''}`,
        );
    };

    return useQuery({
        queryKey: [name, pageSize, queryParams, page, ordering, filter, search],
        enabled: !!queryParamsKeys,
        keepPreviousData: true,
        refetchOnMount: true,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        queryFn,
        retry: false,
    });
    
};
