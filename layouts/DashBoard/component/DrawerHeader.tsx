import Box from '@mui/material/Box';
import { SvgIcon } from '@mui/material';
import { Logo } from 'assets/svg';
import { DrawerHeaderStyle } from './DashBoard.styles';

export default function DrawerHeader({ open }: { open: boolean }) {
    return (
        <DrawerHeaderStyle>
            <SvgIcon
                component={Logo}
                inheritViewBox
                sx={{
                    fontSize: 40,
                }}
            />
            <Box
                display="flex"
                flexDirection="column"
                className={open ? 'show' : 'hide'}
            >
                <p className="title">American Standard Coatings</p>
                <p className="subTitle">Powered by Advanced ERP USA ©2024</p>
            </Box>
        </DrawerHeaderStyle>
    );
}
