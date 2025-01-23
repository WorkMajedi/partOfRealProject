import { FC } from 'react';

interface IProps {
    isLogin?: boolean;
}
const AuthRoute: FC<IProps> = ({ isLogin }) => {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!isLogin) {
    //         navigate('/login');
    //     }
    // }, [isLogin]);
    return null;
    // return (
    // <Routes>
    //     <Route path="/" element={<Navigate to="/login" />} />
    //     <Route path="*" element={<RouteHandler routes={authRoutes} />} />
    // </Routes>
    // );
};
export default AuthRoute;
