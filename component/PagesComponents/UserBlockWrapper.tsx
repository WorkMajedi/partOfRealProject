import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import { useCallback } from 'react';
import { extractNameAppFromURL, FindStepFristPath } from '../../utils/utils';
import useSocketBlock from '../../utils/hooks/socket/socket';

interface PageWrapperProps {
    children: JSX.Element | JSX.Element[];
}
export default function UserBlockWrapper({ children }: PageWrapperProps) {
    // for production define package qa
    const [searchParams] = useSearchParams();
    const code = searchParams.get('production_code');
    //-------------

    //= Socket Block: block user  in some page👇
    const { id } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const ignoreBlockDynamic: string[] = ['detail'];
    const { type, isBlock, closeConnectionSocket } = useCallback(() => {
        const typeApp = extractNameAppFromURL(pathname);
        return useSocketBlock({
            type: typeApp,
            ignoreBlockDynamic,
            id: id || code,
            location,
            disBlocking: () => {
                const path = FindStepFristPath(pathname);
                if (pathname.includes('production')) {
                    navigate(`${path}/list/detail/${code}`);
                } else {
                    navigate(`${path}/list/detail/${id}`);
                    setTimeout(() => {
                        navigate(0);
                    });
                }
            },
        });
    }, [code, id])();
    // = ===================end=============👆
    return <>{children}</>;
}
