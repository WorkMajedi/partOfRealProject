import { Box } from '@mui/system';
import { useKeyPress } from 'ahooks';
import { DateRangePicker } from 'component/common';
import { useRef } from 'react';

const GridDateRange = (props: any) => {
    const ref: any = useRef(null);
    useKeyPress(
        ['leftarrow', 'rightarrow'],
        (e: any) => {
            e.stopPropagation();
        },
        {
            target: ref?.current?.querySelectorAll('input')[0],
        },
    );
    useKeyPress(
        ['leftarrow', 'rightarrow'],
        (e: any) => {
            e.stopPropagation();
        },
        {
            target: ref?.current?.querySelectorAll('input')[1],
        },
    );
    function doGetCaretPosition(oField: any) {
        // Initialize
        let iCaretPos = 0;

        // Firefox support
        if (oField.selectionStart || oField.selectionStart == '0')
            iCaretPos =
                oField.selectionDirection == 'backward'
                    ? oField.selectionStart
                    : oField.selectionEnd;

        // Return results
        return iCaretPos;
    }

    return (
        <Box ref={ref}>
            <DateRangePicker {...props} />
        </Box>
    );
};

export default GridDateRange;
