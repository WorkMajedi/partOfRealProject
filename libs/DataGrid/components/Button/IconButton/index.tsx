import React, { useRef } from 'react';
import { useKeyPress } from 'ahooks';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { StyledIconBtn } from './styles';
import { IconButtonProps } from './type';

export default function IconButton({
    onEsc,
    onEnter,
    keyboard,
    children,
    btnType,
    ...otherProps
}: IconButtonProps) {
    const ref: any = useRef(null);
    useKeyPress(
        'Esc',
        () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onEsc && onEsc();
        },
        {
            target: ref,
        },
    );

    useKeyPress(
        'Enter',
        () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onEnter && onEnter();
        },
        {
            target: ref,
        },
    );
    return (
        <StyledIconBtn ref={ref} btnType={btnType} {...otherProps}>
            <ArrowForwardIcon />
        </StyledIconBtn>
    );
}
