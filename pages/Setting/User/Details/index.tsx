import { handlePreparePermissions } from 'utils/utils';
import DetailPageWrapper from 'component/PagesComponents/DetailPageWrapper';
import { Api } from 'api';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { mergePermissions } from '../../../../utils/mergePermissions';

export default function DetailsUser({ screenDesign }: any) {
    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
        permissions?: any[] | any;
        role?: any[] | any;
    }>({
        image: [],
        permissions: [],
    });
    const [defaultPerms, setDefaultPerms] = useState<{
        [key: string]: unknown;
        permissions?: any[] | any;
    }>({});
    const [getPerms, setGetPerms] = useState<{
        [key: string]: unknown;
        permissions?: any[] | any;
    }>({});
    const { id } = useParams();

    // get user info
    const { isLoading, isError, error } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['details_user', id],
        queryFn: () => Api.user.getUser(id),
        enabled: !!id,
        cacheTime: 0,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        onSuccess: ({ data }) => {
            setGetPerms({
                ...data,
                role: `${data?.role?.code} / ${data?.role?.description}`,
                permissions: handlePreparePermissions(data?.permissions ?? ''),
            });
        },
    });
    //--------
    // get permission default
    const { isLoading: PermissionsLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['default_perms'],
        queryFn: () => Api.role.getDefaultPermissions(),
        // enabled: !id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        onSuccess: ({ data }) => {
            if (!!id) {
                setDefaultPerms({
                    permissions: handlePreparePermissions(data),
                });
            }
        },
    });
    // ---------

    useEffect(() => {
        if (!!id && defaultPerms?.permissions && getPerms?.permissions) {
            const mergedObject: any = mergePermissions(defaultPerms, getPerms);
            setDefaultValues(mergedObject);
        }
    }, [defaultPerms, id, getPerms]);

    const overWriteListData = useMemo(() => {
        if (!defaultValues) return null;
        return {
            ...defaultValues,
            permissions: !!defaultValues?.permissions
                ? defaultValues?.permissions
                : [],
        };
    }, [defaultValues]);

    if (
        defaultValues?.permissions &&
        defaultValues?.permissions?.length === 0 &&
        !!id
    ) {
        return null;
    }
    return (
        <DetailPageWrapper
            modalFields={screenDesign?.modals}
            screenFields={screenDesign?.fields}
            actionbar={screenDesign?.actionbar}
            label={screenDesign?.label}
            isLoading={isLoading}
            isError={isError}
            error={error}
            listData={overWriteListData}
            navigateUrl={`/setting/user/${id}`}
        />
    );
}
