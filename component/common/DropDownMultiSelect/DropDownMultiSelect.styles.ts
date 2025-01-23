import { styled } from '@mui/material/styles';
import FormControl, { FormControlProps } from '@mui/material/FormControl';

export const FormControlStyled = styled(FormControl)<FormControlProps>(
    ({ theme }) => ({
        '.haveValue': {
            '.MuiSelect-select.MuiSelect-outlined.MuiSelect-multiple.MuiInputBase-input.MuiOutlinedInput-input':
                {
                    padding: '10px',
                },
        },
    }),
);
