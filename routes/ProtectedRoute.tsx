import React, { ReactNode } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

type Permissions = {
    [key: string]: {
        label: string;
        permissions: string[];
        child?: Permissions;
    };
};

// Define a ProtectedRoute component
type ProtectedRouteProps = {
    requiredPermissions: string[];
    currentUserPermissions: string[];
    isParentPermissions: string[];
    fallbackPath: string;
    children: ReactNode;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    requiredPermissions,
    currentUserPermissions = [],
    fallbackPath,
    isParentPermissions = [],
    children,
}) => {
    // Check if the requiredPermissions are present in currentUserPermissions
    const hasParentPermissions = isParentPermissions.includes('view');
    const hasPermission = requiredPermissions.every(permission =>
        currentUserPermissions.includes(permission),
    );

    // Render the protected element if the user has the required permissions
    return hasParentPermissions && hasPermission ? (
        <>{children}</>
    ) : (
        // Redirect to the fallbackPath if the user doesn't have the required permissions
        <Navigate to={fallbackPath} replace />
    );
};
export default ProtectedRoute;
