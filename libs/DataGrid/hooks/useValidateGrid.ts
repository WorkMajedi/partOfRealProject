import { useEffect } from 'react';

type UseValidateGridProps = {
    name: string;
};

export const useValidateGrid = (props: UseValidateGridProps) => {
    useEffect(() => {
        if (!props.name) {
            throw Error('name prop is required for initiate data grid');
        }
    }, [props.name]);
};
