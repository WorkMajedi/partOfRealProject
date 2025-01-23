import { useRoutes } from 'react-router';
import { createElement, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ScreenDataContext } from '../utils/hooks/ScreenDataProvider';
import ProtectedRoute from './ProtectedRoute';
import usePermissions from '../utils/hooks/usePermissions';
import { Navigate } from 'react-router-dom';

export default function RouteHandler({ routes }: any) {
    const { screenData } = useContext(ScreenDataContext);
    const { isLogin } = useSelector((state: any) => state.permissions);
    const currentUserPermissions = useSelector(
        (state: any) => state?.permissions?.permissionsList,
    );
    if (!currentUserPermissions && isLogin) {
        return null;
    }
    return useRoutes(
        routes.map((route: any) => {
            const parentPermission = route?.screenPermissionKey;

            return route?.children?.length
                ? {
                      ...route,
                      children: route?.children.map((child: any) => {
                          const Component = child.element;
                          const childPermission = child?.screenPermissionKey;
                          const TagPermissions = child?.tagPermissions;
                          return child?.children?.length
                              ? {
                                    ...child,
                                    children: child?.children.map(
                                        (innerChild: any) => {
                                            const InnerComponent =
                                                innerChild.element;
                                            const childTagPermissions =
                                                innerChild?.tagPermissions;
                                            return {
                                                ...innerChild,
                                                element: (
                                                    <ProtectedRoute
                                                        path={innerChild?.path}
                                                        requiredPermissions={
                                                            childTagPermissions
                                                        }
                                                        isParentPermissions={
                                                            currentUserPermissions?.[
                                                                `${parentPermission}`
                                                            ]?.permissions
                                                        }
                                                        currentUserPermissions={
                                                            currentUserPermissions?.[
                                                                `${parentPermission}`
                                                            ]?.child?.[
                                                                `${childPermission}`
                                                            ]?.permissions
                                                        }
                                                        fallbackPath="/no-access"
                                                    >
                                                        <InnerComponent
                                                            screenDesign={
                                                                screenData &&
                                                                Object.hasOwn(
                                                                    screenData,
                                                                    route.screenDesignKey,
                                                                ) &&
                                                                // @ts-ignore
                                                                !!screenData[
                                                                    route
                                                                        ?.screenDesignKey
                                                                ]?.screens?.[
                                                                    innerChild
                                                                        ?.screenDesignKey
                                                                ]
                                                                    ? // @ts-ignore
                                                                      screenData[
                                                                          route
                                                                              ?.screenDesignKey
                                                                      ]
                                                                          .screens?.[
                                                                          innerChild
                                                                              ?.screenDesignKey
                                                                      ]
                                                                    : null
                                                            }
                                                            PermissionsPage={{
                                                                label: currentUserPermissions?.[
                                                                    `${parentPermission}`
                                                                ]?.child?.[
                                                                    `${childPermission}`
                                                                ]?.label,
                                                                permissions:
                                                                    currentUserPermissions?.[
                                                                        `${parentPermission}`
                                                                    ]?.child?.[
                                                                        `${childPermission}`
                                                                    ]
                                                                        ?.permissions,
                                                            }}
                                                        />
                                                    </ProtectedRoute>
                                                ),
                                            };
                                        },
                                    ),
                                }
                              : {
                                    ...child,
                                    element: (
                                        <ProtectedRoute
                                            path={child.path}
                                            requiredPermissions={TagPermissions}
                                            currentUserPermissions={
                                                currentUserPermissions?.[
                                                    `${parentPermission}`
                                                ]?.child?.[`${childPermission}`]
                                                    ?.permissions
                                            }
                                            isParentPermissions={
                                                currentUserPermissions?.[
                                                    `${parentPermission}`
                                                ]?.permissions
                                            }
                                            fallbackPath="/no-access"
                                        >
                                            <Component
                                                PermissionsPage={{
                                                    label: currentUserPermissions?.[
                                                        `${parentPermission}`
                                                    ]?.child?.[
                                                        `${childPermission}`
                                                    ]?.label,
                                                    permissions:
                                                        currentUserPermissions?.[
                                                            `${parentPermission}`
                                                        ]?.child?.[
                                                            `${childPermission}`
                                                        ]?.permissions,
                                                }}
                                                screenDesign={
                                                    screenData &&
                                                    Object.hasOwn(
                                                        screenData,
                                                        route.screenDesignKey,
                                                    ) &&
                                                    // @ts-ignore
                                                    !!screenData[
                                                        route?.screenDesignKey
                                                    ]?.screens?.[
                                                        child?.screenDesignKey
                                                    ]
                                                        ? // @ts-ignore
                                                          screenData[
                                                              route
                                                                  ?.screenDesignKey
                                                          ].screens?.[
                                                              child
                                                                  ?.screenDesignKey
                                                          ]
                                                        : null
                                                }
                                            />
                                        </ProtectedRoute>
                                    ),
                                };
                      }),
                  }
                : {
                      ...route,
                      element: createElement(route.element),
                  };
        }),
    );
}
