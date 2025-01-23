import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: ({
    user,
    children,
}: {
    user: any;
    children: any;
    // eslint-disable-next-line react/function-component-definition,react/prop-types
}) => JSX.Element = ({ user, children }) => {
    // if (!user) {
    //     return <Navigate to="/landing" replace />;
    // }
    return <Outlet />;
};

export default ProtectedRoute;
