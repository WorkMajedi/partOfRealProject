/* eslint-disable */
import { useCallback, useEffect, useState } from 'react';

export default function useInitialRoute(routes: unknown) {
    const [initialRoute, setInitialRoute] = useState('');

    // @ts-ignore
    const handle_initialRoute = useCallback((routes: any) => {
        if (!!routes[0]?.children) {
            return handle_initialRoute(routes[0].children);
        }
        !!routes[0]?.parent
            ? setInitialRoute(routes[0]?.parent + '/' + routes[0]?.path)
            : setInitialRoute(routes[0]?.path);
    }, []);

    useEffect(() => {
        handle_initialRoute(routes);
    }, [handle_initialRoute, routes]);

    return initialRoute;
}
