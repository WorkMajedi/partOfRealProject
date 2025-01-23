import { AlertTitle } from '@mui/lab';
import { StyledAlert } from './styles';

export default function CustomAlert({
    type,
    color,
    customColor,
    value,
    label,
}: any) {
    return (
        <StyledAlert
            variant="filled"
            severity={type}
            color={color}
            {...(!!customColor ? { customColor } : {})}
        >
            <AlertTitle>{label}</AlertTitle>
            {value}
        </StyledAlert>
    );
}
