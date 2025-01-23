import { useDispatch, useSelector } from 'react-redux';
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from 'react-router-dom';
import { useEffect } from 'react';
import usePermissions from '../utils/hooks/usePermissions';

import { logout } from '../redux/slices/permissions/permissionsSlice';
import Dashboard from 'layouts/DashBoard/Dashboard';
import useInitialRoute from './useInitialRoute';
import { authRoutes, routes } from 'routes';
import RouteHandler from './RouteHandler';

export default function Routes() {
    const initialRoute = useInitialRoute(routes);
    const dispatch = useDispatch();
    const { isLogin } = useSelector((state: any) => state.permissions);
    const { permissions, isLoading } = usePermissions({
        isForcedGetPer: isLogin,
    });

    const router = createBrowserRouter(
        isLogin
            ? [
                  {
                      path: '/',
                      element: (
                          <Dashboard routes={routes}>
                              <Outlet />
                          </Dashboard>
                      ),
                      children: [
                          {
                              path: '/login/*',
                              element: <Navigate to="/" />,
                          },
                          {
                              path: '/',
                              element: <Navigate to={initialRoute} replace />,
                          },
                          {
                              path: '/*',
                              element: <RouteHandler routes={routes} />,
                          },
                      ],
                  },
              ]
            : [
                  {
                      path: '/',
                      element: (
                          <>
                              <Outlet />
                          </>
                      ),
                      children: [
                          {
                              path: '*',
                              element: <RouteHandler routes={authRoutes} />,
                          },
                          {
                              path: '/',
                              element: <Navigate to="/login" />,
                          },
                      ],
                  },
              ],
    );

    useEffect(() => {
        if (!isLogin) {
            dispatch(logout());
        }
    }, [isLogin]);

    return <RouterProvider router={router} />;
    // return (
    //     <BrowserRouter>
    //         {isLogin ? <MainRoute /> : <AuthRoute isLogin={isLogin} />}
    //     </BrowserRouter>
    // );
}
