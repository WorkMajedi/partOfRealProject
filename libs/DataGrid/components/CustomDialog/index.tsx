import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useRef } from 'react';
import { useKeyPress } from 'ahooks';
import { IProps } from 'ahooks/lib/useWhyDidYouUpdate';
import { Form } from 'react-router-dom';

export const CustomDialog: FC<IProps> = ({
    children,
    title = '',
    maxWidth,
    fullWidth = false,
    subtitle,
    open = false,
    closeModal,
    childButton,
    search = false,
    ...otherProps
}) => {
    const handleClose = () => {
        if (closeModal) closeModal();
    };

    const modalRef: any = useRef(null);
    const modalContentlRef: any = useRef(null);

    useKeyPress(
        'f9',
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            const submitbutton =
                modalContentlRef?.current?.querySelector('#submit');
            const searchbutton =
                modalContentlRef?.current?.querySelector('#search');
            if (search) {
                searchbutton?.click();
            } else {
                submitbutton.click();
            }
        },
        {
            target: modalContentlRef,
        },
    );

    useKeyPress(
        'Esc',
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            const resetbutton =
                modalContentlRef?.current?.querySelector('#reset');
            resetbutton.click();
        },
        {
            target: modalContentlRef,
        },
    );

    useKeyPress(
        ['alt.x'],
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            const closebutton =
                modalContentlRef?.current?.querySelector('#close');
            closebutton.click();
        },
        {
            target: modalContentlRef,
        },
    );

    return (
        <>
            {childButton}
            <Dialog
                ref={modalRef}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open || false}
                onClose={handleClose}
            >
                <DialogTitle> {title} </DialogTitle>
                <DialogContent>
                    {subtitle && (
                        <DialogContentText>{subtitle}</DialogContentText>
                    )}
                    <Form
                    // sx={{
                    //   my: 5,
                    // }}
                    >
                        <div ref={modalContentlRef}>{children}</div>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export { };
