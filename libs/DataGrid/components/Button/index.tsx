import React, { useRef } from 'react';
import { useKeyPress } from 'ahooks';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CustomButtonProps } from './type';
import { StyledCustomButton } from './styles';

const CustomButton = ({
    onEsc,
    onEnter,
    keyboard,
    endIcon,
    children,
    name,
    ...otherProps
}: CustomButtonProps) => {
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
        <StyledCustomButton
            {...(name === 'ButtonIconLeft'
                ? {
                      startIcon: <ArrowForwardIcon />,
                  }
                : {})}
            {...(name === 'ButtonIconRight'
                ? {
                      endIcon: <ArrowForwardIcon />,
                  }
                : {})}
            {...(name === 'ButtonShortKey'
                ? {
                      endIcon: <span className="keyboard">{keyboard}</span>,
                  }
                : {})}
            {...(name === 'ButtonIconLeftShortKeyRight'
                ? {
                      startIcon: <ArrowForwardIcon />,
                      endIcon: <span className="keyboard">{keyboard}</span>,
                  }
                : {})}
            ref={ref}
            {...otherProps}
        >
            {children}
        </StyledCustomButton>
    );
};

export default CustomButton;
