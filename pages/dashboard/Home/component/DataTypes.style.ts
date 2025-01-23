import { styled } from '@mui/system';
import { Card, Divider } from '@mui/material';
// Styled components with Emotion
const GreenCircle = styled('div')({
    backgroundColor: '#28C76F',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
});

const CustomDivider = styled(Divider)({
    height: 0.5,
});

const CustomCard = styled(Card)({
    width: '100%',
    padding: '1rem',
    paddingBottom: '2rem',
});

const StyledSpan = styled('span')({
    fontSize: '18px',
    marginBottom: '0.5rem',
});

const RefreshWrapper = styled('div')({
    cursor: 'pointer',
});
export { GreenCircle, CustomDivider, CustomCard, StyledSpan, RefreshWrapper };
