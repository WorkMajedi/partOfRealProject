import { ReactElement, ReactNode } from 'react';
import { DataGridProps } from '@mui/x-data-grid';

export interface DataGridCodeProps extends DataGridProps {
    name: string;
    components?: ComponentChooser;
    columns: any[];
    title?: ReactNode | string;
    inModal?: any;
    addable?: boolean;
    height?: number | string;
    error?: any;
    helperText?: string;
    args?: any;
}

export type ComponentChooser = {
    [key: string]: ({}: any) => JSX.Element | ReactElement | ReactNode;
};
