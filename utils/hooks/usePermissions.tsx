import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Api } from 'api';
import { setPermissionsList } from 'redux/slices/permissions/permissionsSlice';

interface IUsePermissions {
    isForcedGetPer?: boolean;
}

interface IUsePermissionsResult {
    isLoading?: boolean;
    fetchPermission?: () => void;
    permissions?: any;
}
const usePermissions = ({
    isForcedGetPer = false,
}: IUsePermissions): IUsePermissionsResult => {
    const [permissions, setPermissions] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { isLogin } = useSelector((state: any) => state.permissions);

    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

    // const {
    //     data: perList,
    //     isLoading,
    //     isError,
    //     error,
    // } = useQuery<{ data: { [key: string]: any } }, AxiosError>({
    //     //queryKey: ['details_item', id],
    //     queryFn: () => Api.user.getPermissions(),
    //     refetchInterval: false,
    //     refetchOnWindowFocus: false,
    //     cacheTime: 0,
    //     //enabled: !!id,
    // });
    const getInit = () => {
        setIsLoading(true);
        Api.user
            .getPermissions()
            .then(({ status, data }) => {
                if (status === 200) {
                    // const arr = data.data.permissions?.flatMap(
                    //     ({ children, ...rest }) => [rest, ...(children || [])],
                    // );
                    dispatch(setPermissionsList(data));
                    // setIsAdmin(data.data?.is_superuser);
                    setPermissions(data);
                }
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!permissions?.length && isLogin) {
            getInit();
        }
        if (isForcedGetPer && !isLogin) {
            getInit();
        }
    }, [isForcedGetPer, isLogin]);
    return {
        fetchPermission: getInit,
        permissions,
        isLoading,
    };
};

export default usePermissions;
