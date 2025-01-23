/* eslint-disable react/jsx-fragments */
import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useEffect } from 'react';
import { useKeyPress } from 'ahooks';
import { Form } from 'component/common';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
    maxWidth: DialogProps['maxWidth'];
    fullWidth?: boolean;
    open: boolean;
    closeModal?: () => void;
    childButton?: React.ReactNode;
    search?: boolean;
    state?: any;
    selected?: any;
}
const CuDialog: FC<IProps> = ({
    children,
    title = '',
    maxWidth,
    fullWidth = true,
    subtitle,
    open,
    closeModal,
    childButton,
    search = false,
    state,
    selected,
}) => {
    const handleClose = () => {
        if (closeModal) closeModal();
    };

    const modalRef: any = React.useRef(null);
    const modalContentlRef: any = React.useRef(null);

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

            // setTimeout(() => {
            //     (
            //         document.querySelector(
            //             `[data-id="${state.rowId}"] input:not(:disabled)`,
            //         ) as HTMLInputElement
            //     )?.focus();
            // }, 5);
        },
        {
            target: modalContentlRef,
        },
    );

    useKeyPress(
        ['alt.s'],
        (e: any) => {
            e.preventDefault();
            // e.stopPropagation();
            const submitbutton =
                modalContentlRef?.current?.querySelector('#submit');
            const searchbutton =
                modalContentlRef?.current?.querySelector('#search');
            if (search) {
                searchbutton?.click();
            } else {
                submitbutton.click();
            }
            setTimeout(() => {
                (
                    document.querySelector(
                        `[data-id="${state.rowId}"] input:not(:disabled)`,
                    ) as HTMLInputElement
                )?.focus();
            }, 5);
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
            setTimeout(() => {
                if (state?.rowId) {
                    setTimeout(() => {
                        (
                            document.querySelector(
                                `[data-id="${state.rowId}"] input:not(:disabled)`,
                            ) as HTMLInputElement
                        )?.focus();
                    }, 5);
                }
                (
                    selected?.state?.ref?.querySelector(
                        'input',
                    ) as HTMLInputElement
                )?.focus();
            }, 0);
        },
        {
            target: modalContentlRef,
        },
    );

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                const dialogEl = document?.querySelector('[role="dialog"]');
                const dialogElFirstInput: any = dialogEl?.querySelector(
                    'input:not(:disabled)',
                );
                dialogElFirstInput?.focus();
            }, 510);
        }
    }, [open]);

    return (
        <React.Fragment>
            {childButton}
            <Dialog
                ref={modalRef}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle> {title} </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme => theme.palette.grey[900],
                    }}
                >
                    <CloseIcon fontSize="medium" />
                </IconButton>
                <DialogContent>
                    {subtitle && (
                        <DialogContentText>{subtitle}</DialogContentText>
                    )}
                    <Form
                        sx={{
                            my: 5,
                        }}
                    >
                        <div ref={modalContentlRef}>{children}</div>
                    </Form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default CuDialog;
