import { Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

export default function PageTitle({ children }: { children: ReactNode }) {
    const theme = useTheme();
    return (
        <Typography
            fontWeight="bold"
            fontSize={20}
            component="h1"
            // @ts-ignore
            color={theme.palette.common.pageTitle}
        >
            {children}
        </Typography>
    );
}
