import { createTheme } from '@mui/material';
import variants from './variants';
import typography from './typography';
import overrides from './overrides';

const index: any = (name: string, lan: string) => {
    let themeConfig = variants.find(variant => variant.name === name);

    if (!themeConfig) {
        console.warn(new Error(`The theme ${name} is not valid`));
        [themeConfig] = variants;
    }

    // @ts-ignore
    return createTheme(
        {
            spacing: 4,
            components: overrides,
            typography,
            palette: themeConfig.palette,
            direction: lan === 'fa' ? 'rtl' : 'ltr',
        },
        {
            name: themeConfig.name,
        },
    );
};

export default index;
