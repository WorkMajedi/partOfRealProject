import { useRef } from 'react';
import Switch from './Switch';

const GridSwitch = (props: any) => {
    const ref: any = useRef();

    return (
        <Switch
            onKeyDown={_event => {
                if (_event.code === 'Space') {
                    (_event.target as HTMLInputElement).click();
                }
            }}
            defaultChecked={props.params.value}
            {...props}
        />
    );
};

export default GridSwitch;
