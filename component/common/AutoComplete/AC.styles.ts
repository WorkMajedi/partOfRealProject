import { styled } from '@mui/material/styles';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

export const StyledAutocomplete = styled(Autocomplete)<
    AutocompleteProps<any, any, any, any, any>
>(({ theme }) => ({
    '& .searchBtn': {
        position: 'absolute',
        right: 0,
        height: '100%',
        width: '3.5rem',
        borderRadius: '4px',
        background: theme.palette.grey[200],
        svg: {
            path: {
                fill: theme.palette.primary.main,
            },
        },
    },
    '& .Mui-disabled .searchBtn': {
        background: theme.palette.grey[300],
        svg: {
            path: {
                // @ts-ignore
                fill: theme.palette.primary[50],
            },
        },
    },
}));
