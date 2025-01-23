import { MoonSvg, SunSvg } from 'assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'redux/slices/theme/themeReducer';
import { THEMES } from 'Theme/constatns';
import {
    CircleSwitch,
    InputSwitch,
    LabelSwitch,
    Switch,
} from './switch.styles';

export default function ThemeSwitch() {
    const theme = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();
    const handleSwitchTheme = () => {
        if (theme.currentTheme === THEMES.DEFAULT) {
            dispatch(setTheme(THEMES.DARK));
        } else {
            dispatch(setTheme(THEMES.DEFAULT));
        }
    };

    return (
        <Switch>
            <InputSwitch
                type="checkbox"
                name="switch"
                id="switch"
                onClick={() => handleSwitchTheme()}
            />
            <LabelSwitch htmlFor="switch">
                <CircleSwitch className="circle">
                    <i className="d-flex align-items-center justify-content-center">
                        <SunSvg className="sun" />
                    </i>
                    <i className="d-flex align-items-center justify-content-center">
                        <MoonSvg className="moon" />
                    </i>
                </CircleSwitch>
            </LabelSwitch>
        </Switch>
    );
}
