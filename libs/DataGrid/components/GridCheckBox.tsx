import { useRef } from 'react';
import { useKeyPress } from 'ahooks';
import CheckBox from './CheckBox';

const GridCheckBox = (props: any) => {
    const ref: any = useRef();

    useKeyPress('Space', e => {}, {
        target: ref?.current?.parentElement,
    });

    return <CheckBox parentRef={ref} {...props} />;
};

export default GridCheckBox;
