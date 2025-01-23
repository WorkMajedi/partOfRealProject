import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { useEffect } from 'react';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export const RTL = ({ children }: { children: any }) => {
    useEffect(() => {
        if (document) {
            document.dir = 'rtl';
        }
    }, []);
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
};
