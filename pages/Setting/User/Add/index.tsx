import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { overrideFields } from 'core/utils/overWrite';
import { handlePreparePermissions } from 'utils/utils';
import AddPageWrapper from 'component/PagesComponents/AddPageWrapper';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Api } from 'api';
import FormGeneration from './component/FormGeneration';
import { mergePermissions } from '../../../../utils/mergePermissions';

export default function AddUser({ screenDesign }: any) {
    const { id } = useParams();

    const [defaultValues, setDefaultValues] = useState<{
        [key: string]: unknown;
        permissions?: any[] | any;
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
    // get user info
    const { isLoading } = useQuery<
        { data: { [key: string]: any } },
        AxiosError
    >({
        queryKey: ['add_user', id],
        queryFn: () => Api.user.getUser(id),
        enabled: !!id,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
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
        enabled: !!id,
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
            const sortedPermissions = Array.from(
                defaultPerms?.permissions?.values(),
            ).sort((a: any, b: any) => a.key.localeCompare(b.key));
            setDefaultValues({
                ...mergedObject,
                permissions: sortedPermissions,
            });
        }
    }, [defaultPerms, id, getPerms]);

    const overWriteFieldModal: any = useCallback(() => {
        return overrideFields(screenDesign?.modals, []);
    }, [screenDesign]);
    if (
        defaultValues?.permissions &&
        defaultValues?.permissions?.length === 0 &&
        !!id
    ) {
        return null;
    }
    return (
        <AddPageWrapper
            loading={isLoading || PermissionsLoading}
            defaultValues={defaultValues}
            overWriteField={overWriteFieldModal}
            dispatchActionBar={{
                actionBar: screenDesign?.actionbar,
                pageTitle: screenDesign?.label,
            }}
        >
            <FormGeneration
                fields={screenDesign?.fields}
                listData={defaultValues}
            />
        </AddPageWrapper>
    );
}
